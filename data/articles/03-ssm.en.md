**Corresponding Book Chapter:** [https://pierrelucbacon.com/rlbook/ssm/](https://pierrelucbacon.com/rlbook/ssm/)

# Dynamics Models for Decision Making 

$$
(\mathbf{x}_0,\ \{\mathbf{u}_t\},\ \{\mathbf{d}_t\}) \ \longmapsto\ \{\mathbf{x}_t,\ \mathbf{y}_t\}_{t=0:T},
$$

- **Purpose**: Go beyond correlations to describe how a system **evolves over time** and how it **responds to chosen inputs**—the backbone of planning, policy evaluation, and interactive learning.  
- **Trajectory-generator view**: Given an initial condition, a control sequence, and exogenous drivers, the model should **roll forward** a trajectory of states and observations.  
- **Control vs. disturbance**: Separate **controls** (u, what we can act on) from **exogenous drivers** (d, what we must accommodate).  
- **Two design pressures**:  
  1) **Input responsiveness**: expose the levers relevant to the decision problem;  
  2) **Memory management (state)**: a compact **state** summarizing “what matters so far” to predict the next step.  
- **State-space perspective**: Express dynamics in discrete or continuous time so the model can be **composed** with estimators and controllers; linear models trade fidelity for **clarity and speed**, not because reality is linear.  
- **Discrete vs. continuous time**: Implementation is often discrete (sampling/actuation), while **continuous-time** reasoning clarifies physical assumptions, multiscale structure, and invariants; the two are connected via numerical discretization and holds.  


# State-Space Perspective

- **Core Concept:**  
  Most dynamical systems—whether physics-based or data-driven—can be expressed in **state-space form**.  
  - **State** $\mathbf{x}$: compact memory summarizing the past for prediction and control.  
  - **Control** $\mathbf{u}$: input we can manipulate.  
  - **Disturbance** $\mathbf{d}$: external factors we cannot control.  
  - **Observation** $\mathbf{y}$: measurable outputs.  

- **Discrete vs. Continuous Time:**  
  - **Discrete Time:**  
 $\mathbf{x}_{t+1} = f_t(\mathbf{x}_t, \mathbf{u}_t), \qquad \mathbf{y}_t = h_t(\mathbf{x}_t, \mathbf{u}_t).$

  - **Continuous Time:**  
$$\dot{\mathbf{x}}(t) = f(\mathbf{x}(t), \mathbf{u}(t)), \qquad \mathbf{y}(t) = h(\mathbf{x}(t), \mathbf{u}(t)).
$$
They are interchangeable through **numerical discretization** or **zero-order hold** or **interpolation**.

- **Hybrid Nature of Real Systems:**  
  Controllers operate digitally, but the world evolves continuously.  
  Control software sends discrete commands via DACs to analog hardware,  
  while sensors feed back continuous signals through ADCs to the digital controller.  
  Thus, most real systems combine **continuous dynamics** with **discrete control**.

- **Why Keep Continuous-Time Models:**  
  - Make physical assumptions explicit;  
  - Connect naturally to domain knowledge (mechanics, thermodynamics);  
  - Reveal invariants and conservation laws;  
  - Facilitate multi-scale reasoning and error analysis.

- **Linearization:**  
  When $f$ and $h$ are linear:  
  
$\dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u}, \qquad \mathbf{y} = C\mathbf{x} + D\mathbf{u}.$

  Linearity is not a belief about the world but a **modeling choice** for transparency and computational efficiency.  
  For readers from ML, this mirrors **RNNs**: the state is the hidden vector, the control is the input, and the output is the readout layer.

- **Time vs. Frequency Domain:**  
  Classical control often analyzes linear systems via **Laplace** or **Z-transforms** for stability,  
  but for learning and simulation, the **time-domain state-space view** offers greater flexibility.


# Example of Deterministic Dynamics: HVAC Control
- **Scenario:**  
  In Montréal’s winter, outdoor temperature is −20°C while a thermostat maintains comfort.  
  The system—air, wall, heater, and weather—forms a **thermal dynamical system**.

- **Goal:**  
  Capture the key heat-transfer mechanisms with minimal parameters.
---

### 1. Single-Mass Model (1R1C)


$$
\dot{\mathbf{x}}(t) = -\frac{1}{RC}\mathbf{x}(t) + \frac{1}{RC}\mathbf{d}(t) + \frac{1}{C}\mathbf{u}(t).
$$

where:  
- \(x(t)\): indoor temperature  
- \(u(t)\): heating power (control input)  
- \(d(t)\): outdoor temperature (disturbance)  
- \(R\): thermal resistance  
- \(C\): thermal capacitance  

Linear continuous-time system:  
$$
\dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t) + \mathbf{E}\mathbf{d}(t), \quad \mathbf{y}(t) = \mathbf{C}\mathbf{x}(t),
$$
---

### 2. Two-Mass Model (2R2C)

Add wall temperature as another state:

$$
\mathbf{A} = \begin{bmatrix}
-\frac{1}{R_{\text{ia}}C_{\text{air}}} & \frac{1}{R_{\text{ia}}C_{\text{air}}} \\
\frac{1}{R_{\text{ia}}C_{\text{wall}}} & -\left(\frac{1}{R_{\text{ia}}} + \frac{1}{R_{\text{wo}}}\right) \frac{1}{C_{\text{wall}}}
\end{bmatrix},
\quad
\mathbf{B} = \begin{bmatrix} \frac{1}{C_{\text{air}}} \\ 0 \end{bmatrix},
\quad
\mathbf{E} = \begin{bmatrix} 0 \\ \frac{1}{R_{\text{wo}}C_{\text{wall}}} \end{bmatrix},
\quad
\mathbf{C} = \begin{bmatrix} 1 & 0 \end{bmatrix}.
$$

Matrix interpretation:  
- \(A_{11}\): air-to-wall loss  
- \(A_{12}\): air gain from wall  
- \(A_{21}\): wall gain from air  
- \(A_{22}\): wall loss to air and outside  

The model exhibits **thermal inertia** — the wall acts as a heat buffer, smoothing fluctuations.

---

### 3. Control Inputs 

Depending on both what we want to achieve and what we can implement in practice., control \(\mathbf{u}(t)\) can represent:  
- Continuous heating power;  
- Temperature setpoint;  
- Binary on/off signal;  
- PID feedback logic.  



# From Deterministic to Stochastic

- **Motivation:**  
  Deterministic models assume perfect predictability, but real systems involve uncertainty—sensor noise, parameter drift, unmodeled effects.  
  To handle this, we move to **stochastic dynamics models**.

---

### 1. Function + Noise Formulation

The most direct extension is to add a noise term to the deterministic model:
$$
\mathbf{x}_{t+1} = f_t(\mathbf{x}_t, \mathbf{u}_t, \mathbf{w}_t), \quad \mathbf{w}_t \sim p_{\mathbf{w}}.
$$

If noise is additive and Gaussian:  
$$
\mathbf{x}_{t+1} = A\mathbf{x}_t + B\mathbf{u}_t + \mathbf{w}_t, \quad \mathbf{w}_t \sim \mathcal{N}(0, Q).
$$
This is the standard linear Gaussian model (used for Kalman filtering).


Noise may also be non-Gaussian ：

$$
\mathbf{x}_{t+1} = f(\mathbf{x}_t, \mathbf{u}_t) + \mathbf{w}_t, \quad \mathbf{w}_t \sim \text{Laplace}, \ \text{or}\ \text{Student-t},
$$

This is known as a **convolution model**: the next-state distribution is a shifted version of the noise distribution, centered around the deterministic prediction. 
 it's a special case of a **pushforward measure**: the randomness from $\mathbf{w}_t$ is "pushed forward" through the function $f$ to yield a distribution over outcomes. 

Note: The core idea previously speculated was "the propagation of randomness."
Randomness is propagated through a function. Instead of directly modeling the output distribution, we calculate the output distribution using the known input distribution and the system function.