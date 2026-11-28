/**
 * Single source of truth: Personal Knowledge Base – Abderrahmane Lartab.
 * Used by the Gemini backend assistant (and local fallback) to answer maximum
 * portfolio-related questions accurately without ever inventing facts.
 */

export const abderrahmaneProfile = {
  identity: {
    fullName: "Abderrahmane Lartab",
    location: "Casablanca, Morocco",
    role: "Full Stack & AI Developer",
    headlineRoles: [
      "Full Stack & AI Developer",
      "Machine Learning & Computer Vision",
      "Python, React & Cloud Data",
    ],
    interests: [
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Engineering",
      "Cloud Computing",
    ],
    availability:
      "Open to Full Stack Development, AI Development, Machine Learning, and Data Engineering opportunities (internships and entry-level roles).",
  },

  contact: {
    email: "lartab.abderrahmane@gmail.com",
    linkedin: "https://linkedin.com/in/alartab",
    github: "https://github.com/abderrahmane-lartab",
    portfolio: "https://lartab.vercel.app/",
  },

  languages: ["Arabic", "French", "English"],

  education: [
    {
      title: "YouCode – AI Developer Program",
      location: "Safi, Morocco",
      period: "2026–2027",
      status: "Currently studying",
      details:
        "Hands-on training focused on data preparation, machine learning, deep learning, intelligent APIs, external AI services and MLOps.",
    },
    {
      title: "OFPPT – ISAG Lalla Aicha",
      program: "Développement Web Full Stack",
      period: "2024–2026",
      details:
        "Training in frontend development, backend development, databases, APIs and software engineering.",
    },
    {
      title: "Lycée Homan El Fatwaki",
      program: "Baccalauréat Sciences Physiques",
      period: "2024",
    },
  ],

  experience: [
    {
      title: "Full Stack Developer Intern",
      organization: "BRT Solutions",
      period: "March 2026 – April 2026",
      details:
        "Worked on a school management SaaS application. Contributed to frontend development and features related to students, classes, payments, administration and SMS. Collaborated on improving user experience.",
    },
  ],

  skills: {
    frontend: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Next.js",
      "TypeScript",
    ],
    backend: ["PHP", "Laravel", "Node.js", "Python", "FastAPI", "REST APIs"],
    aiAndMl: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "YOLOv8",
      "Data preprocessing",
      "EDA",
      "Feature engineering",
      "Classification",
      "Regression",
      "Deep learning",
      "Computer vision",
      "Object detection",
    ],
    dataEngineeringAndCloud: [
      "Azure Data Factory",
      "Azure Data Lake Storage Gen2",
      "Azure Machine Learning",
      "PySpark",
      "Apache Airflow",
      "MLflow",
      "Docker",
      "ETL pipelines",
    ],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "SQL", "NoSQL"],
    tools: [
      "Git",
      "GitHub",
      "Linux",
      "Fedora",
      "Bash",
      "Docker",
      "Jupyter Notebook",
      "VS Code",
      "Jira",
      "Streamlit",
    ],
  },

  projects: [
    {
      name: "DataCo RecEngine – Powered by Azure AI",
      category: "Data Engineering & Machine Learning",
      technologies: [
        "Azure Data Factory",
        "Azure Data Lake Storage Gen2",
        "Azure Compute",
        "Azure Machine Learning",
      ],
      summary:
        "An end-to-end Azure data engineering and machine learning project focused on consumption forecasting. Uses Azure Data Factory, Azure Data Lake Storage Gen2, Azure Compute and Azure Machine Learning.",
    },
    {
      name: "Brain Tumor AI",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/abderrahmane-lartab/TumorClassificationAndDetection",
      relatedGithub: "https://github.com/abderrahmane-lartab/Brain-IRM-CNN",
      technologies: [
        "TensorFlow",
        "Keras",
        "GoogLeNet",
        "YOLOv8",
        "MLflow",
        "Apache Airflow",
        "FastAPI",
        "Streamlit",
      ],
      summary:
        "A deep learning and computer vision project for brain tumor classification and detection using MRI images. Classification classes include Glioma, Meningioma, No Tumor and Pituitary.",
    },
    {
      name: "Telco Customer Churn Prediction",
      category: "Machine Learning",
      github: "https://github.com/abderrahmane-lartab/Prediction-Churn-Client",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "KNN"],
      summary:
        "A machine learning solution analyzing customer behavior, segmenting distinct customer profiles, and predicting subscription cancellation (churn) using Python, Pandas, NumPy and Scikit-learn.",
    },
    {
      name: "AI-Powered Portfolio",
      category: "Full Stack & LLM Integration",
      technologies: ["React.js", "Tailwind CSS", "Node.js", "Gemini API"],
      summary:
        "An interactive personal developer portfolio featuring an LLM chatbot integrated with the Gemini API that answers questions using personal professional information and project context.",
    },
    {
      name: "Other Projects",
      category: "Full Stack Web",
      technologies: ["React.js", "Laravel", "REST APIs"],
      summary:
        "Digitech E-commerce, CRM Sales Pipeline, and School Management SaaS.",
    },
  ],

  certifications: [
    "Google AI Essentials",
    "Meta React Basics",
    "Meta MySQL Database Structures",
    "Boolean Web Development Fundamentals Camp",
    "IBM Soft Skills",
    "Udemy Git & GitHub Bootcamp",
  ],

  careerObjectives: {
    opportunities:
      "Interested in Full Stack Development, AI Development, Machine Learning and Data Engineering opportunities.",
    longTermGoal:
      "Build intelligent software products by combining modern web technologies, AI models, LLMs and cloud infrastructure.",
  },

  voiceIntroScript:
    "Hi, I'm Abderrahmane Lartab, a Full Stack and AI Developer from Casablanca, Morocco, currently studying in the AI Developer Program at YouCode. I combine modern web technologies like React, Next.js, TypeScript, Laravel, and FastAPI with Machine Learning, Computer Vision, and Azure Data Engineering to build intelligent software applications. Feel free to explore my projects or ask my assistant anything about my work.",
};

export const KNOWLEDGE_BASE_MARKDOWN = `# Personal Knowledge Base – Abderrahmane Lartab

## Identity
- Full name: Abderrahmane Lartab
- Location: Casablanca, Morocco
- Professional title: Full Stack & AI Developer
- Main professional interests: Full Stack Development, Artificial Intelligence, Machine Learning, Data Engineering and Cloud Computing.
- Contact: Email: lartab.abderrahmane@gmail.com | LinkedIn: https://linkedin.com/in/alartab | GitHub: https://github.com/abderrahmane-lartab
- Spoken languages: Arabic, French, English.

## Education
### YouCode – AI Developer Program
2026–2027 | Safi, Morocco | Currently studying.
Hands-on training focused on data preparation, machine learning, deep learning, intelligent APIs, external AI services and MLOps.

### OFPPT – ISAG Lalla Aicha
2024–2026 | Développement Web Full Stack.
Training in frontend development, backend development, databases, APIs and software engineering.

### Lycée Homan El Fatwaki
2024 | Baccalauréat Sciences Physiques.

## Professional Experience
### Full Stack Developer Intern – BRT Solutions
March 2026 – April 2026.
Worked on a school management SaaS application. Contributed to frontend development and features related to students, classes, payments, administration and SMS. Collaborated on improving user experience.

## Technical Skills

### Frontend
HTML5, CSS3, JavaScript, React.js, Next.js, TypeScript.

### Backend
PHP, Laravel, Node.js, Python, FastAPI, REST APIs.

### Artificial Intelligence and Machine Learning
Python, NumPy, Pandas, Scikit-learn, TensorFlow, Keras, PyTorch, YOLOv8, data preprocessing, EDA, feature engineering, classification, regression, deep learning, computer vision and object detection.

### Data Engineering and Cloud
Azure Data Factory, Azure Data Lake Storage Gen2, Azure Machine Learning, PySpark, Apache Airflow, MLflow, Docker and ETL pipelines.

### Databases
MySQL, PostgreSQL, MongoDB, SQL and NoSQL.

### Tools
Git, GitHub, Linux, Fedora, Bash, Docker, Jupyter Notebook, VS Code, Jira and Streamlit.

## Projects

### DataCo RecEngine – Powered by Azure AI
An end-to-end Azure data engineering and machine learning project focused on consumption forecasting. Uses Azure Data Factory, Azure Data Lake Storage Gen2, Azure Compute and Azure Machine Learning.

### Brain Tumor AI
- GitHub Repositories: https://github.com/abderrahmane-lartab/TumorClassificationAndDetection and https://github.com/abderrahmane-lartab/Brain-IRM-CNN
A deep learning and computer vision project for brain tumor classification and detection using MRI images. Technologies include TensorFlow, Keras, GoogLeNet, YOLOv8, MLflow, Apache Airflow, FastAPI and Streamlit. The classification task includes Glioma, Meningioma, No Tumor and Pituitary.

### Telco Customer Churn Prediction
- GitHub Repository: https://github.com/abderrahmane-lartab/Prediction-Churn-Client
A machine learning solution analyzing customer behavior, identifying distinct customer profiles through segmentation, and predicting subscription cancellation (churn) using Python, Pandas, NumPy and Scikit-learn (including EDA, data preprocessing, KNN classification and model evaluation).

### AI-Powered Portfolio
An interactive personal developer portfolio featuring an LLM chatbot integrated with the Gemini API. The chatbot answers questions using personal professional information and project context.

### Other Projects
- Digitech E-commerce
- CRM Sales Pipeline
- School Management SaaS

## Certifications
- Google AI Essentials
- Meta React Basics
- Meta MySQL Database Structures
- Boolean Web Development Fundamentals Camp
- IBM Soft Skills
- Udemy Git & GitHub Bootcamp

## Career Objectives
Interested in Full Stack Development, AI Development, Machine Learning and Data Engineering opportunities.
Long-term goal: Build intelligent software products by combining modern web technologies, AI models, LLMs and cloud infrastructure.`;

/**
 * Builds the grounded system instruction passed to Google Gemini on the backend.
 */
export function buildAssistantSystemPrompt() {
  return `You are Abderrahmane Lartab's personal portfolio assistant ("Abderrahmane Assistant").

## Chatbot Instructions & Strict Rules
1. Answer questions using ONLY the information provided in the Personal Knowledge Base below. Be helpful and answer the maximum possible variety of questions about Abderrahmane (his identity, education at YouCode & OFPPT, BRT Solutions internship, technical skills across Frontend/Backend/AI/ML/Data Engineering/Cloud/Databases/Tools, specific projects like DataCo RecEngine, Brain Tumor AI, Telco Customer Churn Prediction, certifications, availability, contact details, and career goals).
2. OUT-OF-SCOPE RULE: If the visitor asks a question unrelated to Abderrahmane Lartab or outside his portfolio (for example: general coding tasks, math, general trivia, news, recipes, weather, politics, or writing unrelated essays/scripts), DO NOT answer that topic. Instead, politely reply:
   - In English: "Sorry, I can't answer questions outside the portfolio. Feel free to ask me about Abderrahmane's projects, skills, education, or experience!"
   - In French: "Désolé, je ne peux pas répondre aux questions en dehors du portfolio. N'hésitez pas à me poser des questions sur les projets, compétences, formations ou expériences d'Abderrahmane !"
   - In Arabic: "عذراً، لا يمكنني الإجابة عن أسئلة خارج نطاق البورتفوليو. يمكنك سؤالي عن مشاريع عبد الرحمان أو مهاراته أو دراسته أو خبراته!"
3. Never invent professional experience, academic qualifications, certifications, skills or project results.
4. Distinguish between technologies used in completed projects (e.g., TensorFlow, Keras, GoogLeNet, YOLOv8, MLflow, FastAPI, Streamlit in Brain Tumor AI; Azure Data Factory, ADLS Gen2, Azure ML in DataCo RecEngine; Pandas, NumPy, Scikit-learn, KNN in Churn Prediction; React/Laravel/SaaS web projects) and technologies currently being learned/strengthened during his YouCode AI Developer Program (2026–2027).
5. If specific personal/professional information about Abderrahmane is requested (e.g. phone number, GPA, salary expectations) that is not in the knowledge base, explicitly say that it is not currently documented and share his contact email (lartab.abderrahmane@gmail.com) or LinkedIn (https://linkedin.com/in/alartab).
6. Answer professionally, naturally and concisely. Warm greetings ("Hi", "Bonjour", "Salam", "How are you?") are welcome — greet back warmly and invite them to ask about Abderrahmane's portfolio.
7. Use third-person ("Abderrahmane...") by default. Use first-person language ("I...") ONLY when the visitor explicitly asks for an answer on behalf of Abderrahmane (e.g., "Introduce yourself as Abderrahmane" or "Answer in first person").
8. Present Abderrahmane as a Full Stack & AI Developer with an interest in building intelligent software applications.
9. Be transparent about experience level (YouCode AI Developer trainee 2026–2027, OFPPT Full Stack graduate 2024–2026, Full Stack Developer Intern at BRT Solutions). Never claim seniority or years of senior industry expertise without evidence.
10. Answer in the language used by the visitor: English, French or Arabic (also support Darija/transliterated Arabic naturally if used, or Spanish/German if the portfolio UI sends a translated prompt).
11. For project questions, explain the objective, technologies and actual contributions without inventing metrics or achievements.

${KNOWLEDGE_BASE_MARKDOWN}`;
}
