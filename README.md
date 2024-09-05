# lol - Crypto Trading Bot

lol is a high-frequency trading bot designed for Binance that executes ETH/USDC trades with a 1% profit margin. It uses a combination of technical indicators like RSI, Moving Averages, and Bollinger Bands to trigger buy and sell orders. The bot is optimized to perform at least 3-4 trades per day, capitalizing on small market movements.

## Features

-   **RSI-Based Entry**: The bot buys ETH when the RSI drops below 40 and shows signs of recovery.
-   **Moving Averages**: Confirms downward momentum using 15-minute and 1-hour moving averages.
-   **Bollinger Bands**: Helps identify price volatility and sets entry points when the price hits the lower band.
-   **Dynamic Limit Orders**: Ensures optimal entry and exit points by using slight offsets below and above the market price.
-   **1% Profit Target**: Sells ETH automatically when the price increases by 1% from the buy price.

## Strategy Overview

1. **Buy Trigger**:

    - The bot waits for the following conditions:
        - **RSI** drops below 40 and begins to recover.
        - The **15-minute moving average** is still below the **1-hour moving average**, indicating a general downtrend.
        - The price touches or dips below the **lower Bollinger Band** (on a 15-minute chart).
    - Once these conditions are met, the bot places a limit buy order slightly below the current price (around 0.2%-0.3%).

2. **Sell Trigger**:

    - The bot automatically sets a limit sell order **1% above the buy price**.
    - Alternatively, it can sell when the price touches or breaks above the **upper Bollinger Band** for a potentially higher profit.

3. **Stop Loss** _(Optional)_:
    - You can configure a dynamic stop-loss, such as setting a stop-loss order 1%-2% below the buy price to mitigate losses in a downtrend.

## Requirements

-   Node.js (>= v14.x)
-   TypeScript (>= v4.x)
-   Binance API Key
-   Technical analysis library (e.g., `technicalindicators`)
-   `ccxt` or another library for connecting to the Binance API

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/lol.git
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up your Binance API key by creating a `.env` file in the project root:

    ```bash
    BINANCE_API_KEY=your_api_key
    BINANCE_API_SECRET=your_api_secret
    ```

4. Compile the TypeScript code:
    ```bash
    npm run build
    ```

## Usage

1. Ensure you've properly configured your API keys.
2. Run the trading bot:
    ```bash
    npm start
    ```

The bot will now start monitoring the ETH/USDC market, looking for buying opportunities based on RSI, Moving Averages, and Bollinger Bands. Once a trade is made, the bot will set a 1% profit target and wait for the price to reach that point before selling.

## Configuration

You can adjust the following parameters in the `config.ts` file:

-   **RSI Threshold**: Change the RSI level that triggers a buy. Default is set to 40.
-   **Moving Averages Period**: Modify the length of the moving averages used (15-minute, 1-hour).
-   **Bollinger Band Settings**: Adjust the timeframes and standard deviations for the Bollinger Bands.
-   **Profit Margin**: Adjust the target profit percentage (default is 1%).
