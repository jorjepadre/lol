import { rsiConfig } from "./indicators/rsiConfig";
import { movingAverageConfig } from "./indicators/movingAverageConfig";
import { bollingerBandsConfig } from "./indicators/bollingerBandsConfig";
import { dynamicOrderConfig } from "./orders/dynamicOrderConfig";

export const config = {
    rsiConfig,
    movingAverageConfig,
    bollingerBandsConfig,
    dynamicOrderConfig,

    maxActiveTradesPerStrategy: 10, // Maximum number of active trades per strategy
    totalMonitoredPairs: 50, // Total number of TokenX/USDC pairs to monitor
    capitalAllocationPerTrade: 500, // Amount of capital allocated per trade (in USDC)

    // Strategy-specific settings
    stopLossStrategy: {
        enabled: true, // Enable or disable the stop loss strategy
        stopLossThreshold: dynamicOrderConfig.stopLossThreshold, // Use stop-loss settings from dynamicOrderConfig
    },

    holdingStrategy: {
        enabled: true, // Enable or disable the holding strategy
        // No stop-loss setting for holding strategy
    },

    // Exchange-specific settings (for Binance API connection)
    exchange: {
        apiKey: process.env.BINANCE_API_KEY || "", // Binance API key (set in the .env file)
        apiSecret: process.env.BINANCE_API_SECRET || "", // Binance API secret (set in the .env file)
        baseAsset: "USDC", // Base asset for trading (e.g., USDC)
    },

    // Miscellaneous
    refreshInterval: 30000, // Interval for refreshing price data (30 seconds)
};

export default config;
