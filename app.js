(function () {
  const GEMINI_MODEL = "gemini-3.5-flash";
  const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions";
  const KEY_STORAGE = "raheem-gemini-api-key";

  const resumeContext = `
RAHEEM BURGESS
Location: Kingston, Jamaica
Phone: 876-459-8150
Email: raheemburgess86@gmail.com
Socials: GitHub https://github.com/sheathx, LinkedIn https://www.linkedin.com/in/raheemkhalidburgess/, X https://x.com/imbrgs, Instagram https://www.instagram.com/imbrgs/

Professional summary:
IT Support and Systems Engineering professional with 4+ years of experience supporting end users, resolving service desk incidents, troubleshooting workstation and remote-work issues, coordinating software deployments, maintaining endpoint compliance, and producing technical documentation for non-technical users. Experienced with ticketing systems, remote assistance, Azure Virtual Desktop, BeyondTrust, Microsoft 365, Excel reporting, SCCM communication checks, SentinelOne/S1, BitLocker, Zscaler, VPN validation, user onboarding, and stakeholder coordination across Service Desk, Infrastructure, BRMs, and business users. Currently pursuing a B.S. in Computer Science at University of the People, with academic and personal projects in Java, C, systems analysis, database concepts, NFC medical records, and AI-powered web tools.

Core skills:
Service desk support, incident intake, ticket management, triage, escalation, follow-up, SLA awareness, end-user support, Windows troubleshooting, software installation, deployment support, application access, onboarding support, SCCM host communication, SentinelOne/S1, BitLocker, Zscaler, VPN readiness, endpoint follow-up, user guides, support guides, technical procedures, onboarding documentation, known-issue notes, Azure Virtual Desktop, BeyondTrust, VPN testing, WAH program tracking, client-tool validation, TCP/IP, DNS, DHCP, VPN troubleshooting, VLAN awareness, connectivity troubleshooting, Microsoft 365, Microsoft Excel, ticketing systems, Java, C, HTML, CSS, WordPress, Shopify, database/data management, SEO, graphic design.

Professional experience:
Systems Engineer at Sutherland Global Services, February 2024 to present, Kingston, Jamaica. Provides daily technical support and systems administration assistance for workstation issues, remote-work access, software access, virtual desktop support, and service desk tickets. Supported rollout of an internally built software replacement for a latency-prone legacy tool through installation support, deployment coordination, documentation, user readiness, and post-deployment assistance. Coordinated BRMs, Service Desk, Infrastructure, and business users. Created technical documentation for non-technical users and Service Desk teams. Developed onboarding guides. Maintains a centralized WAH program bluebook covering client-tool requirements, VPN needs, testing results, readiness notes, and remote-work environment information. Validates client tools and VPN connectivity. Supports compliance monitoring for SCCM host communication, SentinelOne/S1, BitLocker, Zscaler, and endpoint follow-up. Uses ticketing systems, BeyondTrust, Azure Virtual Desktop, and Excel.

Infrastructure Specialist at Sutherland Global Services, 2020 to 2023, Kingston, Jamaica. Delivered multi-channel technical support through email, phone, chat, and remote assistance for workstation, access, software, remote desktop, and connectivity issues. Troubleshot Windows user issues, application access problems, virtual desktop sessions, remote assistance sessions, and basic network incidents. Managed service desk tickets from intake through resolution or escalation. Supported data entry, database/data management, reporting, asset, user, and system information tracking. Translated technical problems into clear instructions for non-technical users.

Selected projects:
Medi-Link NFC Medical Band System: designed an NFC-enabled emergency medical band concept that stores critical offline medical fields such as name, blood type, allergies, chronic conditions, last doctor visit date, and a UID/short URL pointer to full records. Planned compact data encoding with record versions, verification status, checksums, codes/enums, and fixed-length fields.
Begoogable AI Website Builder: working on an AI-powered website generation platform that turns user ideas into usable website wireframes, landing pages, and editable site structures. Focus areas include AI design quality, editable blocks, reducing generic AI output, and local business visibility through better structured website content.
Internal Software Replacement Deployment Support: installation, rollout coordination, documentation, user readiness, and communication between BRMs, Service Desk, Infrastructure, and end users.
Work-at-Home Program Bluebook & Tool Readiness Tracking: centralized tracking resource for client tools, VPN requirements, testing outcomes, and readiness checks.
Endpoint Compliance & Security Support: SCCM communication, SentinelOne/S1, BitLocker, Zscaler, endpoint-security follow-up, remediation, and escalation.
Java GUI Order Calculator: JavaFX order calculator with input fields, buttons, selection controls, event handling, and validation.
Java Collections & Multithreading Analysis: coursework on Java Collections Framework, data structures, concurrent execution, thread-safety, and optimization trade-offs.
NWC Utility Platform Simulation: console-based C application with agent/customer roles, authentication, billing logic, file persistence, reports, and structured design.
Systems Analysis & Design Documentation: scope excerpts, SRS-style requirements, use cases, wireframes, ER models, and class diagrams.

Education:
Bachelor of Science in Computer Science, University of the People, in progress.
Bachelor of Science in Computing, University of Technology, Jamaica, 2022, withdrawn.
Diploma, Ardenne Extension High, 2018 to 2020.
Language: English.
`;

  const cannedAnswers = {
    background:
      "Raheem Burgess is an IT Support and Systems Engineering professional in Kingston, Jamaica with 4+ years of experience across service desk support, workstation troubleshooting, software deployments, remote-work support, endpoint compliance, and technical documentation. He is currently a Systems Engineer at Sutherland Global Services and is pursuing a B.S. in Computer Science at University of the People.",
    tools:
      "Raheem has hands-on experience with Microsoft 365, Excel reporting, ticketing systems, SCCM, SentinelOne/S1, BitLocker, Zscaler, BeyondTrust, Azure Virtual Desktop, VPN validation, Windows troubleshooting, and remote assistance. His development stack includes Java, C, HTML, CSS, WordPress, Shopify, database/data management, SEO, and graphic design.",
    projects:
      "Strong project examples include Medi-Link, an NFC emergency medical band concept with compact offline medical data encoding; Begoogable, an AI-powered website builder focused on better generated page structure and local business visibility; and internal deployment work replacing a high-latency legacy tool with a new application supported by documentation, rollout coordination, and user readiness.",
    contact:
      "You can contact Raheem by email at raheemburgess86@gmail.com or phone at 876-459-8150. His socials are GitHub: github.com/sheathx, LinkedIn: linkedin.com/in/raheemkhalidburgess, X: x.com/imbrgs, and Instagram: instagram.com/imbrgs.",
    roles:
      "Based on the CV, Raheem is a strong fit for IT Support Specialist, Systems Engineer, Service Desk Administrator, Endpoint Support Analyst, Workstation Deployment Support, Technical Support Engineer, and junior software or AI web-tool roles where support operations, documentation, and practical development overlap.",
    education:
      "Raheem is pursuing a B.S. in Computer Science at University of the People. His academic work includes Java GUI programming, Java Collections and multithreading analysis, C programming, utility platform simulation, systems analysis, database concepts, wireframes, ER models, and class diagrams."
  };

  const form = document.querySelector("[data-question-form]");
  const input = document.querySelector("[data-question-input]");
  const submit = form.querySelector("button");
  const chatLog = document.querySelector("[data-chat-log]");
  const settings = document.querySelector("[data-settings]");
  const profile = document.querySelector("[data-profile]");
  const apiKeyInput = document.querySelector("[data-api-key]");
  const pageShell = document.querySelector(".page-shell");
  const responseStage = document.querySelector("[data-response-stage]");
  const currentQuery = document.querySelector("[data-current-query]");
  const stageTyping = document.querySelector("[data-stage-typing]");
  const responseContent = document.querySelector("[data-response-content]");
  const quickToggle = document.querySelector("[data-toggle-prompts]");
  const quickToggleLabel = document.querySelector("[data-toggle-label]");
  const promptGrid = document.querySelector(".prompt-grid");

  const richViews = {
    me: {
      question: "Who are you? I want to know more about you.",
      html: `
        <section class="answer-section profile-answer">
          <div class="profile-photo"><img src="./assets/portfolio-avatar.png" alt=""></div>
          <div class="profile-copy">
            <h2>Raheem Burgess</h2>
            <div class="profile-meta"><span>Kingston, Jamaica</span><span>4+ years experience</span></div>
            <p>Hey. I'm Raheem, an IT Support and Systems Engineering professional focused on service desk operations, workstation support, deployment coordination, endpoint compliance, and clear technical documentation.</p>
            <div class="tag-row">
              <span>Systems Engineer</span><span>Service Desk</span><span>Endpoint Support</span><span>AI Web Tools</span>
            </div>
          </div>
        </section>
        <section class="answer-section">
          <p>I currently support users and systems at Sutherland Global Services while pursuing a B.S. in Computer Science. I like work that connects practical support, infrastructure readiness, documentation, and software ideas that solve real problems.</p>
          <p>My background includes Azure Virtual Desktop, BeyondTrust, Microsoft 365, SCCM communication checks, SentinelOne/S1, BitLocker, Zscaler, VPN validation, ticketing workflows, Excel reporting, Java, C, HTML, CSS, WordPress, Shopify, and database concepts.</p>
        </section>`
    },
    projects: {
      question: "What are your projects? What are you working on right now?",
      html: `
        <section class="answer-section projects-answer">
          <h2>My Projects</h2>
          <div class="project-carousel" data-project-carousel>
            <article class="project-card" style="--project-bg: linear-gradient(180deg, #030303, #151515); --project-glow: radial-gradient(circle, rgba(32,125,122,.85), transparent 62%);">
              <small>NFC Medical System</small>
              <strong>Medi-Link</strong>
              <p>An NFC emergency medical band concept with compact offline fields, UID links, checksums, versioning, and verification status.</p>
            </article>
            <article class="project-card" style="--project-bg: linear-gradient(180deg, #202124, #efefef 56%, #ffd978); --project-glow: radial-gradient(circle, rgba(255,210,92,.95), transparent 60%);">
              <small>AI Website Builder</small>
              <strong>Begoogable</strong>
              <p>An AI-powered website generation platform for wireframes, landing pages, editable blocks, and stronger local business visibility.</p>
            </article>
            <article class="project-card" style="--project-bg: linear-gradient(180deg, #210405, #491616 42%, #151515); --project-glow: radial-gradient(circle, rgba(185,95,157,.75), transparent 62%);">
              <small>Deployment Support</small>
              <strong>Internal Tools</strong>
              <p>Supported a replacement for a latency-prone legacy application through rollout coordination, documentation, installation help, and user readiness.</p>
            </article>
          </div>
          <div class="carousel-controls">
            <button class="round-control" type="button" data-project-prev aria-label="Previous project">←</button>
            <button class="round-control" type="button" data-project-next aria-label="Next project">→</button>
          </div>
          <p>I've worked across operational support and software ideas: emergency medical data access, AI-generated websites, endpoint compliance tracking, WAH readiness bluebooks, Java GUI coursework, C utility simulations, and systems analysis documentation.</p>
        </section>`
    },
    skills: {
      question: "What are your skills? Give me a list of your soft and hard skills.",
      html: `
        <section class="answer-section skills-answer">
          <h2>Skills & Expertise</h2>
          <div class="skill-group">
            <h3>Service Desk & User Support</h3>
            <div class="skill-pills"><span>Incident Intake</span><span>Ticket Management</span><span>Triage</span><span>Escalation</span><span>SLA Awareness</span><span>End-user Support</span></div>
          </div>
          <div class="skill-group">
            <h3>Endpoint & Security Compliance</h3>
            <div class="skill-pills"><span>SCCM</span><span>SentinelOne/S1</span><span>BitLocker</span><span>Zscaler</span><span>VPN Readiness</span><span>Endpoint Follow-up</span></div>
          </div>
          <div class="skill-group">
            <h3>Remote Work & Systems</h3>
            <div class="skill-pills"><span>Azure Virtual Desktop</span><span>BeyondTrust</span><span>Microsoft 365</span><span>Excel Reporting</span><span>Windows Troubleshooting</span><span>Client-tool Validation</span></div>
          </div>
          <div class="skill-group">
            <h3>Development & Web</h3>
            <div class="skill-pills"><span>Java</span><span>C</span><span>HTML</span><span>CSS</span><span>WordPress</span><span>Shopify</span><span>Databases</span><span>SEO</span></div>
          </div>
          <div class="skill-group">
            <h3>Soft Skills</h3>
            <div class="skill-pills"><span>Communication</span><span>Documentation</span><span>Stakeholder Coordination</span><span>Problem Solving</span><span>Adaptability</span><span>Learning Agility</span></div>
          </div>
        </section>`
    },
    fun: {
      question: "What's a fun fact about your work style?",
      html: `
        <section class="answer-section fun-answer">
          <h2>Work Style</h2>
          <div class="fun-card">
            <p>I like practical systems: tools that reduce confusion, documentation that actually helps people, and AI products that become editable, useful workflows instead of generic output.</p>
            <img src="./assets/portfolio-avatar.png" alt="">
          </div>
          <p>Outside of the formal resume, the clearest pattern is that I keep gravitating toward projects where support operations, structured data, and software meet: NFC medical records, AI website generation, endpoint readiness, and internal deployment workflows.</p>
        </section>`
    },
    contact: {
      question: "How can I contact you?",
      html: `
        <section class="answer-section contact-answer">
          <div class="contact-card">
            <div>
              <h2>Contacts</h2>
              <a class="contact-email" href="mailto:raheemburgess86@gmail.com">raheemburgess86@gmail.com <span>›</span></a>
              <div class="contact-links">
                <a href="https://www.linkedin.com/in/raheemkhalidburgess/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com/sheathx" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://x.com/imbrgs" target="_blank" rel="noreferrer">X</a>
                <a href="https://www.instagram.com/imbrgs/" target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </div>
            <strong>@imbrgs</strong>
          </div>
          <p>You can reach me by email at <a href="mailto:raheemburgess86@gmail.com">raheemburgess86@gmail.com</a>, phone at <a href="tel:+18764598150">876-459-8150</a>, or through LinkedIn/GitHub. For roles, I’m best aligned with IT support, systems engineering, endpoint support, deployment coordination, documentation-heavy operations, and junior AI web-tool work.</p>
        </section>`
    }
  };

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function markdownish(text) {
    const safe = escapeHtml(text.trim());
    const lines = safe.split(/\n+/).filter(Boolean);
    if (lines.length > 1 && lines.every((line) => /^[-*]\s+/.test(line))) {
      return `<ul>${lines.map((line) => `<li>${line.replace(/^[-*]\s+/, "")}</li>`).join("")}</ul>`;
    }
    return lines.map((line) => `<p>${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`).join("");
  }

  function appendMessage(role, content, options = {}) {
    chatLog.hidden = false;
    const message = document.createElement("article");
    message.className = `message ${role === "user" ? "user-message" : "assistant-message"}`;
    if (options.loading) {
      message.innerHTML = `<span class="message-label">Raheem AI</span><div class="typing"><span></span><span></span><span></span></div>`;
    } else {
      message.innerHTML = `<span class="message-label">${role === "user" ? "You" : "Raheem AI"}</span>${markdownish(content)}`;
    }
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
    return message;
  }

  function enterChatMode(question) {
    pageShell.classList.add("chat-mode");
    responseStage.hidden = false;
    quickToggle.hidden = false;
    currentQuery.textContent = question;
    responseContent.innerHTML = "";
    responseContent.classList.remove("is-visible");
    stageTyping.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function revealContent(html) {
    stageTyping.hidden = true;
    responseContent.innerHTML = html;
    requestAnimationFrame(() => responseContent.classList.add("is-visible"));
    attachResponseControls();
  }

  function renderPlainAnswer(answer) {
    return `<section class="answer-section"><p>${escapeHtml(answer).replace(/\n+/g, "</p><p>")}</p></section>`;
  }

  function attachResponseControls() {
    const carousel = responseContent.querySelector("[data-project-carousel]");
    if (!carousel) return;

    const scrollByCard = (direction) => {
      const card = carousel.querySelector(".project-card");
      const distance = card ? card.getBoundingClientRect().width + 24 : 360;
      carousel.scrollBy({ left: direction * distance, behavior: "smooth" });
    };

    responseContent.querySelector("[data-project-prev]")?.addEventListener("click", () => scrollByCard(-1));
    responseContent.querySelector("[data-project-next]")?.addEventListener("click", () => scrollByCard(1));
  }

  async function showRichView(view, question) {
    const selected = richViews[view] || null;
    const displayQuestion = question || selected?.question || "Ask me anything";
    enterChatMode(displayQuestion);
    await new Promise((resolve) => setTimeout(resolve, selected ? 650 : 360));
    if (selected) {
      revealContent(selected.html);
      return;
    }

    const apiKey = localStorage.getItem(KEY_STORAGE);
    try {
      const answer = apiKey ? await askGemini(displayQuestion, apiKey) : selectLocalAnswer(displayQuestion);
      revealContent(renderPlainAnswer(answer));
    } catch (error) {
      console.error(error);
      revealContent(renderPlainAnswer(`${selectLocalAnswer(displayQuestion)}\n\nGemini could not respond with the saved key, so this answer came from the built-in CV engine.`));
    }
  }

  function setQuestion(value) {
    input.value = value;
    submit.disabled = !value.trim();
    input.focus();
  }

  function selectLocalAnswer(question) {
    const q = question.toLowerCase();
    if (/(contact|email|phone|linkedin|github|social|instagram|twitter|x\b)/.test(q)) return cannedAnswers.contact;
    if (/(tool|platform|stack|software|technology|tech|skill|skills)/.test(q)) return cannedAnswers.tools;
    if (/(project|portfolio|medi-link|medilink|begoogable|nfc|java|c app|utility|bluebook)/.test(q)) return cannedAnswers.projects;
    if (/(role|job|fit|hire|position|suited|career)/.test(q)) return cannedAnswers.roles;
    if (/(education|degree|school|university|uopeople|utech|study|studying)/.test(q)) return cannedAnswers.education;
    if (/(summary|background|experience|who|about|profile|tell me)/.test(q)) return cannedAnswers.background;
    return [
      cannedAnswers.background,
      "A few high-signal details from the CV: current Systems Engineer at Sutherland Global Services, previous Infrastructure Specialist from 2020 to 2023, strong service desk and endpoint compliance experience, and active AI/software projects including Medi-Link and Begoogable."
    ].join("\n\n");
  }

  async function askGemini(question, apiKey) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8500);
    let response;
    try {
      response = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          model: GEMINI_MODEL,
          system_instruction:
            "You are Raheem Burgess' AI portfolio assistant. Answer in first person where natural. Use only the CV context and social links provided. If a detail is not in the context, say that it is not listed in the CV. Keep answers concise, specific, and recruiter-friendly.",
          input: `CV CONTEXT:\n${resumeContext}\n\nUSER QUESTION:\n${question}`,
          generation_config: {
            temperature: 0.35,
            thinking_level: "low"
          }
        })
      });
    } finally {
      window.clearTimeout(timeout);
    }

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || `Gemini request failed with ${response.status}`);
    }

    const data = await response.json();
    if (data.output_text) return data.output_text;
    const textFromSteps = data.steps
      ?.flatMap((step) => step.content || [])
      ?.filter((content) => content.type === "text")
      ?.map((content) => content.text)
      ?.join("");
    return textFromSteps || selectLocalAnswer(question);
  }

  async function handleQuestion(question) {
    await showRichView(null, question);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = "";
    submit.disabled = true;
    handleQuestion(question);
  });

  input.addEventListener("input", () => {
    submit.disabled = !input.value.trim();
  });

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => showRichView(button.dataset.view, button.dataset.prompt || ""));
  });

  quickToggle.addEventListener("click", () => {
    pageShell.classList.toggle("prompts-hidden");
    const hidden = pageShell.classList.contains("prompts-hidden");
    quickToggleLabel.textContent = hidden ? "Show quick questions" : "Hide quick questions";
  });

  document.querySelector("[data-open-settings]").addEventListener("click", () => {
    apiKeyInput.value = localStorage.getItem(KEY_STORAGE) || "";
    settings.hidden = false;
    apiKeyInput.focus();
  });

  document.querySelector("[data-close-settings]").addEventListener("click", () => {
    settings.hidden = true;
  });

  document.querySelector("[data-save-key]").addEventListener("click", () => {
    const key = apiKeyInput.value.trim();
    if (key) localStorage.setItem(KEY_STORAGE, key);
    settings.hidden = true;
  });

  document.querySelector("[data-clear-key]").addEventListener("click", () => {
    localStorage.removeItem(KEY_STORAGE);
    apiKeyInput.value = "";
  });

  document.querySelector("[data-open-panel]").addEventListener("click", () => {
    profile.hidden = false;
  });

  document.querySelector("[data-close-panel]").addEventListener("click", () => {
    profile.hidden = true;
  });

  [settings, profile].forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) backdrop.hidden = true;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      settings.hidden = true;
      profile.hidden = true;
    }
  });

  const canvas = document.getElementById("fluid");
  const ctx = canvas.getContext("2d", { alpha: true });
  const particles = [];
  const colors = ["#207d7a", "#3e9858", "#146fd7", "#b95f9d", "#c19433"];
  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.floor(window.innerWidth * dpr);
    height = Math.floor(window.innerHeight * dpr);
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }

  function addSplat(x, y, forceX = 0, forceY = 0, count = 16) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.25 + Math.random() * 1.25;
      particles.push({
        x,
        y,
        vx: forceX * 0.018 + Math.cos(angle) * speed,
        vy: forceY * 0.018 + Math.sin(angle) * speed,
        life: 1,
        radius: (28 + Math.random() * 58) * dpr,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    if (particles.length > 420) particles.splice(0, particles.length - 420);
  }

  function seed() {
    for (let i = 0; i < 8; i += 1) {
      addSplat(Math.random() * width, Math.random() * height, 0, 0, 9);
    }
  }

  function render() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(248, 247, 244, 0.06)";
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "screen";

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p.x += p.vx * dpr;
      p.y += p.vy * dpr;
      p.vx *= 0.982;
      p.vy *= 0.982;
      p.life -= 0.0065;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, `${p.color}2a`);
      gradient.addColorStop(0.45, `${p.color}12`);
      gradient.addColorStop(1, `${p.color}00`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(render);
  }

  let pointer = null;
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (event) => {
    const x = event.clientX * dpr;
    const y = event.clientY * dpr;
    const fx = pointer ? x - pointer.x : 0;
    const fy = pointer ? y - pointer.y : 0;
    pointer = { x, y };
    addSplat(x, y, fx, fy, 5);
  });
  window.addEventListener("mousedown", (event) => addSplat(event.clientX * dpr, event.clientY * dpr, 0, 0, 24));
  window.addEventListener(
    "touchmove",
    (event) => {
      for (const touch of event.changedTouches) addSplat(touch.clientX * dpr, touch.clientY * dpr, 0, 0, 5);
    },
    { passive: true }
  );

  resize();
  seed();
  render();
})();
