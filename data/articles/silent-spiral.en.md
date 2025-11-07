# Modeling the Spiral of Silence Phenomenon

## Background

The **Spiral of Silence** is a political science and mass communication theory.  
It describes a phenomenon where, when people express their opinions, they are more likely to speak up if they see their views widely accepted, causing such opinions to spread more boldly.  
Conversely, when people notice that a certain opinion receives little support—or even backlash—they tend to remain silent even if they personally agree with it.  

The silence of one side strengthens the voice of the other, and through continuous feedback, the dominant opinion becomes louder while the minority becomes quieter—forming a *spiral* of increasing dominance and suppression.  
The theory is based on the assumption that **most individuals try to avoid isolation** caused by holding unique attitudes or beliefs.

The consequence is that each individual decides whether to speak based on the opinions of those around them and media signals, thereby changing the visible distribution of public opinion.

This project aims to use **machine learning and multi-agent modeling** to simulate this phenomenon and explore:

- What factors lead minorities to remain silent?  
- How can ML predict the probability of an individual speaking out?  
- How can platform design mitigate polarization in public opinion?

---

## Modeling

### 1. Variables

| Symbol | Meaning | Range |
|--------|----------|--------|
| $o_i$ | True opinion of individual $i$ | \([-1,1]\) |
| $\hat{m}_i$ | Perceived mainstream opinion | \([-1,1]\) |
| $\tau_i$ | Voice threshold (tolerance) | \([0,1]\) |
| $s_i$ | Whether to speak | \(\{0,1\}\) |

---

### 2. Voice Decision (Threshold Model)

$$
s_i(t)=\mathbb{1}(|o_i - \hat{m}_i(t)| \le \tau_i)
$$

- $o_i$: the true opinion of individual $i$.  
- $\hat{m}_i(t)$: perceived mainstream opinion at time $t$.  
- $\tau_i$: individual tolerance (voice threshold); larger $\tau_i$ means less fear of differing from the mainstream.  
- $s_i(t) \in \{0,1\}$: whether to speak (1 = speak, 0 = silent).  
- $\mathbb{1}(\cdot)$: indicator function, equals 1 if the condition is true, otherwise 0.

If a person's true opinion is close to what they perceive as mainstream (difference smaller than $\tau_i$), they think “my opinion is not too extreme” and thus speak up.  
If the difference is large, they fear isolation and remain silent.

> Minorities feel “too different” → stay silent → the public space appears more mainstream → more people feel isolated → more silence.

---

### 3. Estimation of Mainstream Opinion

$$
\hat{m}_i(t) = w_n \cdot \text{average of visible neighbors} + w_m \cdot \text{media bias}
$$

- Individuals do not know the true social average; they **perceive** it from:  
  - visible opinions of neighbors (who spoke);  
  - the mainstream voice transmitted by the media (which may be biased).  
- $w_n$, $w_m$: weights of social network and media influence (sum to 1).

Each person’s “perceived mainstream” is a weighted average—shaped by both social interactions and media.  
If media bias is strong (high $w_m$ and strong bias), the entire society’s perceived mainstream drifts in one direction.

---

### 4. Visible Opinion and Feedback

$$
v(t)=\frac{\sum_i s_i(t)o_i}{\sum_i s_i(t)}
$$

- Only **those who speak** ($s_i=1$) are counted.  
- Their true opinions $o_i$ are averaged.  
- This represents the *visible public opinion* (apparent mainstream).

In public space, the “average opinion” comes only from those who speak out.  
If silent individuals hold opposing views, the visible mainstream can deviate sharply from the true one.

---

## Experimental Metrics

| Metric | Meaning |
|--------|----------|
| **Silence Rate** | Proportion of silent individuals |
| **Bias** | Difference between true and visible mean opinions |
| **Polarization** | Standard deviation of opinions among speakers |
| **Spiral Depth** | Number of iterations needed for silence rate to converge to a high level |

By adjusting the following parameters:

- **Media bias (`media_bias`)**  
- **Social weight (`w_n` vs `w_m`)**  
- **Anonymity mechanism (raising $\tau_i$)**  

We can observe how the *Spiral of Silence* is amplified or weakened.

---

## Experimental Design

**Experiment 1: Media Bias and Amplification of the Spiral**  
*Question:* Does stronger media bias increase the deviation between visible and true opinions? Do minorities become more silent?  

**Experiment 2: Individual Tolerance (τ) and Opinion Diversity**  
*Question:* When people are psychologically less tolerant or more afraid of exclusion, does the spiral intensify?  

**Experiment 3: Network Structure (Local vs Small-world)**  
*Question:* How do different network structures (local clusters vs small-world vs random) affect silence and polarization?  

**Experiment 4: Critical Mass of Minorities (Phase Transition)**  
*Question:* As the minority proportion increases from very small, is there a “critical threshold” beyond which they stop being silent?  

**Experiment 5: Anonymity Mechanism (Policy Evaluation)**  
*Question:* Can anonymity or protection mechanisms (equivalent to higher τ) effectively reduce silence and cognitive bias?  
