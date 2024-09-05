import config from "@config"; // Import configuration
import { BinanceClient } from "./binanceClient"; // Assuming you have a Binance API client file
import { calculateIndicators } from "./indicators"; // Assuming you have indicator calculations in another file

const runBot = async () => {
    try {
        const binanceClient = new BinanceClient(config.exchange.apiKey, config.exchange.apiSecret);

        console.log("Bot started with the following configuration:");
        console.log(config);

        // Main loop to monitor token pairs and execute trades
        while (true) {
            console.log(`Checking market conditions...`);

            // Fetch market data for all token pairs
            const tokenPairs = await binanceClient.getTokenPairs(config.totalMonitoredPairs);

            // Loop over token pairs to evaluate entry conditions
            for (const tokenPair of tokenPairs) {
                const marketData = await binanceClient.getMarketData(tokenPair);

                // Calculate indicators (RSI, EMA, Bollinger Bands)
                const indicators = calculateIndicators(marketData, config);

                // Check entry conditions for both strategies
                if (shouldEnterTrade(indicators, config)) {
                    console.log(`Entering trade for ${tokenPair}...`);

                    // Check which strategy to use
                    if (canExecuteTradeForStrategy(tokenPair, "stopLossStrategy")) {
                        await executeTrade(binanceClient, tokenPair, "stopLossStrategy");
                    } else if (canExecuteTradeForStrategy(tokenPair, "holdingStrategy")) {
                        await executeTrade(binanceClient, tokenPair, "holdingStrategy");
                    }
                }
            }

            // Sleep for refresh interval
            await sleep(config.refreshInterval);
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

// Function to determine if trade conditions are met
const shouldEnterTrade = (indicators: any, config: any): boolean => {
    const { rsiConfig, movingAverageConfig, bollingerBandsConfig } = config;
    const { rsi, emaShortTerm, emaLongTerm, bollingerLowerBand } = indicators;

    // Entry conditions:
    // 1. RSI is below oversold threshold and starting to recover
    // 2. Short-term EMA is below long-term EMA
    // 3. Price touches or dips below the lower Bollinger Band
    return rsi <= rsiConfig.oversoldThreshold && emaShortTerm < emaLongTerm && bollingerLowerBand;
};

// Function to check if a trade can be executed for the given strategy
const canExecuteTradeForStrategy = (tokenPair: string, strategy: string): boolean => {
    // Check if there's a free slot for a trade in the given strategy (max 10 active trades)
    // You should track active trades in a state or DB
    // This is just a placeholder for illustration
    const activeTrades = getActiveTradesForStrategy(strategy);
    return activeTrades.length < config.maxActiveTradesPerStrategy;
};

// Function to execute a trade
const executeTrade = async (client: any, tokenPair: string, strategy: string) => {
    const capitalAllocation = config.capitalAllocationPerTrade;
    const buyPrice = await client.getBuyPrice(tokenPair);
    const buyOrder = await client.placeBuyOrder(tokenPair, capitalAllocation, buyPrice);

    console.log(`Buy order placed for ${tokenPair} at ${buyPrice}.`);

    if (strategy === "stopLossStrategy") {
        const profitTarget = buyPrice * (1 + config.dynamicOrderConfig.profitTarget);
        const stopLoss = buyPrice * (1 - config.dynamicOrderConfig.stopLossThreshold);

        console.log(`Setting profit target at ${profitTarget} and stop loss at ${stopLoss}.`);

        await client.placeSellOrder(tokenPair, capitalAllocation, profitTarget); // Set profit target
        await client.placeStopLossOrder(tokenPair, capitalAllocation, stopLoss); // Set stop loss
    } else if (strategy === "holdingStrategy") {
        const profitTarget = buyPrice * (1 + config.dynamicOrderConfig.profitTarget);

        console.log(`Setting profit target at ${profitTarget}.`);

        await client.placeSellOrder(tokenPair, capitalAllocation, profitTarget); // Set only the profit target, no stop loss
    }
};

// Sleep function to pause the bot between intervals
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Example function to get active trades for a given strategy
const getActiveTradesForStrategy = (strategy: string) => {
    // You would typically retrieve this data from a state manager or database
    // Here, it's just an example function with a mock return
    return []; // Example, return an empty array for now (no active trades)
};

// Run the bot
runBot();
