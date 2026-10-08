/**
 * Hamiz Pathan - Modern AI Engineer Portfolio
 * Interactive Functionality & Neural Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initAboutTabs();
  initProjectFilters();
  initCertFilters();
  initCertModal();
  initTerminal();
  initContactCopy();
  initContactForm();
  initBackToTop();
  initScrollAnimations();
});

/* ==========================================================================
   1. NEURAL PARTICLE CANVAS
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 14000), 80);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse repulsion
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 3;
          this.y += (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = [
    'AI Engineer',
    'Machine Learning Engineer',
    'Generative AI Engineer',
    'Published IEEE Researcher',
    'Computer Vision & Multimodal Specialist',
    'Deep Learning & Systems Developer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVBAR SCROLL & ACTIVE LINKS
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  if (!menuToggle || !navbar) return;

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      if (navbar.classList.contains('open')) {
        icon.className = 'bx bx-x';
      } else {
        icon.className = 'bx bx-menu';
      }
    }
  });

  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'bx bx-menu';
    });
  });
}

/* ==========================================================================
   5. ABOUT TABS
   ========================================================================== */
function initAboutTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. CERTIFICATES & ACHIEVEMENTS FILTER
   ========================================================================== */
function initCertFilters() {
  const certTabBtns = document.querySelectorAll('.cert-tab-btn');
  const certCards = document.querySelectorAll('.cert-card');

  certTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-cert-filter');

      certTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      certCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. CERTIFICATE PREVIEW MODAL
   ========================================================================== */
function initCertModal() {
  const modal = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const certViewBtns = document.querySelectorAll('.cert-view-btn');

  if (!modal) return;

  const modalTitle = document.getElementById('modal-cert-title');
  const modalOrg = document.getElementById('modal-cert-org');
  const modalDate = document.getElementById('modal-cert-date');
  const modalDesc = document.getElementById('modal-cert-desc');
  const modalId = document.getElementById('modal-cert-id');
  const modalSkills = document.getElementById('modal-cert-skills');
  const modalVerifyLink = document.getElementById('modal-verify-link');

  certViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const org = btn.getAttribute('data-org');
      const date = btn.getAttribute('data-date');
      const desc = btn.getAttribute('data-desc');
      const credId = btn.getAttribute('data-id');
      const skills = btn.getAttribute('data-skills');
      const link = btn.getAttribute('data-link') || 'https://www.linkedin.com/in/hamiz-pathan-24859625b/recent-activity/all/';

      if (modalTitle) modalTitle.textContent = title;
      if (modalOrg) modalOrg.textContent = org;
      if (modalDate) modalDate.textContent = date;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalId) modalId.textContent = credId;
      if (modalVerifyLink) modalVerifyLink.href = link;

      if (modalSkills) {
        modalSkills.innerHTML = '';
        skills.split(',').forEach(skill => {
          const pill = document.createElement('span');
          pill.className = 'tech-pill';
          pill.textContent = skill.trim();
          modalSkills.appendChild(pill);
        });
      }

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE AI TERMINAL (Recruiter Easter Egg)
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const quickCmds = document.querySelectorAll('.cmd-chip');

  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: `Available commands:
  • about         - View Hamiz's core profile & AI focus
  • skills        - Print technical competencies & frameworks
  • projects      - List featured AI and engineering projects
  • research      - IEEE publication details & architecture
  • certs         - List verified industry & academic credentials
  • predict       - Run live simulated Face Anti-Spoofing data fusion test
  • contact       - Show email, phone, and direct contact options
  • clear         - Clear the terminal console`,

    about: `[PROFILE] Hamiz Pathan
• Career Direction: AI Engineer | Machine Learning Engineer | Generative AI Engineer
• Education: B.Tech in Artificial Intelligence & Data Science (SAKEC, 2026)
• Core Focus: Multimodal Deep Learning, Generative AI, Computer Vision, Depth Estimation & Systems Programming
• Location: Mumbai / Thane, India`,

    skills: `[TECHNICAL STACK]
• AI / ML: PyTorch, TensorFlow, Keras, OpenCV, MiDaS Depth, Scikit-Learn, CNNs, Pandas, NumPy
• Languages: Python, C++, Java, JavaScript, SQL, Bash
• Security & Net: Enterprise Firewalls, VAPT, SSH Server Monitoring, DC/DR
• Tools & Cloud: Docker, Git/GitHub, Linux, Django, Flask, Power BI, MySQL, MongoDB`,

    projects: `[FEATURED AI PROJECTS]
1. Multimodality Face Anti-Spoofing (PyTorch + MiDaS + LBP Data Fusion)
2. DermaAI (Skin Disease Classifier & Severity Engine on HAM10000)
3. AI Drug Discovery (Faster-RCNN + OpenVINO molecular screener)
4. FinClassify (Marine Species Recognition System)
5. AI Firewall & Threat Sentinel (Enterprise Anomaly Detection)`,

    research: `[IEEE PUBLICATION SPOTLIGHT]
Title: "A Data Fusion-Based Two-Stage Cascading Framework for Multi-Modal Face Anti-Spoofing Using Monocular Depth Estimation"
Status: Accepted for Publication in an IEEE Conference
Innovation: Integrates RGB + MiDaS Depth + LBP texture in a 2-stage cascade for bulletproof presentation attack detection.`,

    certs: `[CREDENTIALS & HONORS]
1. Cybersecurity & Network Security - Bombay Mercantile Co-op Bank
2. Cisco Certified Networking - Cisco Networking Academy
3. Data Structures & Algorithms Specialization
4. IEEE Conference Research Publication
5. Data Visualisation - Tata Group (Forage)
6. Software Engineering Simulation - Accenture (Forage)
7. Power BI & Business Intelligence Specialization`,

    contact: `[GET IN TOUCH]
• Email: hamizp123@gmail.com
• Phone / WhatsApp: +91 7045991161
• LinkedIn: linkedin.com/in/hamiz-pathan-24859625b
• GitHub: github.com/HamizPathan786`,

    predict: `[AI SIMULATOR] Running Multimodal Face Anti-Spoofing Data Fusion Pipeline...
> Input: Frame_0428.png (RGB 1080p)
> Extracting Monocular Depth Map via MiDaS... [DONE]
> Computing Local Binary Pattern (LBP) Texture Map... [DONE]
> Stage 1 Texture Anomaly Filter Score: 0.962 (Passed)
> Stage 2 PyTorch Feature-Level Fusion Score: 0.987
==================================================
RESULT: REAL / GENUINE PRESENTATION (Confidence: 98.7%)
ATTACK CLASSIFICATION: NONE (Safe for Biometric e-KYC)`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    
    // Create prompt echo line
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-output';
    promptLine.innerHTML = `<span class="term-user">visitor@hamiz-ai</span>:<span class="term-path">~/portfolio</span>$ ${rawCmd}`;
    terminalBody.appendChild(promptLine);

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    const response = document.createElement('div');
    response.className = 'terminal-output';
    
    if (commands[cmd]) {
      response.textContent = commands[cmd];
    } else if (cmd === '') {
      // Empty input
      return;
    } else {
      response.textContent = `bash: command not found: ${rawCmd}. Type "help" for a list of valid commands.`;
      response.style.color = '#f87171';
    }

    terminalBody.appendChild(response);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
      terminalInput.value = '';
    }
  });

  quickCmds.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
      terminalInput.focus();
    });
  });
}

/* ==========================================================================
   10. COPY TO CLIPBOARD & TOAST
   ========================================================================== */
function initContactCopy() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class='bx bx-check-circle' style='color: var(--cyan-primary); font-size: 1.2rem;'></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   11. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value;

    const mailtoUrl = `mailto:hamizp123@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    
    window.location.href = mailtoUrl;
    showToast('Opening your email client to send message...');
    form.reset();
  });
}

/* ==========================================================================
   12. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btt = document.getElementById('back-to-top');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   13. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.stat-card, .project-card, .cert-card, .exp-card, .skill-category-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
