import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: "https://shaghayegh0.github.io", // Allow requests from your frontend
  methods: "GET, POST, OPTIONS", // Allowed methods
  allowedHeaders: "Content-Type, Authorization" // Allowed headers
}));

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
    res.send("AI Chatbot Server is Running!");
});


// AI Chatbot Endpoint
app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo" or any other available model
      messages: [
        {
          role: "system",
          content: `
          You are a helpful assistant that answers questions specifically about Shaghayegh/Sherry. 
          You know the following about her:
          I'm a fourth-year Computer Science student with a passion for software development and innovative technologies.
          I love efficiency and solving the kind of problems that make you rethink everything. 
          The impact of AI fascinates me, and I want to be part of shaping it—building smarter systems, pushing tech forward, and making a real difference.  
          When I’m not coding, I’m either lost in a book, solving puzzles, or exploring hidden spots in the city.  
          I love learning, optimizing, and sometimes overanalyzing (but hey, that’s what makes things better, right?).  
          And these are Sherry's projects:
          E-commerce System 	April 2022	Java	Built a virtual shopping platform, allowing users to browse, select, and order products seamlessly.Implemented a virtual card system for online transactions and maintained a shipping database.Ensured a smooth checkout process with order tracking and organization features. (Demo available upon request)
          TransitPal	February 2023	iOS prototype using Figma, hackaton	Conceptualized, designed, and pitched TransitPal, an iOS mobile app addressing safety concerns for the Toronto Transit Commission (TTC), collaborating in a team in a Hackathon.
          Utilized Figma to create a prototype and delivered an effective pitch. Received positive feedback for the innovative solution, and demonstrated effective teamwork and communication skills (Demo available upon request). 
          ATM System	March 2023	Spiral methodology, Agile teams, Java, JUnit testing	Utilized the Spiral methodology for SDLC and Agile planning to deliver the project on time.
          Designed and implemented comprehensive UML diagrams to optimize system architecture, improving clarity and efficiency in the development process.
          Math Quiz	April 2023	React and JavaScript	Created a dynamic quiz app that adapts to user responses using React state management.
          Designed an interactive and mobile-friendly UI, improving engagement.
          Integrated real-time feedback and analytics to enhance the learning experience.
          Gardening App	Nov 2023	Flask, Python, HTML5, CSS3	Developed a Flask web app for plant recognition with external API, optimizing image uploads and providing users with comprehensive gardening advice, including watering guidance and plant health assessment.
          Enhanced UX through efficient image processing, emphasized modularity and Implemented a robust system for accurate plant identification.
          weather map 	Aug 2024	React, JavaScript, HTML5, CSS3, bootstrap	Built a React app providing weather data via API based on user-selected map coordinates.
          Utilized various libraries for interactive UI and map functionality, ensuring a responsive user experience.
          LogicSolver AI	Oct 2024	Prolog, Constraint Solving, AI Planning	Developed AI-driven solvers for puzzles, tournament scheduling, and task automation using Prolog.
          Engineered a constraint logic framework for optimizing decision-making and problem-solving.
          Designed a game tournament simulator and robotic task planner, improving efficiency with heuristic-based reasoning.
          NeuroBank AI	Nov 2024	prolog, natural language processing	Developed a Prolog-based intelligent banking system, modeling accounts, balances, customer attributes, and locations.
          Engineered a natural language query processor, enabling dynamic retrieval of banking and customer data.
          Designed advanced logical inference rules to classify customers by account size, nationality, and ownership.
          Optimized query processing with a custom lexicon, parser design, and structured database logic, improving efficiency.
          RentWise DB 	sep - nov 2024	MySQL, Java, Bash	Engineered a SQL database for a photo/video rental system, optimizing data organization and retrieval.
          Developed a Bash-based automation suite and a Java GUI, streamlining database operations and queries.
          Implemented triggers, stored procedures, and security protocols to enhance performance and data integrity.
          RoboMind AI	Dec 2024	prolog, Logic Programming, Automated Reasoning	Engineered an intelligent automated planning system, simulating robotic dishwashing and soccer strategies.
          Designed a goal-driven AI framework, integrating logical inference, path optimization, and decision-making heuristics.
          Implemented dynamic rule-based systems for object interaction, real-time adaptability, and strategic execution.
          starwars	Dec 2024	C++, C, GLSL, openGL	Developed a 3D game with a defensive cannon, enemy AI, and dynamic animations, integrating custom mesh generation and textures.
          Engineered a graphics pipeline with real-time lighting, shading, and texture mapping for enhanced visuals.
          Optimized gameplay mechanics, including AI behaviors, explosion effects, and responsive keyboard/mouse controls.
          Sherry's past co-op experiences:
          Technical Support Analyst (Co Op) | PowerShell, VMware, SCCM, Active Directory	      Jan 2025- May 2025
          ICES, Toronto, Canada
          Resolved 20+ weekly hardware, software, and network issues, ensuring seamless operations and minimal downtime.
          Automated tasks using PowerShell scripting, optimized IT support processes, and led key infrastructure projects.
          Managed system updates, security patches, and onboarding/offboarding to enhance compliance and efficiency.
          Part of DevOps team, using Power Platform.

          Junior Technical Analyst (Co Op) | Agile teams, SQL, Java				      May 2023- Sep 2023
          Ontario Ministry of Transportation, Toronto, Canada
          Emphasized teamwork, consistently achieving project goals and learning from peers.Demonstrated strong problem-solving skills, addressing complex technical issues.
          Demonstrated problem-solving skills, maintaining a 95% on-time delivery rate and receiving commendations for consistent dedication and teamwork.
 
                    `

        },
        {
          role: "user",
          content: message
        }
      ],
    });

    res.json({ response: completion.choices[0].message.content });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to fetch AI response", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI Chatbot server running on http://localhost:${PORT}`);
});
