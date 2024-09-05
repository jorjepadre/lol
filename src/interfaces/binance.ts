// Interface for market data (OHLCV)
export interface IOHLCVData {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: string;
    takerBuyQuoteAssetVolume: string;
}

// Interface for ticker (daily stats)
export interface ITickerData {
    symbol: string;
    priceChange: string;
    priceChangePercent: string;
    weightedAvgPrice: string;
    prevClosePrice: string;
    lastPrice: string;
    bidPrice: string;
    askPrice: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    quoteVolume: string;
}

// Interface for the order book (best bid/ask)
export interface IOrderBook {
    lastUpdateId: number;
    bids: Array<{ price: string; quantity: string }>;
    asks: Array<{ price: string; quantity: string }>;
}

// Interface for the account balance
export interface IAccountBalance {
    asset: string;
    free: string;
    locked: string;
}

// Interface for trade order responses
export interface IOrderResponse {
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    transactTime: number;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
}

// Interface for full market data
export interface IMarketData {
    ticker: ITickerData;
    ohlcv: IOHLCVData[];
}
