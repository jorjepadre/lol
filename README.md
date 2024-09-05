# lol - Comprehensive Dual Trading Strategy for 50 TokenX/USDC Pairs

This repository contains a dual-strategy trading bot designed to execute trades on Binance. The bot monitors 50 TokenX/USDC pairs, splitting capital between two strategies:

1. **Stop Loss Strategy**: Uses stop losses to limit potential losses while aiming for a 1% profit on each trade.
2. **Holding Strategy**: Holds onto assets even if the price dips, waiting until the price recovers for a 1% profit.

The bot uses **universal technical indicator settings** for both strategies, which remain constant across all tokens.

## **Capital Allocation**

-   **Total Capital**: 10 units (e.g., \$10,000).

    -   **Stop Loss Strategy**: 5 units (\$5,000).
    -   **Holding Strategy**: 5 units (\$5,000).

-   **Per Trade Allocation**:

    -   **Stop Loss Strategy**: \$500 per trade.
    -   **Holding Strategy**: \$500 per trade.

-   **Monitored Pairs**: 50 TokenX/USDC pairs.
-   **Active Trades**: Maximum of 10 token pairs per strategy can be in active trades at any time.

---

## **Universal Technical Indicator Settings**

1. **Relative Strength Index (RSI)**

    - **Period**: 14
    - **Timeframe**: 15-minute chart
    - **Oversold Threshold**: RSI ≤ 40
    - **Recovery Signal**: RSI begins to rise after dipping below 40.

2. **Moving Averages (MA)**

    - **Short-Term Moving Average**: 15-minute Exponential Moving Average (EMA)
    - **Long-Term Moving Average**: 1-hour Exponential Moving Average (EMA)
    - **Condition**: 15-minute EMA is below the 1-hour EMA.

3. **Bollinger Bands**
    - **Period**: 20
    - **Standard Deviation**: 2
    - **Timeframe**: 15-minute chart
    - **Lower Band Touch**: Price touches or dips below the lower Bollinger Band.

---

## **Strategy 1: Stop Loss Strategy**

### **Entry Conditions**

A buy order is triggered when **all** of the following conditions are met:

1. **RSI Condition**

    - RSI(14) on the 15-minute chart drops to **40 or below** and then starts to **rise**.

2. **Moving Average Condition**

    - The **15-minute EMA** is below the **1-hour EMA**, confirming a short-term downtrend poised for reversal.

3. **Bollinger Band Condition**

    - The price touches or dips below the **lower Bollinger Band** on the 15-minute chart.

4. **Dynamic Buy Order Placement**
    - Place a **limit buy order** at **0.3% below** the current market price.

### **Exit Conditions**

1. **Profit Target**

    - Set a **limit sell order** at **1% above** the buy price.

2. **Stop Loss**
    - Set a **stop-loss order** at **1% below** the buy price.

### **Trade Management**

-   **Position Size**: \$500 per trade.
-   **Risk-to-Reward Ratio**: 1:1 (1% potential profit vs. 1% potential loss).
-   **Maximum Active Trades**: 10 token pairs (up to \$5,000 in total positions).

---

## **Strategy 2: Holding Strategy**

### **Entry Conditions**

A buy order is triggered when **all** of the following conditions are met (same as the Stop Loss Strategy):

1. **RSI Condition**

    - RSI(14) on the 15-minute chart drops to **40 or below** and then starts to **rise**.

2. **Moving Average Condition**

    - The **15-minute EMA** is below the **1-hour EMA**.

3. **Bollinger Band Condition**

    - The price touches or dips below the **lower Bollinger Band** on the 15-minute chart.

4. **Dynamic Buy Order Placement**
    - Place a **limit buy order** at **0.3% below** the current market price.

### **Exit Conditions**

1. **Profit Target**

    - Set a **limit sell order** at **1% above** the buy price.

2. **No Stop Loss**
    - **Do not set a stop-loss order**. If the price dips further, the position is held until the price recovers to achieve the 1% profit target.

### **Trade Management**

-   **Position Size**: \$500 per trade.
-   **Holding Duration**: Indefinite until the 1% profit target is met.
-   **Maximum Active Trades**: 10 token pairs (up to \$5,000 in total positions).

---

## **Combined Strategy Execution**

### **Monitoring and Execution**

-   The bot continuously scans the 50 TokenX/USDC pairs for the entry conditions.
-   When a token meets the entry conditions, and there are available slots (maximum of 10 active trades per strategy), the bot initiates a trade according to the respective strategy.

### **Capital Allocation Per Token**

-   Each token can have a position size of \$500 per strategy, meaning a single token could have positions in both strategies simultaneously if conditions are met and slots are available.

### **Trade Prioritization**

-   If more than 10 tokens meet the entry conditions simultaneously:
    -   **Priority is given based on**:
        -   **Liquidity**: Higher trading volume tokens are preferred.
        -   **Volatility**: Tokens with higher recent volatility may offer quicker opportunities to reach the profit target.
        -   **Spread**: Tokens with tighter bid-ask spreads are favored to minimize transaction costs.

---

## **Technical Details of Conditions**

### **1. RSI Calculation**

-   **Formula**:
    \[
    RSI = 100 - \left( \frac{100}{1 + RS} \right)
    \]
    where RS (Relative Strength) = Average Gain over 14 periods / Average Loss over 14 periods.
-   **Condition**: RSI values **≤ 40** on the 15-minute chart with a subsequent rise.

### **2. Moving Averages**

-   **15-Minute EMA**: Calculated using closing prices on the 15-minute chart.
-   **1-Hour EMA**: Calculated using closing prices on the 1-hour chart.
-   **Condition**: The 15-minute EMA is **below** the 1-hour EMA.

### **3. Bollinger Bands**

-   **Middle Band**: 20-period Simple Moving Average (SMA) on the 15-minute chart.
-   **Upper/Lower Band**: Middle Band ± (2 × Standard Deviation of the last 20 periods).
-   **Condition**: Price touches or dips below the **Lower Band**.

### **4. Dynamic Buy Order Placement**

-   **Buy Price** = Current Market Price × (1 - 0.003)

### **5. Profit Target and Stop Loss (Stop Loss Strategy)**

-   **Profit Target**: Sell Price = Buy Price × (1 + 0.01)
-   **Stop Loss**: Stop Loss Price = Buy Price × (1 - 0.01)

---

## **Risk Management**

### **Stop Loss Strategy**

-   **Maximum Loss Per Trade**: 1% of \$500 = \$5.
-   **Total Maximum Risk**: If all 10 trades hit the stop loss, the maximum loss is \$50.
-   **Risk-to-Reward Ratio**: 1:1.

### **Holding Strategy**

-   **Maximum Loss Per Trade**: Undefined, as there is no stop loss.
-   **Risk Mitigation**: Focus on **diversification** across 10 token pairs and prioritization of liquid tokens.

---

## **Operational Workflow**

1. **Initialization**:

    - Load the list of 50 TokenX/USDC pairs.
    - Allocate capital and set up monitoring for each strategy.

2. **Continuous Monitoring**:

    - For each token pair:
        - Calculate RSI(14) on the 15-minute chart.
        - Calculate 15-minute and 1-hour EMAs.
        - Calculate Bollinger Bands on the 15-minute chart.
        - Check if all entry conditions are met.

3. **Entry Execution**:

    - If entry conditions are met and there is an available slot:
        - Place a limit buy order at 0.3% below the current price.

4. **Post-Entry Management**:

    - **Stop Loss Strategy**:
        - Set limit sell order at 1% above buy price.
        - Set stop-loss order at 1% below buy price.
    - **Holding Strategy**:
        - Set limit sell order at 1% above buy price. No stop-loss order.

5. **Exit Execution**:
    - Monitor active trades for profit targets or stop losses (Stop Loss Strategy).
    - Free up slots for new trades upon exiting.

---

## **Additional Considerations**

-   **Market Conditions Adaptability**: Be prepared to pause trading during extreme volatility or illiquid markets.
-   **Regulatory Compliance**: Ensure adherence to regulations and exchange policies.
-   **Technical Infrastructure**: Implement robust error handling and fail-safes.
-   **Security Measures**: Protect API keys and secure sensitive data.
