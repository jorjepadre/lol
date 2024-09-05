import Binance, { CandleChartResult, DailyStatsResult, OcoOrder, Order, OrderBook, OrderType } from "binance-api-node";
import { IOHLCVData, ITickerData, IOrderBook, IAccountBalance, IOrderResponse, IMarketData } from "@interfaces";

export class BinanceClient {
    private client: ReturnType<typeof Binance>;

    constructor(apiKey: string, apiSecret: string) {
        // Initialize the Binance API client with API key and secret
        this.client = Binance({
            apiKey,
            apiSecret,
        });
    }

    // Fetch list of token pairs to monitor
    async getTokenPairs(limit: number): Promise<string[]> {
        try {
            const exchangeInfo = await this.client.exchangeInfo();
            const usdcPairs = exchangeInfo.symbols
                .filter((pair) => pair.quoteAsset === "USDC")
                .map((pair) => pair.symbol);

            return usdcPairs.slice(0, limit); // Return up to the specified limit of TokenX/USDC pairs
        } catch (error) {
            console.error("Error fetching token pairs:", error);
            return [];
        }
    }

    // Fetch market data for a specific token pair
    async getMarketData(tokenPair: string): Promise<any> {
        try {
            const ticker: DailyStatsResult | DailyStatsResult[] = await this.client.dailyStats({ symbol: tokenPair });
            const ohlcv: CandleChartResult[] = await this.client.candles({
                symbol: tokenPair,
                interval: "15m", // 15-minute interval
                limit: 50, // Get the last 50 candles
            });

            return {
                ticker,
                ohlcv,
            };
        } catch (error) {
            console.error(`Error fetching market data for ${tokenPair}:`, error);
            return null;
        }
    }

    // Get current buy price (best ask price) for a token pair
    async getBuyPrice(tokenPair: string): Promise<number | null> {
        try {
            const orderBook: OrderBook = await this.client.book({ symbol: tokenPair });
            return parseFloat(orderBook.asks[0].price); // Best ask price
        } catch (error) {
            console.error(`Error fetching buy price for ${tokenPair}:`, error);
            return null;
        }
    }

    // Place a buy order for a specific token pair
    async placeBuyOrder(tokenPair: string, amount: number, price: number): Promise<Order | null> {
        try {
            const order: Order = await this.client.order({
                symbol: tokenPair,
                side: "BUY",
                type: "LIMIT" as OrderType.LIMIT,
                quantity: (amount / price).toFixed(8), // Quantity in base asset
                price: price.toFixed(8), // Price in quote asset (USDC)
                timeInForce: "GTC", // Good 'til cancelled
            });
            console.log(`Buy order placed: ${tokenPair}, Price: ${price}, Amount: ${amount}`);
            return order;
        } catch (error) {
            console.error(`Error placing buy order for ${tokenPair}:`, error);
            return null;
        }
    }

    // Place a sell order for a specific token pair
    async placeSellOrder(tokenPair: string, amount: number, price: number): Promise<Order | null> {
        try {
            const order: Order = await this.client.order({
                symbol: tokenPair,
                side: "SELL",
                type: "LIMIT" as OrderType.LIMIT,
                quantity: (amount / price).toFixed(8), // Quantity in base asset
                price: price.toFixed(8), // Price in quote asset (USDC)
                timeInForce: "GTC", // Good 'til cancelled
            });
            console.log(`Sell order placed: ${tokenPair}, Price: ${price}, Amount: ${amount}`);
            return order;
        } catch (error) {
            console.error(`Error placing sell order for ${tokenPair}:`, error);
            return null;
        }
    }

    // Place a stop-loss order for a specific token pair
    async placeStopLossOrder(tokenPair: string, amount: number, stopPrice: number): Promise<OcoOrder | null> {
        try {
            const order: OcoOrder = await this.client.orderOco({
                symbol: tokenPair,
                side: "SELL",
                quantity: (amount / stopPrice).toFixed(8), // Quantity in base asset
                price: stopPrice.toFixed(8), // Trigger price for stop loss
                stopPrice: stopPrice.toFixed(8), // Stop loss price
                stopLimitPrice: stopPrice.toFixed(8), // Limit price for stop-loss sell order
                stopLimitTimeInForce: "GTC",
            });
            console.log(`Stop-loss order placed: ${tokenPair}, Stop Price: ${stopPrice}, Amount: ${amount}`);
            return order;
        } catch (error) {
            console.error(`Error placing stop-loss order for ${tokenPair}:`, error);
            return null;
        }
    }

    // Check account balance for USDC and other assets
    async getBalance(): Promise<IAccountBalance[] | null> {
        try {
            const account = await this.client.accountInfo();
            return account.balances;
        } catch (error) {
            console.error("Error fetching account balance:", error);
            return null;
        }
    }
}
