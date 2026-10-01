export const user = { name: "Ayush", careerScore: 82 };

export const stats = [
  { label: "Career Score", value: "82", suffix: "/100" },
  { label: "Reports Generated", value: "24" },
  { label: "Skills Detected", value: "18" },
  { label: "Preparation Progress", value: "68", suffix: "%" },
];

export const recentAnalyses = [
  { id: "1", title: "Full Stack Developer", company: "Nimbus Labs", score: 86, date: "Aug 15" },
  { id: "2", title: "Frontend Developer", company: "Orbit Systems", score: 79, date: "Aug 13" },
  { id: "3", title: "Backend Developer", company: "Fintra", score: 72, date: "Aug 10" },
  { id: "4", title: "Software Engineer", company: "Verse Cloud", score: 81, date: "Aug 07" },
];

export const strongSkills = ["React", "JavaScript", "Node.js", "MongoDB"];
export const skillGaps = [
  { skill: "Docker", severity: "Medium" },
  { skill: "System Design", severity: "High" },
  { skill: "AWS", severity: "Medium" },
];

export const technicalQuestions = [
  {
    question: "Explain the difference between SQL and NoSQL databases.",
    intention: "Tests whether you can reason about data modelling trade-offs, not just recite definitions.",
    answer:
      "SQL databases use structured schemas and relations, favoring consistency and complex joins. NoSQL databases trade rigid schemas for horizontal scalability and flexible documents — better suited to rapidly evolving or high-throughput data.",
  },
  {
    question: "What happens when you type a URL into the browser and press enter?",
    intention: "Checks your grasp of the full request lifecycle across networking and rendering.",
    answer:
      "DNS resolves the domain, a TCP/TLS connection is established, the browser sends an HTTP request, the server responds, and the browser parses HTML/CSS/JS to construct the DOM and paint the page.",
  },
  {
    question: "How does the Node.js event loop handle concurrency?",
    intention: "Verifies understanding of non-blocking I/O, a core reason Node is used in this stack.",
    answer:
      "Node runs JS on a single thread but delegates I/O to libuv's thread pool and OS-level async APIs. The event loop processes callbacks in phases (timers, I/O, check, close) once the call stack is clear.",
  },
];

export const behavioralQuestions = [
  {
    question: "Tell me about a difficult project you worked on.",
    testing: "Resilience, ownership, and how you communicate under pressure.",
    approach: "Use the STAR method — Situation, Task, Action, Result — and be specific about your role.",
    answer:
      "Frame the obstacle, the decision you made under constraints, and a measurable outcome. End with what you'd do differently, which shows reflection rather than just a highlight reel.",
  },
  {
    question: "Describe a time you disagreed with a teammate.",
    testing: "Collaboration style and whether disagreements stay constructive.",
    approach: "Focus on the reasoning process, not who was 'right'.",
    answer:
      "Explain how you brought data or a prototype to the discussion, how you found common ground, and what the resolution taught you about working with different perspectives.",
  },
];

export const prepPlan = [
  { day: 1, focus: "JavaScript Fundamentals", tasks: ["Revise closures", "Revise promises", "Practice async/await"], done: true },
  { day: 2, focus: "React", tasks: ["Hooks", "State management", "Performance"], done: true },
  { day: 3, focus: "Node.js", tasks: ["Event loop", "Streams", "Authentication"], done: true },
  { day: 4, focus: "Databases", tasks: ["Indexing", "Schema design", "MongoDB aggregation"], done: true },
  { day: 5, focus: "System Design", tasks: ["Load balancing basics", "Caching strategies", "Draw one system diagram"], done: false },
  { day: 6, focus: "Behavioral Prep", tasks: ["Write 3 STAR stories", "Record a mock answer", "Review company values"], done: false },
  { day: 7, focus: "Mock Interview", tasks: ["Full timed mock", "Review weak answers", "Rest well"], done: false },
];

export const trendData = [
  { name: "W1", score: 58 },
  { name: "W2", score: 63 },
  { name: "W3", score: 61 },
  { name: "W4", score: 70 },
  { name: "W5", score: 74 },
  { name: "W6", score: 82 },
];
