---
sidebar_position: 1
title: "Financial Modelling: Black-Litterman Framework"
---

# Financial Modelling: The Black-Litterman Allocation Framework

*Note: BL refers to Black-Litterman throughout this document.*

export const BL = "Black-Litterman";

## Overview
The **Veritas Vault** leverages a **Bayesian portfolio optimization framework** — the **Black-Litterman (BL) model** — to allocate liquidity across DeFi assets. This model balances **market equilibrium expectations** with **data-driven views**, ensuring both rational priors and adaptive intelligence steer capital.

The process integrates:
- **Market data ingestion**
- **View generation via signals or ML oracles**
- **Portfolio allocation using Black-Litterman (BL) mathematics**
- **Community governance (DAO)**
- **Vault execution of selected strategies**

---

## Mathematical Framework

The **Black-Litterman (BL) model** refines traditional mean-variance optimization by introducing a **Bayesian update** on market expectations.

### 1. **Equilibrium Market Returns**
Implied returns ($\Pi$) are inferred from market cap weights using:

$$
\Pi = \delta \Sigma w_m
$$

Where:
- $\Pi$: implied market return vector
- $\delta$: risk aversion coefficient
- $\Sigma$: asset return covariance matrix
- $w_m$: market capitalization weights

This reflects the “prior belief” — what the market consensus expects if there were no active views.

---

### 2. **Incorporating Views**
Investor or model-based views ($Q$) are expressed as:

$$
Q = P \mu + \epsilon
$$

- $Q$: view returns (e.g., “stETH will outperform USDC by 3%”)
- $P$: pick matrix (shows which assets each view relates to)
- $\mu$: true (unknown) expected returns
- $\epsilon$: view error with covariance $\Omega$

---

### 3. **Posterior Expected Returns**

The Bayesian posterior combines prior and views:

$$
\mu_{BL} = \left[ (\tau \Sigma)^{-1} + P^\top \Omega^{-1} P \right]^{-1} \left[ (\tau \Sigma)^{-1} \Pi + P^\top \Omega^{-1} Q \right]
$$

Where:
- $\tau$: scalar controlling confidence in prior (typically 0.025–0.05)
- $\mu_{BL}$: final expected returns used for allocation

---

### 4. **Posterior Covariance**

$$
\Sigma_{BL} = \Sigma + \left[ (\tau \Sigma)^{-1} + P^\top \Omega^{-1} P \right]^{-1}
$$

This matrix is used to solve for optimal weights via mean-variance optimization (max Sharpe, min volatility, etc.).

---

## Data + View Integration Pipeline

### Data Sources:
- **On-chain metrics** (e.g., TVL, volume, active addresses)
- **Off-chain metrics** (e.g., macro rates, FX rates)
- **Price & volatility** histories

These power both the prior returns ($\Pi$) and model-generated views ($Q$).

---

### View Generation (Phased Approach):

| Phase   | Description                     | View Generator                    | Confidence Estimate ($\Omega$)  |
|---------|--------------------------------|-----------------------------------|----------------------------------|
| Phase 1 | Rule-based heuristics           | Momentum, valuation, Sharpe filters | Inverse signal strength          |
| Phase 2 | ML Oracle                       | XGBoost / LSTM / LightGBM models   | Based on model prediction variance |
| Phase 3 | Ensemble & Bayesian models      | Ensemble, Bayesian NN, RL agent     | Posterior variance or ensemble spread |

---

## Allocation Lifecycle

1. **Market + View Data Ingested:**  
   Raw data is pulled from decentralized and centralized sources.

2. **Views Computed:**  
   Views are computed per asset (e.g., “tzBTC expected to outperform by 2.5%”).

3. **Black-Litterman (BL) Posterior Returns:**  
   The model combines market priors and views to yield final expected returns and a covariance matrix.

4. **Portfolio Weights Derived:**  
   An optimizer (e.g., max Sharpe) converts $\mu_{BL}$, $\Sigma_{BL}$ into allocation weights.

5. **DAO Governance:**  
   Allocations per view (e.g., conservative, neutral, aggressive) are **submitted for DAO vote**.

6. **Vault Execution:**  
   Upon approval, smart contracts execute rebalancing based on selected portfolio.

---

## Key Benefits

- **Provably Correct:** Uses formal, auditable methods grounded in financial theory.
- **Adaptively Intelligent:** Integrates ML for evolving market insights.
- **DAO Governed:** Maintains decentralized transparency and choice.
- **Risk-Aware:** Views are incorporated with confidence, not blindly enforced.

---

## Visual Architecture

*Diagram illustrating the flow from Market Data → View Generator (rule-based → ML oracle) → Black-Litterman (BL) Model → Proposed Allocations → DAO Vote → Vault Execution → Deployed Liquidity.*


---
