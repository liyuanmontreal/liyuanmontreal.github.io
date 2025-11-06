Public transit strikes involve strategic interactions between unions, operators, and government, alongside public sentiment and service disruption. If I remember correctly, there have been four bus strikes in Montreal as of today.This article try to use a continuous-time model for the Montréal transit strike that integrates differential games, social dynamics, and behavioral choice theory. The model captures feedback loops between negotiation strategies, service supply, media attention, and political intervention.



## 1. Introduction
Transit labor disputes in Montréal represent a dynamic process: wage negotiation → strike action → government intervention → public sentiment → agreement. Transit strikes are thus political-economic-social feedback systems.

Here, create a continuous-time model to capture the strategic behavior of unions, operators, government, and public opinion.



## 2. Model Framework

### 2.1 Agents and Objectives
### 2.1 Agents and Objectives

| Agent           | Objective                           | Controls                                    |
|-----------------|-------------------------------------|---------------------------------------------|
| Union           | Maximize wage/benefits              | Strike intensity s, union offer( o<sub>U</sub> )    |
| Transit operator| Minimize cost, maintain service     | Emergency supply ( u<sub>q</sub>), operator offer(o<sub>C</sub>)|
| Government      | Stability & political approval      | Subsidy g, messaging r, arbitration h |
| Public/Media    | Opinion formation & pressure        | Sentiment p, media stance m                |




### 2.2 State Variables
$$
x(t) = [w,\; q,\; p,\; m,\; b,\; \ell \,]^\top
$$

---

## 3. Dynamic Equations

### 3.1 Service level \(q\)
$$
\dot{q} \;=\; -\alpha_s\, s\, q \;+\; \beta_u\, u_q\, (1-q) \;-\; \gamma_p\, p\, q
$$

Theoretical Sources:
- Forrester (1961) System Dynamics: Inventory-Flow Mechanism
- Healthcare/Public Service Disturbance Recovery Model: Capacity decay + Recovery
- Reliability engineering: Availability = \(1 - failure + repair\)

Explanation:
- Strikes (s) reduce effective capacity
- Emergency deployment (u<sub>q</sub>) accelerates recovery
- Public opinion pressure (p) reduces organizational efficiency

### 3.2 Public sentiment \(p\)
$$
\dot{p} \;=\; a_1(1-q) \;+\; a_2\,\max(\bar{o}-w,\,0) \;+\; a_3\, m \;-\; a_4\, r \;-\; \delta_p\, p
$$

Theoretical Sources:
- Akerlof & Shiller Behavioral Macroeconomics: Emotion-Driven Economy
- Friedkin–Johnsen Model (1990, 1999): Social Influence + Fixed Preferences
- Nordhaus Political-Economic Cycle (1975): Policy → Public Opinion Feedback

Explanation:
- Service Deterioration → Decreased Citizen Experience → Accumulated Resentment
- "Expected Wage Increase > Current Wage" → Concern about Rising Ticket Prices/Taxes
- Media Amplifies Dissatisfaction
- Government Communication Provides "Emotional Cooling"
- Natural Emotional Decline Term (delta_p)

### 3.3 Media stance \(m\)
$$
\dot{m} \;=\; \eta_1(1-q) \;+\; \eta_2\, s \;-\; \eta_3\, u_q \;-\; \eta_4\, r \;-\; \delta_m\, m
$$

Theoretical Sources:
- McCombs & Shaw (1972): Media Agenda Setting Theory
- Protest framing literature: Strikes → Media Resonance
- Crisis communication models: Official statements can "dilute" negative impacts

Explanation: 
Strikes and disruptions attract media attention; emergency response and information disclosure improve the direction of reporting.

### 3.4 Bargaining gap \(\ell\)
$$
\dot{\ell} \;=\; -(\rho_0 + \rho_1\, h + \rho_2\, p)\,\ell \;+\; \kappa_\ell\, \max(0, \chi)
$$

Theoretical Sources:
- Rubinstein (1982) Alternating Offer Model
- Calvo (1983) Adjusted Probability Model (Sticky Expectation)
- Political Bargaining Model: Social Pressure Affects the Discount Rate

Explanation:
- Political pressure and arbitration increase the pace of negotiation; unforeseen events may widen the closure gap.
- Both sides naturally converge over time.
- Mining (h) increases "time cost" → faster concessions.
- Public opinion (p) increases political risk → accelerates convergence.
- Unforeseen events (chi) (such as political statements) may temporarily widen the gap.

### 3.5 Wage adjustment \(w\)
$$
\dot{w} \;=\; \kappa_w\, (\bar{o} - w)\, \sigma_\tau(\epsilon - \ell), 
\qquad 
\bar{o} = \alpha_o\, o_U + (1-\alpha_o)\, o_C,
\quad 
\sigma_\tau(z) = \frac{1}{1+e^{-z/\tau}}
$$

Theoretical Sources:
- Sticky wage expectations
- Logistic gate seen in hybrid control/smooth switching
- Nash bargaining convergence zone

Explanation:
- If the gap is small (\ell < \epsilon\) (close to reaching an agreement) → wages quickly converge towards the compromise offer
- Logistic gate function \(\sigma_\tau\) avoids discontinuous jumps (consistent with the actual negotiation rhythm)

### 3.6 Behavioral dynamics
$$
\dot{s}=\lambda_s\big(\sigma(\beta_s \Delta_U)-s\big), 
\qquad 
\dot{u}_q=\lambda_q\big(\sigma(\beta_q \Delta_C)-u_q\big)
$$

Theoretical Sources:
- Quantal Response Equilibrium (McKelvey & Palfrey, 1995)
- Evolutionary dynamics → partial adjustment
- Tempered Utility / Softmax RL (Sutton & Barto)

Explanation:
- Unions and firms are not instantaneously optimal; there is learning, inertia, and emotional interference, and strategies gradually converge towards better decisions.
- $\sigma(\cdot)$= “probabilistic rationality”
- $\lambda$ controls the rate of change in behavior
- This model allows for delays, probing, irrationality, and gradualism, consistent with real-world negotiation behavior.



## 4. Mechanism Explanation 

### System evolution
1) Strike → service loss → public pressure → faster concession  
2) Government intervention → stabilize service → calm opinion → accelerate agreement  
3) Media framing → shapes political pressure and bargaining direction

### Policy Levers Explaniation

| Tool | Effect |
|---|---|
Minimum service  q<sub>min</sub>  | Prevent extreme public harm and sentiment spikes |
Arbitration  h | Speed up convergence and reduce conflict duration |
Communication  r  | Stabilize public expectations |
Targeted subsidy  g | Increase bargaining space (with budget tradeoff) |


## 5. Data

### 5.1 Key Variables & Sources

| Variable                     | Source                       | Method                  |
|------------------------------|------------------------------|-------------------------|
|Service \(q\)                 | GTFS-RT, ops logs            | Transit APIs / Open data|
|Strike \(s\)                  | Shutdown share, union notices| Scraping / news         |
|Sentiment \(p\)               | Complaints, Trends, social   | NLP indices             |
|Media \(m\)                   | News sentiment/stance        | GDELT / NewsAPI         |
|Budget \(b\)                  | Municipal finance            | Open gov data           |
|Offers $\ell$, w, o<sub>U</sub>, o<sub>C</sub>| Statements / reports         | NLP extraction          |

### 5.2 Possible Acquisition Channels
- Open transit data portals (Montréal, Toronto, EU, U.S. metro areas)
- GTFS-RT feeds & Transit API
- Google Trends + Twitter/Reddit scraping
- GDELT news corpus
- Government press releases & budget reports



## 6. Conclusion
This article proposed a dynamic model for the Montréal transit strike that integrates bargaining theory, socio-political dynamics, and media effects. 

Based on this model, the problem is further structured as an optimization strategy problem, providing reference opinions for decision-making by all parties.