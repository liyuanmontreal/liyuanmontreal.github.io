
**Corresponding Book Chapter**: [https://pierrelucbacon.com/rlbook/](https://pierrelucbacon.com/rlbook/)

# Preface
**Comment:** This section discusses the current state of reinforcement learning (RL), its differences from supervised learning, analyzes the reasons behind these differences, and introduces the necessity of problem modeling.

### Current Situation
Reinforcement learning has made great progress. However, its practical applications are still far less widespread than those of supervised learning. The reason is not computational capability, but the difficulty of *problem modeling*—that is, “how to correctly define a decision problem.”

### Causes
The fundamental structural difference between the two types of tasks makes modeling harder.

- Supervised learning tasks usually have clearly defined inputs, outputs, and objective metrics, relying on labeled data to learn static mappings.  
- Reinforcement learning focuses on **interactive decision-making**, requiring explicit definitions of the environment, state, action, reward, exploration, data collection, and understanding of the environment’s structure.  
- The main challenge any sequential decision-making tool faces in application is:  
  > “The difficulty of the objective function and environment that real-world decision-makers face.” — *Iskhakov*  
- The greatest constraint on progress is not computational power, but understanding the structure underlying decision problems. — *Rust (1996)*

Therefore, solving real-world decision problems first requires **defining the problem correctly**.  
What should we optimize? What should we observe or control? How does information flow?


---
# What Problem Are We Solving?

**Comment:** This section explains that the core of reinforcement learning lies not in algorithms but in structuring problems. Problem modeling is the first step.

How to understand RL: it is a framework for **decision-making through experience**. It should be seen as a tool for improving decisions using data, not as a collection of algorithms.

- Sutton’s philosophy: *“Approximate the solution, not the problem.”* The problem is given and cannot be designed.  
- This book’s engineering philosophy: *“In real-world settings, problems are not given—they are defined.”* One must model before learning.


Thus, the core of RL is not algorithms, but **structuring decision problems**.  
This book follows the line of *modeling and optimal control*, progressing from state-space models to dynamic programming, optimal control, model predictive control (MPC), and finally to reinforcement learning algorithms.


# What Is the Meaning of Decision Problem Modeling?

**Comment:** This section explains that RL is only effective when the problem is properly modeled. Modeling must take into account real-world constraints and start from engineering practice—tailoring the model to the problem rather than forcing theory onto it.

### RL Modeling
Reinforcement learning is a framework for **learning to make decisions through experience**. But experience is only useful if we ask the right questions. Modeling determines **how learning proceeds and what we can actually learn**.

We need to structure problems: define objectives, clarify constraints, identify observable factors, and determine how decisions evolve over time.  
A poor example: simply feeding data into a black box.  
Good modeling **integrates real-world constraints**—physical limits, budgets, safety regulations, human expectations—from the start.

### Engineering Perspective
This book adopts an *engineering mindset*: not building idealized algorithms first and patching them later, but constructing optimization problems grounded in physics and engineering reality.

### Two Examples (HVAC and Irrigation)
1. Even when goals seem simple (energy saving, comfort, irrigation), they hide definitional ambiguity.  
2. “Comfort” may depend not only on temperature but also humidity, rate of change, and even psychological factors.  
3. “When to irrigate” depends not only on soil dryness but also on weather forecasts, plant health, electricity price, and risk tolerance.  
4. The **time scale** determines the model’s form and is itself a modeling dimension.

These seemingly small choices determine the model’s feasibility. Without clear definitions, one cannot write proper state equations, reward functions, or constraints.

### Relationship Between Operations Research (OR) and RL
Many RL problems are essentially **dynamic optimization** problems.  
Operations Research (OR) has long developed rigorous theory for this, including dynamic programming, linear programming, and MPC.

Differences:  
- OR starts from *models*, emphasizing constraints and optimality;  
- RL starts from *data*, emphasizing experience and adaptability.  
They are complementary: **OR provides structure, RL provides learning ability.**

### The Role of Abstraction
Abstraction is necessary but excessive abstraction can fail. Just as software frameworks grow complex, models can become obscured by their own abstractions.  
Do not force all problems into a pre-defined framework; analyze each problem in its own context.  
> “Start small, make hard constraints explicit early, and only add structure when necessary.”  
Good modeling aims not for universality but for *fit to the problem.*

### Defining the Problem Is Itself a Challenge

Reward definitions may capture only part of what matters. We lack systematic tools for formulating problems—sometimes we must rely on humans.

# Learning from Humans

**Comment:** This section addresses the question: *“If rewards are hard to define and demonstrations are limited, how can we make machines behave correctly?”*  
The answer is **learning from humans**—not just imitating behavior, but learning **intentional structure** and introducing **inductive bias** to enable learning even with limited data.

### Summary
- Imitation learning is insufficient → demonstrations are sparse and incomplete.  
- We must capture *what humans truly value* → via reward design, cost functions, preference modeling.  
- This leads to **RLHF (Reinforcement Learning from Human Feedback)**.  
- Supervised imitation has limitations → poor generalization, neglect of constraints.

Therefore, we must return to modeling: using structure (objectives, constraints, time, information flow) as inductive bias, so that learning remains stable and interpretable even with little data.  
The ultimate goal: build systems that **act for the right reasons**, combining learning from humans and modeling disciplines.

### Comparison of Approaches

| Method | Description | Limitation |
|--------|--------------|-------------|
| **1. Imitation Learning** | Observe experts and mimic behavior. | Data is scarce and incomplete; fails in unseen states. |
| **2. Preference Learning / RLHF** | Infer human value functions through comparison, ranking, or feedback. Under von Neumann–Morgenstern assumptions, preferences correspond to a utility function. | Requires human supervision and consistent feedback. |
| **3. Supervised Learning** | Fit a black-box model to human-labeled data. | Strong results in lab settings (e.g., Decision Transformer), but weak generalization and constraint handling in the real world. |

  
The key is structure: **what makes learning feasible is not more data but better modeling**.  
By modeling objectives, constraints, time structure, and information flow, we introduce inductive bias reflecting the physical and cognitive regularities of the world.  
Learning only from human *behavior* risks misinterpretation; learning only from *data* risks instability.  
**Combining the two—learning intentions from humans and structure from modeling—creates systems that act for the right reasons.**


# The Road Ahead

**Comment:** This section compares two visions for the future of modeling and highlights how large language models (LLMs) open new opportunities. It reaffirms the book’s central idea: the *Modeling Mindset.*

The bottleneck of RL is not algorithms but modeling. Despite decades of progress, RL still struggles to improve real-world decision-making in healthcare, energy, climate, and logistics. The problem is not that RL is weak, but that **we fail to formulate solvable versions of real problems**.

### Role of LLMs
Large Language Models bring new opportunities: though they cannot directly perform modeling, they can serve as *modeling assistants*, helping us **think, articulate, structure, and discover**.  
LLMs are not traditional “agents.” They do not interact with the world or optimize over time. They are **modeling tools**, capable of reflecting, organizing, and expressing human knowledge and thought.  
We can regard them as **assistants for structured reasoning.**

### The Two Futures of Modeling

| Vision | Origin | Features | Risks |
|--------|---------|-----------|--------|
| **1. Model-Free Vision** | Sutton’s long-term ideal | Agents learn everything from massive unstructured experience | Abstract and general but lacks constraints and grounding |
| **2. Modeling-Oriented Vision** | This book’s approach | Machines assist humans in clarifying goals, uncovering assumptions, defining constraints, and building models | Controllable and responsible, but requires human guidance |
---
### Conclusion
> “This book aims to build the bridge—from goals to models, from data to decisions, from abstraction to action.”  
> *The Modeling Mindset:* from describing the world → to defining a controllable one; from optimizing algorithms → to optimizing problems; from pursuing intelligence → to pursuing meaningful intelligence.



