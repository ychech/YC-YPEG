# Prompt Engineering Guide 1: Text Generation Parameters

> Prompt Engineering is a relatively new discipline focused on prompt development and optimization, helping users leverage Large Language Models (LLMs) for various scenarios and research fields.

---

## Text Generation Control Parameters

When writing prompts, we need to adjust parameters to match our testing needs. These are commonly called:

- **Generation Hyperparameters**
- **Decoding Parameters**

Simply put, they are parameters that control what the model generates.

### 1. Sampling

LLMs are essentially **next-token predictors**. They do one thing:

> Given previous text, **predict the probability of the next token**.

When you give the model a sentence, it calculates the probability of each possible next word, then randomly selects one based on those probabilities.

This "randomly select a word based on probability" action is called: **Sampling**.

---

## Sampling Parameters

### 1.1 Temperature

**Higher temperature = more diversity; Lower = more deterministic.**

Temperature "softens" the probability distribution:
- **High**: Random, diverse, creative
- **Low**: Deterministic, strict, focused

| Temperature | Effect |
|-------------|--------|
| **High ↑** | Random, diverse |
| **Low ↓** | Deterministic, strict |

**Example:** For the sentence `The weather today is ____`

**Hard distribution (Temperature = 0):**
- good (80%) — almost always chosen
- great (10%) — rarely
- hot (5%) — almost never
- cold (3%) — almost never
- bad (2%) — almost never

**Softened distribution (Temperature = 2.0):**
- good (30%)
- great (25%)
- hot (20%)
- cold (15%)
- bad (10%)

As temperature increases, low-probability words rise, making output more random.

---

### 1.2 Top_p (Nucleus Sampling)

**Higher top_p = more diversity; Lower = more deterministic.**

Unlike temperature, Top_p uses **cumulative probability distribution**.

Set a probability threshold `P`. The model:
1. Sorts all candidate words by probability
2. Accumulates probabilities until sum ≥ P
3. Only samples from this "core set"

**Example:** Probabilities: good (80%), great (10%), hot (5%), cold (3%), bad (2%)

With `top_p = 0.9`:
1. **good: 0.8** (0.8 < 0.9, continue)
2. **great: 0.1** (0.8 + 0.1 = 0.9, done!)
3. Core set = {good, great}
4. Words outside (hot, cold, bad) are **discarded**

Normalize probabilities:
- good: 0.8 / 0.9 ≈ **88.9%**
- great: 0.1 / 0.9 ≈ **11.1%**

---

### 1.3 Key Notes

:::tip Recommendation
Only change **one** of Temperature or Top_p. Keep the other at default `1.0`.
:::

*(Content extracted from Yuque knowledge base "Prompt Engineering Guide 1")*
