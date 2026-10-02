
# FoundryOS

### Multi-Agent AI Platform for Business Idea Evaluation

FoundryOS is a multi-agent AI platform that helps entrepreneurs evaluate business ideas from multiple perspectives. Instead of relying on a single AI response, FoundryOS coordinates six specialized AI agents, each focused on a different business domain, and generates structured reports that can be used as reference points during early-stage planning.

## Overview

A business idea often needs to be evaluated across multiple areas such as technology, market potential, finance, marketing, and product development.

FoundryOS addresses this by assigning different aspects of the evaluation to specialized AI agents. The agents analyze the user's business idea independently within their domains and produce structured insights that are combined into downloadable reports.

## Demo

[![Watch FoundryOS Demo](https://img.shields.io/badge/Watch_Demo-FoundryOS-6C63FF?style=for-the-badge)](https://github.com/user-attachments/assets/2923aa30-5201-46cb-95e9-c4f85dff3f94)

**Input:**

* Business idea
* Estimated cost
* Main goal

**Output:**

* Domain-specific analysis
* Structured recommendations and considerations
* Downloadable reports
* Multi-perspective evaluation of the business idea



## AI Agent Architecture

FoundryOS uses six specialized agents, each representing a different business perspective:

| Agent      | Role            | Focus                                                |
| ---------- | --------------- | ---------------------------------------------------- |
| **Atlas**  | CEO             | Overall business strategy and planning               |
| **Vector** | CTO             | Technical architecture and technology considerations |
| **Oracle** | Market Research | Market and competitive analysis                      |
| **Ledger** | Finance         | Cost and financial considerations                    |
| **Echo**   | Marketing       | Marketing and customer acquisition                   |
| **Prism**  | Product Manager | Product development and MVP planning                 |

The agents are orchestrated to transform a single business idea into a multi-domain evaluation.

## Key Features

* **Multi-Agent AI Analysis**
  Coordinates six specialized AI agents for different business perspectives.

* **Structured Business Reports**
  Generates organized domain-specific reports rather than a single unstructured response.

* **Multi-Domain Evaluation**
  Covers strategy, technology, market research, finance, marketing, and product development.

* **User-Provided Business Context**
  Evaluations are generated using the business idea, estimated cost, and primary goal provided by the user.

* **Downloadable Reports**
  Individual domain reports can be downloaded for later reference.

* **AI-Orchestrated Workflow**
  Uses LangChain to manage the interaction between the application and specialized agents.

* **Decision-Support Approach**
  Presents AI-generated insights as reference points to support early-stage evaluation rather than making final business decisions.

## Technology Stack

**Backend**

* Python
* FastAPI

**AI & Orchestration**

* LangChain
* Groq API
* Large Language Models

**Development**

* Git
* GitHub
* REST APIs

## How It Works

```text
                Business Idea
                     │
                     ▼
          ┌─────────────────────┐
          │    FoundryOS Core   │
          │   AI Orchestration  │
          └──────────┬──────────┘
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
    Strategy      Technology     Market
     Atlas          Vector       Oracle
       │             │             │
       ├─────────────┼─────────────┤
       ▼             ▼             ▼
    Finance       Marketing      Product
     Ledger          Echo         Prism
       │             │             │
       └─────────────┼─────────────┘
                     ▼
          Structured AI Reports
                     │
                     ▼
             Downloadable Output
```

## Project Structure

```text
FoundryOS/
│
├── app/
│   ├── agents/
│   ├── routes/
│   ├── services/
│   └── ...
│
├── templates/
├── static/
├── requirements.txt
├── .env.example
└── README.md
```



## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sayeedazaiba/FoundryOS.git
cd FoundryOS
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file and add your Groq API key:

```env
GROQ_API_KEY=your_api_key_here
```



### 5. Run the application

```bash
uvicorn main:app --reload
```

The application will be available locally at:

```text
http://127.0.0.1:8000
```

## Future Improvements

* Add a dedicated reviewer/validation agent to cross-check generated reports.
* Improve agent collaboration and information sharing.
* Add additional business evaluation domains.
* Introduce persistent report history.
* Enhance report visualization and comparison.
* Improve evaluation consistency through structured validation.

## Project Purpose

FoundryOS was developed to explore how multi-agent AI systems can divide a complex real-world problem into specialized tasks and combine their outputs into a practical decision-support workflow.

## Author

**Sayeeda Zaiba**

B.E. Electronics & Communication Engineering
Ballari Institute of Technology and Management

* GitHub: https://github.com/Sayeedazaiba
* LinkedIn: https://linkedin.com/in/sayeeda-zaiba-96a250313/

---


