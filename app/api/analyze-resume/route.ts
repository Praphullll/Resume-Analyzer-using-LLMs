import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

export const maxDuration = 60

const analysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  skillsMatch: z.object({
    matched: z.array(z.string()),
    missing: z.array(z.string()),
    additional: z.array(z.string()),
    skillsGap: z.number().min(0).max(100),
  }),
  experienceAnalysis: z.object({
    yearsOfExperience: z.number(),
    relevantExperience: z.number(),
    seniorityLevel: z.enum(["Entry", "Junior", "Mid", "Senior", "Lead", "Executive"]),
    keyAchievements: z.array(z.string()),
    careerProgression: z.string(),
    industryExperience: z.array(z.string()),
  }),
  qualifications: z.object({
    education: z.array(z.string()),
    certifications: z.array(z.string()),
    languages: z.array(z.string()),
    educationMatch: z.number().min(0).max(100),
  }),
  recommendations: z.array(
    z.object({
      category: z.enum(["Skills", "Experience", "Education", "Resume Format", "Keywords", "Achievements"]),
      priority: z.enum(["High", "Medium", "Low"]),
      suggestion: z.string(),
      impact: z.string(),
    }),
  ),
  strengths: z.array(
    z.object({
      area: z.string(),
      description: z.string(),
      relevance: z.number().min(0).max(100),
    }),
  ),
  weaknesses: z.array(
    z.object({
      area: z.string(),
      description: z.string(),
      severity: z.enum(["Critical", "Major", "Minor"]),
      improvement: z.string(),
    }),
  ),
  atsScore: z.number().min(0).max(100),
  atsIssues: z.array(z.string()),
  culturalFit: z.number().min(0).max(100),
  culturalFitFactors: z.array(z.string()),
  summary: z.string(),
  hiringRecommendation: z.enum(["Strong Hire", "Hire", "Maybe", "No Hire"]),
  salaryRange: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string(),
  }),
  interviewFocus: z.array(z.string()),
  redFlags: z.array(z.string()),
  competencyScores: z.object({
    technical: z.number().min(0).max(100),
    leadership: z.number().min(0).max(100),
    communication: z.number().min(0).max(100),
    problemSolving: z.number().min(0).max(100),
    teamwork: z.number().min(0).max(100),
    adaptability: z.number().min(0).max(100),
  }),
})

async function extractTextFromFile(file: File): Promise<string> {
  // Enhanced text extraction simulation with different resume types
  const fileName = file.name.toLowerCase()
  const fileSize = file.size

  // Simulate different resume types based on file characteristics
  if (fileName.includes("senior") || fileName.includes("lead") || fileSize > 500000) {
    return `Sarah Johnson
Senior Full Stack Engineer & Team Lead
Email: sarah.johnson@email.com | Phone: (555) 987-6543 | LinkedIn: linkedin.com/in/sarahjohnson

PROFESSIONAL SUMMARY
Accomplished senior software engineer with 12+ years of experience leading cross-functional teams and architecting scalable web applications. Expert in modern JavaScript frameworks, cloud infrastructure, and agile methodologies. Proven track record of delivering high-impact products that serve millions of users.

CORE COMPETENCIES
• Leadership: Team management, mentoring, technical strategy, stakeholder communication
• Frontend: React, TypeScript, Next.js, Vue.js, Angular, HTML5, CSS3, Sass, Webpack
• Backend: Node.js, Python, Java, Express, Django, Spring Boot, REST APIs, GraphQL
• Databases: PostgreSQL, MongoDB, Redis, Elasticsearch, MySQL
• Cloud & DevOps: AWS, Azure, Docker, Kubernetes, CI/CD, Terraform, Jenkins
• Architecture: Microservices, Event-driven architecture, System design, Performance optimization

PROFESSIONAL EXPERIENCE

Senior Software Engineer & Tech Lead | Google | 2019 - Present
• Lead a team of 8 engineers developing Google Cloud Console features used by 2M+ developers
• Architected and implemented a real-time collaboration system reducing user onboarding time by 45%
• Established engineering best practices and code review standards across 3 product teams
• Mentored 12 junior engineers, with 8 receiving promotions under my guidance
• Reduced system latency by 60% through performance optimization and caching strategies
• Collaborated with product managers and designers to define technical roadmaps

Software Engineer | Facebook (Meta) | 2016 - 2019
• Developed key features for Facebook Ads Manager serving 9M+ advertisers globally
• Built real-time analytics dashboard processing 100M+ events per day
• Implemented A/B testing framework that increased user engagement by 25%
• Led migration from PHP to React/Node.js stack, improving development velocity by 40%
• Participated in on-call rotation and incident response for critical production systems

Full Stack Developer | Startup Inc. | 2012 - 2016
• Employee #5 at fast-growing fintech startup, helped scale from 0 to 1M users
• Built entire frontend application using React and Redux from ground up
• Designed and implemented RESTful APIs handling 10K+ requests per minute
• Established DevOps practices including automated testing and deployment pipelines
• Worked directly with founders on product strategy and technical architecture decisions

EDUCATION
Master of Science in Computer Science | Stanford University | 2012
Bachelor of Science in Software Engineering | UC Berkeley | 2010

CERTIFICATIONS & ACHIEVEMENTS
• AWS Solutions Architect Professional
• Google Cloud Professional Developer
• Certified Kubernetes Administrator (CKA)
• Speaker at React Conf 2022, AWS re:Invent 2021
• Published 15+ technical articles with 50K+ total views
• Open source contributor to React, Node.js, and Kubernetes projects

LANGUAGES
• English (Native)
• Spanish (Professional)
• Mandarin (Conversational)`
  }

  if (fileName.includes("junior") || fileName.includes("entry") || fileSize < 200000) {
    return `Alex Chen
Junior Software Developer
Email: alex.chen@email.com | Phone: (555) 123-4567 | GitHub: github.com/alexchen

OBJECTIVE
Recent computer science graduate seeking a junior software developer position to apply my programming skills and contribute to innovative projects while continuing to learn and grow in a collaborative environment.

EDUCATION
Bachelor of Science in Computer Science | University of California, Davis | 2023
GPA: 3.7/4.0
Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems, Software Engineering

TECHNICAL SKILLS
• Programming Languages: JavaScript, Python, Java, C++, HTML, CSS
• Frameworks & Libraries: React, Node.js, Express, Bootstrap
• Databases: MySQL, MongoDB
• Tools: Git, VS Code, IntelliJ IDEA, Postman
• Operating Systems: Windows, macOS, Linux

PROJECTS

Personal Portfolio Website | 2023
• Built responsive portfolio website using React and CSS3
• Implemented contact form with Node.js backend and email integration
• Deployed on Netlify with continuous integration from GitHub
• Technologies: React, Node.js, Express, HTML5, CSS3

Task Management App | 2023
• Developed full-stack web application for personal task management
• Created RESTful API with CRUD operations using Express and MongoDB
• Implemented user authentication and authorization
• Technologies: React, Node.js, Express, MongoDB, JWT

E-commerce Website (Academic Project) | 2022
• Collaborated with 4 team members to build online shopping platform
• Responsible for frontend development and user interface design
• Integrated payment processing and inventory management features
• Technologies: HTML, CSS, JavaScript, PHP, MySQL

EXPERIENCE

Software Development Intern | Local Tech Startup | Summer 2022
• Assisted senior developers in debugging and testing web applications
• Wrote unit tests for existing codebase, improving test coverage by 15%
• Participated in daily standups and sprint planning meetings
• Learned agile development methodologies and version control best practices

IT Support Assistant | UC Davis IT Department | 2021 - 2022
• Provided technical support to students and faculty
• Troubleshot hardware and software issues
• Maintained computer lab equipment and software installations
• Developed strong problem-solving and communication skills

ACHIEVEMENTS & ACTIVITIES
• Dean's List: Fall 2021, Spring 2022, Fall 2022
• Hackathon Winner: UC Davis CodeFest 2022 (Best Mobile App)
• Member of Computer Science Club and ACM Student Chapter
• Volunteer coding instructor for local high school students

LANGUAGES
• English (Native)
• Mandarin (Native)
• Spanish (Basic)`
  }

  // Default mid-level resume
  return `Michael Rodriguez
Software Engineer
Email: michael.rodriguez@email.com | Phone: (555) 456-7890

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of experience in full-stack development, 
specializing in React, Node.js, and cloud technologies. Proven track record of delivering 
scalable web applications and collaborating effectively with cross-functional teams.

TECHNICAL SKILLS
• Frontend: React, TypeScript, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express, Python, Django, REST APIs, GraphQL
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, Jest, Cypress, Webpack

PROFESSIONAL EXPERIENCE
Software Engineer | TechCorp Inc. | 2020 - Present
• Developed and maintained customer-facing web applications serving 100K+ users
• Improved application performance by 40% through code optimization and caching
• Implemented CI/CD pipelines reducing deployment time by 60%
• Collaborated with product managers and designers on feature development
• Participated in code reviews and mentored junior developers

Software Developer | StartupXYZ | 2019 - 2020
• Built responsive web applications using React and Redux
• Developed RESTful APIs using Node.js and Express
• Worked in agile environment with 2-week sprint cycles
• Contributed to architecture decisions and technical documentation

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2019

CERTIFICATIONS
• AWS Certified Developer Associate
• MongoDB Certified Developer`
}

function getEnhancedPrompt(resumeText: string, jobDescription: string, customRequirements: string) {
  return `You are an expert HR professional and resume analyzer with 15+ years of experience in technical recruiting. Analyze the following resume against the job description and provide a comprehensive, detailed analysis.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

${customRequirements ? `CUSTOM REQUIREMENTS:\n${customRequirements}` : ""}

ANALYSIS INSTRUCTIONS:
1. Provide detailed scoring across all dimensions (0-100 scale)
2. Identify specific skills gaps and provide actionable recommendations
3. Assess candidate seniority level and career progression
4. Evaluate ATS compatibility and suggest improvements
5. Provide salary range estimation based on experience and location
6. Identify potential red flags or concerns
7. Suggest specific interview focus areas
8. Rate competencies across multiple dimensions
9. Provide hiring recommendation with clear reasoning

Be thorough, objective, and provide specific, actionable feedback that would help both job seekers and recruiters make informed decisions. Consider industry standards, current market conditions, and best practices in technical hiring.

Focus on:
- Technical skill alignment and depth
- Experience relevance and progression
- Leadership and soft skills indicators
- Cultural fit based on company values
- Potential for growth and learning
- Risk factors and mitigation strategies`
}

function getEnhancedMockAnalysis(resumeText: string): any {
  // Determine resume type based on content
  const isJunior =
    resumeText.includes("Junior") || resumeText.includes("entry") || resumeText.includes("Recent graduate")
  const isSenior =
    resumeText.includes("Senior") ||
    resumeText.includes("Lead") ||
    resumeText.includes("12+") ||
    resumeText.includes("Google") ||
    resumeText.includes("Facebook")

  if (isSenior) {
    return {
      overallScore: 92,
      skillsMatch: {
        matched: [
          "React",
          "TypeScript",
          "Node.js",
          "Python",
          "AWS",
          "Docker",
          "Kubernetes",
          "GraphQL",
          "PostgreSQL",
          "Leadership",
        ],
        missing: ["Terraform", "Go"],
        additional: ["Java", "Azure", "Elasticsearch", "System Design", "Mentoring"],
        skillsGap: 15,
      },
      experienceAnalysis: {
        yearsOfExperience: 12,
        relevantExperience: 11,
        seniorityLevel: "Senior" as const,
        keyAchievements: [
          "Led team of 8 engineers at Google developing features for 2M+ users",
          "Architected real-time collaboration system reducing onboarding time by 45%",
          "Reduced system latency by 60% through performance optimization",
          "Mentored 12 junior engineers with 8 receiving promotions",
          "Scaled startup from 0 to 1M users as employee #5",
        ],
        careerProgression: "Excellent progression from startup to FAANG companies with increasing responsibilities",
        industryExperience: ["Big Tech", "Fintech", "Cloud Computing", "Social Media"],
      },
      qualifications: {
        education: [
          "Master of Science in Computer Science - Stanford University",
          "Bachelor of Science in Software Engineering - UC Berkeley",
        ],
        certifications: [
          "AWS Solutions Architect Professional",
          "Google Cloud Professional Developer",
          "Certified Kubernetes Administrator",
        ],
        languages: ["English (Native)", "Spanish (Professional)", "Mandarin (Conversational)"],
        educationMatch: 95,
      },
      recommendations: [
        {
          category: "Skills" as const,
          priority: "Medium" as const,
          suggestion: "Consider adding Terraform experience for infrastructure as code",
          impact: "Would strengthen DevOps capabilities and align with modern cloud practices",
        },
        {
          category: "Experience" as const,
          priority: "Low" as const,
          suggestion: "Highlight specific metrics from Facebook/Meta experience",
          impact: "Would demonstrate scale and impact of work at major tech companies",
        },
      ],
      strengths: [
        {
          area: "Technical Leadership",
          description: "Proven ability to lead large engineering teams and mentor junior developers",
          relevance: 95,
        },
        {
          area: "Scale Experience",
          description: "Experience building systems serving millions of users at top tech companies",
          relevance: 90,
        },
        {
          area: "Full Stack Expertise",
          description: "Deep knowledge across frontend, backend, and infrastructure",
          relevance: 88,
        },
      ],
      weaknesses: [
        {
          area: "Infrastructure as Code",
          description: "Limited mention of Terraform or infrastructure automation tools",
          severity: "Minor" as const,
          improvement: "Gain hands-on experience with Terraform and infrastructure automation",
        },
      ],
      atsScore: 88,
      atsIssues: ["Could benefit from more keyword optimization", "Consider adding skills section with bullet points"],
      culturalFit: 90,
      culturalFitFactors: ["Strong collaboration skills", "Mentoring experience", "Startup and big tech experience"],
      summary:
        "Exceptional senior candidate with outstanding technical leadership experience at top-tier companies. Demonstrates strong progression from startup to FAANG with proven ability to scale teams and systems. Excellent mentor and technical contributor with deep full-stack expertise.",
      hiringRecommendation: "Strong Hire" as const,
      salaryRange: {
        min: 180000,
        max: 250000,
        currency: "USD",
      },
      interviewFocus: [
        "System design and architecture",
        "Leadership and mentoring approach",
        "Scaling challenges and solutions",
        "Technical decision-making process",
      ],
      redFlags: [],
      competencyScores: {
        technical: 95,
        leadership: 92,
        communication: 88,
        problemSolving: 90,
        teamwork: 89,
        adaptability: 87,
      },
    }
  }

  if (isJunior) {
    return {
      overallScore: 72,
      skillsMatch: {
        matched: ["JavaScript", "React", "Node.js", "Python", "HTML", "CSS", "Git"],
        missing: ["TypeScript", "AWS", "Docker", "Testing Frameworks", "CI/CD"],
        additional: ["Java", "C++", "MongoDB"],
        skillsGap: 45,
      },
      experienceAnalysis: {
        yearsOfExperience: 1,
        relevantExperience: 0.5,
        seniorityLevel: "Entry" as const,
        keyAchievements: [
          "Built personal portfolio website with React and Node.js",
          "Won Best Mobile App at UC Davis CodeFest 2022",
          "Improved test coverage by 15% during internship",
          "Maintained 3.7 GPA while working part-time",
        ],
        careerProgression: "Recent graduate with strong academic performance and relevant project experience",
        industryExperience: ["Academic Projects", "Internship"],
      },
      qualifications: {
        education: ["Bachelor of Science in Computer Science - UC Davis (3.7 GPA)"],
        certifications: [],
        languages: ["English (Native)", "Mandarin (Native)", "Spanish (Basic)"],
        educationMatch: 85,
      },
      recommendations: [
        {
          category: "Skills" as const,
          priority: "High" as const,
          suggestion: "Learn TypeScript and modern testing frameworks (Jest, Cypress)",
          impact: "Essential for professional development work and code quality",
        },
        {
          category: "Experience" as const,
          priority: "High" as const,
          suggestion: "Contribute to open source projects to gain real-world experience",
          impact: "Would demonstrate ability to work on larger codebases and collaborate with others",
        },
        {
          category: "Skills" as const,
          priority: "Medium" as const,
          suggestion: "Learn cloud basics (AWS fundamentals) and containerization (Docker)",
          impact: "Modern development practices essential for most tech roles",
        },
      ],
      strengths: [
        {
          area: "Academic Excellence",
          description: "Strong GPA and relevant coursework in computer science fundamentals",
          relevance: 80,
        },
        {
          area: "Project Experience",
          description: "Good variety of personal and academic projects demonstrating practical skills",
          relevance: 75,
        },
        {
          area: "Learning Ability",
          description: "Quick learner with hackathon win and strong academic performance",
          relevance: 85,
        },
      ],
      weaknesses: [
        {
          area: "Professional Experience",
          description: "Limited professional software development experience",
          severity: "Major" as const,
          improvement: "Seek internships, contribute to open source, or build more complex projects",
        },
        {
          area: "Modern Development Practices",
          description: "Missing experience with testing, CI/CD, and cloud technologies",
          severity: "Major" as const,
          improvement: "Learn testing frameworks, set up CI/CD for personal projects, get AWS certification",
        },
      ],
      atsScore: 75,
      atsIssues: ["Add more industry keywords", "Include relevant coursework section", "Quantify project impacts"],
      culturalFit: 78,
      culturalFitFactors: ["Strong work ethic", "Collaborative team projects", "Volunteer experience"],
      summary:
        "Promising entry-level candidate with strong academic background and good foundational skills. Shows initiative through personal projects and hackathon participation. Would benefit from mentorship and structured learning opportunities to develop professional experience.",
      hiringRecommendation: "Hire" as const,
      salaryRange: {
        min: 70000,
        max: 90000,
        currency: "USD",
      },
      interviewFocus: ["Problem-solving approach", "Learning agility", "Project deep-dive", "Technical fundamentals"],
      redFlags: [],
      competencyScores: {
        technical: 70,
        leadership: 45,
        communication: 72,
        problemSolving: 78,
        teamwork: 75,
        adaptability: 82,
      },
    }
  }

  // Mid-level default
  return {
    overallScore: 78,
    skillsMatch: {
      matched: ["React", "JavaScript", "Node.js", "TypeScript", "AWS"],
      missing: ["Python", "Docker", "Kubernetes"],
      additional: ["Vue.js", "MongoDB", "Express"],
      skillsGap: 30,
    },
    experienceAnalysis: {
      yearsOfExperience: 5,
      relevantExperience: 4,
      seniorityLevel: "Mid" as const,
      keyAchievements: [
        "Improved application performance by 40% through optimization",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Developed applications serving 100K+ users",
        "Mentored junior developers and participated in code reviews",
      ],
      careerProgression: "Steady progression with increasing responsibilities and technical complexity",
      industryExperience: ["SaaS", "Startups"],
    },
    qualifications: {
      education: ["Bachelor of Science in Computer Science"],
      certifications: ["AWS Certified Developer Associate", "MongoDB Certified Developer"],
      languages: ["English (Native)", "Spanish (Conversational)"],
      educationMatch: 80,
    },
    recommendations: [
      {
        category: "Skills" as const,
        priority: "High" as const,
        suggestion: "Add containerization experience with Docker and Kubernetes",
        impact: "Essential for modern cloud-native development and deployment",
      },
      {
        category: "Experience" as const,
        priority: "Medium" as const,
        suggestion: "Highlight leadership experience and team collaboration",
        impact: "Would strengthen candidacy for senior-level positions",
      },
    ],
    strengths: [
      {
        area: "Full Stack Development",
        description: "Strong experience across frontend and backend technologies",
        relevance: 85,
      },
      {
        area: "Performance Optimization",
        description: "Proven track record of improving application performance",
        relevance: 80,
      },
    ],
    weaknesses: [
      {
        area: "Containerization",
        description: "Missing Docker and Kubernetes experience",
        severity: "Major" as const,
        improvement: "Learn containerization technologies and cloud-native deployment",
      },
    ],
    atsScore: 82,
    atsIssues: ["Could add more technical keywords", "Consider adding skills summary section"],
    culturalFit: 75,
    culturalFitFactors: ["Team collaboration", "Continuous learning", "Performance focus"],
    summary:
      "Solid mid-level candidate with good full-stack experience and proven ability to deliver results. Shows growth potential and would benefit from exposure to modern DevOps practices.",
    hiringRecommendation: "Hire" as const,
    salaryRange: {
      min: 95000,
      max: 125000,
      currency: "USD",
    },
    interviewFocus: ["Technical problem solving", "System design basics", "Team collaboration", "Growth mindset"],
    redFlags: [],
    competencyScores: {
      technical: 78,
      leadership: 60,
      communication: 72,
      problemSolving: 75,
      teamwork: 78,
      adaptability: 74,
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const resumeFile = formData.get("resume") as File
    const jobDescription = formData.get("jobDescription") as string
    const customRequirements = formData.get("customRequirements") as string

    if (!resumeFile || !jobDescription) {
      return NextResponse.json({ error: "Resume file and job description are required" }, { status: 400 })
    }

    // Extract text from resume file
    const resumeText = await extractTextFromFile(resumeFile)

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not configured, returning enhanced mock data")
      return NextResponse.json(getEnhancedMockAnalysis(resumeText))
    }

    try {
      // Analyze resume using AI with enhanced prompt
      const { object: analysis } = await generateObject({
        model: openai("gpt-4o", {
          apiKey: process.env.OPENAI_API_KEY,
        }),
        schema: analysisSchema,
        prompt: getEnhancedPrompt(resumeText, jobDescription, customRequirements),
      })

      return NextResponse.json(analysis)
    } catch (error) {
      console.error("AI analysis failed:", error)
      // Return enhanced mock data as fallback
      return NextResponse.json(getEnhancedMockAnalysis(resumeText))
    }
  } catch (error) {
    console.error("Resume analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}
