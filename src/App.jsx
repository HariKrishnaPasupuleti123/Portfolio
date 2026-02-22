import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── Data ─── */

const skills = [
  {
    category: 'Programming Languages',
    icon: '💻',
    iconClass: 'code',
    items: ['Java', 'Python', 'C#'],
  },
  {
    category: 'Frontend Technologies',
    icon: '🎨',
    iconClass: 'frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React'],
  },
  {
    category: 'Database',
    icon: '🗄️',
    iconClass: 'database',
    items: ['MySQL', 'MongoDB'],
  },
  {
    category: 'Tools & Cloud',
    icon: '☁️',
    iconClass: 'tools',
    items: ['AWS EC2', 'Jenkins (CI/CD)', 'Grafana', 'Git', 'GitHub', 'Postman', 'Swagger'],
  },
  {
    category: 'Frameworks',
    icon: '⚙️',
    iconClass: 'vcs',
    items: ['Spring Boot', 'JDBC', 'Hibernate', 'Maven', 'RESTful API'],
  },
  {
    category: 'Developer Tools',
    icon: '🛠️',
    iconClass: 'devtools',
    items: ['MySQL Workbench', 'MongoDB Compass', 'TablePlus'],
  },
  {
    category: 'AI-Assisted Development',
    icon: '🤖',
    iconClass: 'ai',
    featured: true,
    desc: 'Experienced in leveraging AI tools to accelerate development cycles, automate code review, debug faster, and ship higher-quality software.',
    items: ['GitHub Copilot', 'ChatGPT', 'Claude (Anthropic)', 'Google Gemini', 'OpenAI Codex', 'Cursor AI', 'Antigravity AI'],
  },
]


const experiences = [
  {
    role: 'SDE Intern',
    company: 'Rupeek Fintech Private Limited',
    date: 'Oct 2025 – Present',
    location: 'Bengaluru',
    points: [
      'Engineered a real-time Slack Alerting System via Zeebe integration, automating failure detection and providing instant context to eliminate manual log inspection.',
      'Utilized Grafana for production log monitoring and visualization, enabling proactive identification of system bottlenecks and streamlining the debugging process.',
      'Gained hands-on experience with AWS EC2 and Jenkins CI/CD to automate build cycles, ensuring high availability and faster software delivery.',
      'Developed scalable RESTful APIs using Java and Spring Boot, contributing to backend performance optimizations that increased system efficiency by 15%.',
      'Enhanced code reliability and maintainability by conducting code reviews and implementing comprehensive unit testing using JUnit and Mockito.',
    ],
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'TAP Academy',
    date: 'Jan 2025 – Jun 2025',
    location: 'Bengaluru',
    points: [
      'Designed and developed a full-stack Food Delivery Application using Java Spring Boot with MVC architecture — handling end-to-end flow from restaurant listing to order placement and delivery tracking.',
      'Built a layered backend (Controller → Service → Repository) with Spring MVC, implementing RESTful endpoints for user authentication, menu management, cart operations, and order lifecycle management.',
      'Integrated MySQL via JDBC and Hibernate ORM for efficient data persistence, designing normalized schemas for users, restaurants, menu items, orders, and delivery agents.',
      'Developed a responsive frontend using HTML5, CSS3, and JavaScript, consuming backend REST APIs and rendering dynamic data for a seamless user experience.',
      'Gained hands-on expertise in Core Java, Spring Boot, JDBC, Hibernate, and Maven, working on real-time projects across backend and frontend domains.',
    ],
  },
  {
    role: 'Cyber Security Intern',
    company: 'AICTE Edunet Foundation',
    date: 'Mar 2023 – Apr 2024',
    location: 'Remote',
    points: [
      'Applied practical threat analysis to identify, remediate, and report on cybersecurity vulnerabilities in simulated real-world scenarios.',
      'Enhanced incident response (IR) processes through hands-on simulations, contributing to a 20% reduction in mock response time.',
      'Developed proficiency in endpoint detection and malware analysis using industry-standard tools.',
    ],
  },
]

const projects = [
  {
    title: 'Decentralized Certificate Issuance & Validation',
    icon: '🔐',
    desc: 'Developed a secure system for generating and verifying digital certificates using blockchain technology and machine learning for enhanced security. Built a decentralized application (DApp) with secure storage mechanisms to enable real-time certificate issuance and validation.',
    tech: ['Python', 'Streamlit', 'Web3.js', 'Ganache', 'MySQL'],
  },
  {
    title: 'Project Management System (Backend)',
    icon: '📋',
    desc: 'Built a RESTful backend with Controller–Service–Repository architecture, implementing full CRUD, DTOs, and centralized exception handling. Integrated MongoDB using Spring Data and added unit tests using JUnit & Mockito, improving maintainability.',
    tech: ['Spring Boot', 'MongoDB', 'Maven', 'JUnit', 'Mockito', 'Git'],
  },
  {
    title: 'Image Steganography — Covert Message Encryption',
    icon: '🕵️',
    desc: 'Engineered a covert communication system using LSB (Least Significant Bit) steganography to embed encrypted secret messages directly into image pixel data — completely invisible to the naked eye. Implemented a dual-layer security model combining pixel-level data encoding via OpenCV with passcode-based access control, ensuring that even if the image is intercepted, the message remains inaccessible without the correct key. Demonstrates applied knowledge of image processing, binary data manipulation, and cybersecurity principles.',
    tech: ['Python', 'OpenCV', 'Steganography', 'Cryptography', 'Image Processing'],
  },
  {
    title: 'Tic-Tac-Toe Game with AI Opponent (Java)',
    icon: '🎮',
    desc: 'Designed and built a fully object-oriented Tic-Tac-Toe game in Java applying core OOP principles — abstraction, inheritance, and polymorphism. Architected using an abstract Player base class extended by HumanPlayer and AiPlayer, enabling clean separation of concerns and scalable game logic. Implemented complete win-condition detection across rows, columns, and diagonals, alongside a draw-state handler. Supports dual modes: Human vs AI and Two-Player, with an AI engine capable of making autonomous valid moves — laying the groundwork for Minimax-based intelligent AI enhancements.',
    tech: ['Java', 'Object Oriented Programming', 'Game AI', 'Data Structures and Algorithms'],
  },
]

const education = [
  {
    school: 'Sri Venkateswara College of Engineering',
    degree: 'B.Tech in Computer Science & Engineering (Cyber Security)',
    location: 'Tirupati',
    period: 'Dec 2021 – June 2025',
    grade: 'CGPA: 9.04/10',
  },
  {
    school: 'Narayana Junior College',
    degree: 'Higher Secondary Education (MPC)',
    location: 'Renigunta',
    period: 'July 2019 – April 2021',
    grade: 'CGPA: 9.48/10',
  },
]

const certifications = [
  {
    title: 'NPTEL Elite Silver Certifications',
    desc: 'Java & Python – Elite Silver Medal recognition by NPTEL for outstanding performance.',
  },
  {
    title: 'CCNA by Cisco',
    desc: 'Introduction to Networks – Cisco Certified fundamentals of networking and communication.',
  },
]

/* ─── Intersection Observer Hook ─── */

function useInView(options) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.12, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

/* ─── Components ─── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const links = [
    ['home', 'Home'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['education', 'Education'],
    ['contact', 'Contact'],
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <span className="nav-logo">HK.</span>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}

function SectionHeader({ tag, title }) {
  return (
    <div className="section-header">
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  )
}

function FadeIn({ children, className = '' }) {
  const [ref, isVisible] = useInView()
  return (
    <div ref={ref} className={`fade-in ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ─── Sections ─── */

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-pattern" />
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          Currently working at Rupeek Fintech
        </div>
        <h1>
          Hi, I'm{' '}
          <span className="gradient-text">Hari Krishna</span>
          <br />
          Software Developer
        </h1>
        <p className="hero-subtitle">
          A passionate Computer Science graduate specializing in backend development with
          Java &amp; Spring Boot, building scalable systems and secure applications.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">
            ✉️ Get in Touch
          </a>
          <a href="#projects" className="btn btn-outline">
            🚀 View Projects
          </a>
        </div>
        <div className="hero-socials">
          <a
            href="https://github.com/HariKrishnaPasupuleti123"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn github"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://leetcode.com/u/harikrishnapasupuleti_123059/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn leetcode"
            aria-label="LeetCode"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
            LeetCode
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">9.04</div>
            <div className="stat-label">CGPA</div>
          </div>
          <div className="stat">
            <div className="stat-number">2+</div>
            <div className="stat-label">Internships</div>
          </div>
          <div className="stat">
            <div className="stat-number">3+</div>
            <div className="stat-label">Certifications</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <SectionHeader tag="// who am i" title="About Me" />
      <FadeIn>
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-image-container">
              <div className="about-image-frame">
                <div className="about-avatar">👨‍💻</div>
              </div>
              <div className="about-float-card card-1">
                <div className="card-icon">☕</div>
                <div className="card-label">Preferred</div>
                <div className="card-value">Full Stack Developer/ Backend Developer </div>
              </div>
              <div className="about-float-card card-2">
                <div className="card-icon">🎓</div>
                <div className="card-label">Education</div>
                <div className="card-value">B.Tech CSE (Cyber Security)</div>
              </div>
            </div>
          </div>
          <div className="about-text">
            <p>
              I'm <strong>Hari Krishna Pasupuleti</strong>, a Computer Science &amp; Engineering graduate with a
              specialization in Cyber Security from Sri Venkateswara College of Engineering, Tirupati.
            </p>
            <p>
              Currently working as an <strong>SDE Intern at Rupeek Fintech</strong>, where I build real-time
              alerting systems, scalable RESTful APIs, and contribute to backend performance optimizations
              using Java, Spring Boot, and modern DevOps practices.
            </p>
            <p>
              I'm passionate about clean architecture, writing maintainable code, and solving complex
              problems with elegant solutions. I thrive in collaborative environments and love learning
              new technologies.
            </p>
            <div className="about-details">
              <div className="about-detail">
                <div className="about-detail-icon">📍</div>
                <div>
                  <div className="about-detail-label">Location</div>
                  <div className="about-detail-value">Tirupati, India</div>
                </div>
              </div>
              <div className="about-detail">
                <div className="about-detail-icon">💼</div>
                <div>
                  <div className="about-detail-label">Role</div>
                  <div className="about-detail-value">SDE Intern</div>
                </div>
              </div>
              <div className="about-detail">
                <div className="about-detail-icon">🎓</div>
                <div>
                  <div className="about-detail-label">Degree</div>
                  <div className="about-detail-value">B.Tech CSE (Cyber Security)</div>
                </div>
              </div>
              <div className="about-detail">
                <div className="about-detail-icon">📧</div>
                <div>
                  <div className="about-detail-label">Email</div>
                  <div className="about-detail-value">harikrishna123059@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHeader tag="// what i know" title="Skills & Technologies" />
      <div className="skills-grid">
        {skills.map((cat, i) => (
          <FadeIn key={i} className={cat.featured ? 'skills-featured-wrap' : ''}>
            <div className={`skill-category ${cat.featured ? 'skill-featured' : ''}`}>
              <div className="skill-cat-header">
                <div className={`skill-cat-icon ${cat.iconClass}`}>{cat.icon}</div>
                <div>
                  <div className="skill-cat-title">{cat.category}</div>
                  {cat.featured && <div className="skill-cat-badge">Practical Hands-On Experience</div>}
                </div>
              </div>
              {cat.desc && <p className="skill-cat-desc">{cat.desc}</p>}
              <div className="skill-tags">
                {cat.items.map((item) => (
                  <span className={`skill-tag ${cat.featured ? 'skill-tag-ai' : ''}`} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}


function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHeader tag="// where i've worked" title="Experience" />
      <div className="timeline">
        {experiences.map((exp, i) => (
          <FadeIn key={i}>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-role">{exp.role}</div>
                  <span className="timeline-date">📅 {exp.date}</span>
                </div>
                <div className="timeline-company">
                  {exp.company}{exp.location ? <span className="timeline-location"> · 📍 {exp.location}</span> : null}
                </div>
                <ul className="timeline-points">
                  {exp.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHeader tag="// what i've built" title="Projects" />
      <div className="projects-grid">
        {projects.map((project, i) => (
          <FadeIn key={i}>
            <div className="project-card">
              <div className="project-icon">{project.icon}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span className="project-tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="section" id="education">
      <SectionHeader tag="// my education" title="Education" />
      <div className="education-cards">
        {education.map((edu, i) => (
          <FadeIn key={i}>
            <div className="edu-card">
              <div className="edu-header">
                <div className="edu-icon">🎓</div>
                <div className="edu-info">
                  <h3>{edu.school}</h3>
                  <div className="edu-degree">{edu.degree}</div>
                </div>
              </div>
              <div className="edu-meta">
                <span className="edu-meta-item">
                  <span className="meta-icon">📍</span> {edu.location}
                </span>
                <span className="edu-meta-item">
                  <span className="meta-icon">📅</span> {edu.period}
                </span>
                <span className="edu-meta-item edu-cgpa">
                  <span className="meta-icon">⭐</span> {edu.grade}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <section className="section" id="certifications">
      <SectionHeader tag="// credentials" title="Certifications" />
      <div className="certs-grid">
        {certifications.map((cert, i) => (
          <FadeIn key={i}>
            <div className="cert-card">
              <div className="cert-icon">🏅</div>
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <p>{cert.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section" id="contact">
      <SectionHeader tag="// let's connect" title="Get In Touch" />
      <FadeIn>
        <div className="contact-wrapper">
          <p className="contact-text">
            I'm always open to discussing new opportunities, projects, or just having a tech conversation.
            Feel free to reach out through any of the channels below!
          </p>
          <div className="contact-cards">
            <a href="mailto:harikrishna123059@gmail.com" className="contact-card">
              <div className="contact-card-icon">📧</div>
              <div className="contact-card-label">Email</div>
              <div className="contact-card-value">harikrishna123059@gmail.com</div>
            </a>
            <a href="tel:+918008123059" className="contact-card">
              <div className="contact-card-icon">📱</div>
              <div className="contact-card-label">Phone</div>
              <div className="contact-card-value">+91 8008123059</div>
            </a>
            <a
              href="https://linkedin.com/in/hari-krishna-pasupuleti-927146248"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-card-icon">💼</div>
              <div className="contact-card-label">LinkedIn</div>
              <div className="contact-card-value">Hari Krishna Pasupuleti</div>
            </a>
            <a
              href="https://github.com/HariKrishnaPasupuleti123"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card-github"
            >
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="contact-card-label">GitHub</div>
              <div className="contact-card-value">HariKrishnaPasupuleti123</div>
            </a>
            <a
              href="https://leetcode.com/u/harikrishnapasupuleti_123059/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card-leetcode"
            >
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
              </div>
              <div className="contact-card-label">LeetCode</div>
              <div className="contact-card-value">harikrishnapasupuleti_123059</div>
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Designed & Built with <span className="heart">♥</span> by Hari Krishna Pasupuleti ·{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  )
}

/* ─── App ─── */

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}

export default App
