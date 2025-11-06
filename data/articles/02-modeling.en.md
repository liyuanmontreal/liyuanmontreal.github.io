**Corresponding Book Chapter:** [https://pierrelucbacon.com/rlbook/modeling/](https://pierrelucbacon.com/rlbook/modeling/)

### 1. Why Build a Model? For Whom?
- The meaning of “model” varies by field:  
  - In machine learning, it’s typically a parameterized function fit to data (e.g., a neural network).  
  - In control, operations research, and structural economics, a model is a **formal specification of a decision problem**—including system dynamics, states, controls, observations, objectives, and information assumptions.  
- In this book , use **decision-making model** defines not only how a system evolves but also what parts of the world are represented and how performance is evaluated.  
- Models provide the **structural scaffold** for optimization or learning.  
- Different purposes:  
  - **Structural models** capture mechanisms, enabling counterfactual reasoning.  
  - **Reduced-form models** capture statistical regularities for prediction or causal inference.  
  Both are valid, depending on goals.  
- The chapter asks: *What kinds of models best support decision-making from data, what assumptions they rely on, and how they shape what learning means.*

---

### 2. Modeling, Realism, and Control
- A model’s realism is not the main criterion for usefulness—**the test is whether it leads to effective decisions**.  
  - Simplified models can ignore details yet still yield good control performance.  
- Overly complex models can be counterproductive:  
  - harder to interpret and tune;  
  - fragile to parameter uncertainty;  
  - may overfit unstable details.  
- **A good control model** focuses on key dynamics, variables, and constraints that drive decision trade-offs.  
- Traditional control simplifies models and relies on feedback to handle uncertainty; RL takes a similar stance—judging success by the policy’s real-world performance rather than model accuracy.  
- **Example (home HVAC optimization)**:  
  - Researchers replaced a detailed simulator with a two-parameter model (thermal resistance, thermal capacitance).  
  - Despite 2°C errors, it revealed an optimal pre-cooling strategy, reducing peak power by 70% and cost by 60%.  
  - The simplified model captured the key structural insight: thermal mass allows load shifting.  
- **Conclusion:**  
  - A model can be inaccurate yet effective.  
  - For control and RL, *structural correctness outweighs numerical fidelity*.  


