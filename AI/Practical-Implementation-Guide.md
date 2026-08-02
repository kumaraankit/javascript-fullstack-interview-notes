# Practical Implementation Guide for AI Learning

This guide focuses on how to actually build and test AI projects using code, step by step.

## 1. Build a simple local chatbot with Ollama

### Step 1: Install Ollama
Download and install Ollama from the official website.

### Step 2: Run a model locally
```bash
ollama run llama3
```

### Step 3: Send a prompt
```text
Write a short Python function to add two numbers.
```

### Step 4: Build a Python wrapper
```python
import subprocess

prompt = "Explain Python decorators in simple terms"
result = subprocess.run(["ollama", "run", "llama3", prompt], capture_output=True, text=True)
print(result.stdout)
```

---

## 2. Build a simple FastAPI + Ollama app

### Step 1: Install dependencies
```bash
pip install fastapi uvicorn requests
```

### Step 2: Create app.py
```python
from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/ask")
def ask(question: str):
    payload = {"model": "llama3", "prompt": question}
    response = requests.post("http://localhost:11434/api/generate", json=payload)
    return response.json()
```

### Step 3: Run the server
```bash
uvicorn app:app --reload
```

### Step 4: Test it
Open:
```text
http://localhost:8000/ask?question=What%20is%20FastAPI?
```

---

## 3. Build a simple LangChain app

### Step 1: Install dependencies
```bash
pip install langchain openai
```

### Step 2: Create a simple chain
```python
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI

llm = OpenAI(model_name="gpt-3.5-turbo")
prompt = PromptTemplate(
    input_variables=["topic"],
    template="Explain {topic} in simple terms."
)

result = llm(prompt.format(topic="LangChain"))
print(result)
```

### Step 3: Improve it
Add memory, tool use, and retrieval later.

---

## 4. Build a simple Streamlit AI app

### Step 1: Install dependencies
```bash
pip install streamlit requests
```

### Step 2: Create app.py
```python
import streamlit as st
import requests

st.title("AI Chat Demo")
question = st.text_input("Ask a question")

if st.button("Send"):
    response = requests.get(f"http://localhost:8000/ask?question={question}")
    st.write(response.json())
```

### Step 3: Run it
```bash
streamlit run app.py
```

---

## 5. Build a simple MCP-style tool server concept

### Step 1: Define a tool
```python
class FileTool:
    def __init__(self, path):
        self.path = path

    def read(self):
        with open(self.path, "r", encoding="utf-8") as f:
            return f.read()
```

### Step 2: Use it in a simple flow
```python
tool = FileTool("example.txt")
print(tool.read())
```

### Step 3: Extend it
Add more tools such as web search, DB access, or API calls.

---

## 6. Build a simple agent workflow

### Step 1: Create a basic agent class
```python
class SimpleAgent:
    def __init__(self, name):
        self.name = name

    def think(self, task):
        return f"{self.name} will handle: {task}"
```

### Step 2: Use it
```python
agent = SimpleAgent("ResearchAgent")
print(agent.think("Summarize this article"))
```

### Step 3: Upgrade it
Add tool use and memory later.

---

## 7. Build a simple Hugging Face inference example

### Step 1: Install dependency
```bash
pip install transformers torch
```

### Step 2: Load a model
```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("I love learning AI")
print(result)
```

### Step 3: Use it in a real app
Wrap it in a FastAPI endpoint or Streamlit UI.

---

## 8. Build a simple fine-tuning example concept

### Step 1: Prepare a small dataset
```json
[
  {"text": "I love this product", "label": "positive"},
  {"text": "I hate this service", "label": "negative"}
]
```

### Step 2: Train a lightweight model using a simple pipeline concept
This is a practical prototype, not a production-grade training setup.

### Step 3: Evaluate results
Compare predictions before and after fine-tuning.

---

## 9. Recommended practice path
1. Start with local model usage using Ollama.
2. Build a simple FastAPI endpoint around it.
3. Add a Streamlit frontend.
4. Move to LangChain and LangGraph for workflow complexity.
5. Add MCP-style tools and agents.
6. Add testing and deployment later.

---

## 10. Interview tip
When preparing for interviews, do not only say what these tools are. Explain how you would build them step by step and what trade-offs you would consider.
