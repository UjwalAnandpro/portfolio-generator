// ==================== STATE MANAGEMENT ====================
const state = {
    portfolio: {
        fullName: 'Sarah Anderson',
        title: 'Full Stack Developer & AI Enthusiast',
        aboutMe: 'Passionate full-stack developer with 6+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies. When I\'m not coding, I\'m exploring AI and machine learning possibilities.',
        email: 'sarah.anderson@example.com',
        github: 'https://github.com/sarahanders',
        linkedin: 'https://linkedin.com/in/sarahanders',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
        projects: [
            {
                title: 'AI Chat Application',
                description: 'A real-time chat application powered by AI integration for intelligent responses and sentiment analysis.',
                tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
                link: 'https://github.com/sarahanders/ai-chat',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
            },
            {
                title: 'E-Commerce Platform',
                description: 'Full-stack e-commerce platform with advanced filtering, payment integration, and admin dashboard.',
                tech: ['React', 'TypeScript', 'PostgreSQL', 'AWS'],
                link: 'https://github.com/sarahanders/ecommerce',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab36c4081?w=500&h=300&fit=crop'
            },
            {
                title: 'Data Analytics Dashboard',
                description: 'Interactive dashboard for visualizing complex data patterns with real-time updates.',
                tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
                link: 'https://github.com/sarahanders/analytics',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
            }
        ],
        template: 'modern'
    },
    currentTheme: 'dark',
    hasChanges: false
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeForm();
    initializeEventListeners();
    generatePortfolio();
    hideLoadingScreen();
});

// ==================== LOADING SCREEN ====================
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 800);
}

// ==================== THEME MANAGEMENT ====================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.getElementById('themeToggle');
    const themes = ['dark', 'light', 'cyberpunk'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    const icons = { dark: 'fa-moon', light: 'fa-sun', cyberpunk: 'fa-atom' };
    themeToggle.innerHTML = `<i class="fas ${icons[nextTheme]}"></i>`;
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const themes = ['dark', 'light', 'cyberpunk'];
    const currentIndex = themes.indexOf(state.currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    showToast('Theme changed', 'success');
});

// ==================== FORM INITIALIZATION ====================
function initializeForm() {
    // Character counters
    document.getElementById('fullName').addEventListener('input', (e) => {
        updateCharCount(e.target, 50);
        state.portfolio.fullName = e.target.value;
        state.hasChanges = true;
    });

    document.getElementById('aboutMe').addEventListener('input', (e) => {
        updateCharCount(e.target, 500);
        state.portfolio.aboutMe = e.target.value;
        state.hasChanges = true;
    });

    // Other input fields
    document.getElementById('title').addEventListener('input', (e) => {
        state.portfolio.title = e.target.value;
        state.hasChanges = true;
    });

    document.getElementById('email').addEventListener('input', (e) => {
        state.portfolio.email = e.target.value;
        state.hasChanges = true;
    });

    document.getElementById('github').addEventListener('input', (e) => {
        state.portfolio.github = e.target.value;
        state.hasChanges = true;
    });

    document.getElementById('linkedin').addEventListener('input', (e) => {
        state.portfolio.linkedin = e.target.value;
        state.hasChanges = true;
    });

    document.getElementById('profileImage').addEventListener('input', (e) => {
        state.portfolio.profileImage = e.target.value;
        state.hasChanges = true;
    });

    // Template selection
    document.querySelectorAll('input[name="template"]').forEach(input => {
        input.addEventListener('change', (e) => {
            state.portfolio.template = e.target.value;
            generatePortfolio();
        });
    });
}

function updateCharCount(input, max) {
    const count = input.parentElement.querySelector('.char-count .current');
    if (count) {
        count.textContent = Math.min(input.value.length, max);
    }
}

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Skills
    document.querySelector('.btn-add-skill').addEventListener('click', addSkill);
    document.getElementById('skillInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });

    // Projects
    document.querySelector('.btn-add-project').addEventListener('click', openProjectModal);

    // Form submission
    document.getElementById('portfolioForm').addEventListener('submit', (e) => {
        e.preventDefault();
        generatePortfolio();
        showToast('Portfolio generated successfully!', 'success');
    });

    // Preview tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Copy code button
    document.getElementById('copyCodeBtn').addEventListener('click', copyCode);

    // Download button
    document.getElementById('downloadBtn').addEventListener('click', downloadPortfolio);

    // Copy HTML button
    document.getElementById('copyHtmlBtn').addEventListener('click', copyHtmlCode);

    // Modal
    const projectModal = document.getElementById('projectModal');
    document.querySelector('.modal-close').addEventListener('click', closeProjectModal);
    document.getElementById('cancelProjectBtn').addEventListener('click', closeProjectModal);
    document.getElementById('projectForm').addEventListener('submit', addProjectFromModal);

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// ==================== SKILLS MANAGEMENT ====================
function addSkill() {
    const input = document.getElementById('skillInput');
    const skill = input.value.trim();

    if (!skill) {
        showToast('Please enter a skill', 'warning');
        return;
    }

    if (state.portfolio.skills.includes(skill)) {
        showToast('Skill already added', 'warning');
        input.value = '';
        return;
    }

    state.portfolio.skills.push(skill);
    input.value = '';
    renderSkills();
    state.hasChanges = true;
}

function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = state.portfolio.skills.map(skill => `
        <span class="skill-tag">
            ${skill}
            <button type="button" class="remove-skill" data-skill="${skill}">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');

    document.querySelectorAll('.remove-skill').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const skill = btn.getAttribute('data-skill');
            state.portfolio.skills = state.portfolio.skills.filter(s => s !== skill);
            renderSkills();
            state.hasChanges = true;
        });
    });
}

// ==================== PROJECTS MANAGEMENT ====================
function openProjectModal() {
    document.getElementById('projectModal').classList.add('active');
    document.getElementById('projectForm').reset();
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
}

function addProjectFromModal(e) {
    e.preventDefault();

    const project = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        tech: document.getElementById('projectTech').value
            .split(',')
            .map(t => t.trim())
            .filter(t => t),
        link: document.getElementById('projectLink').value,
        image: document.getElementById('projectImage').value
    };

    if (!project.title || !project.description || !project.image) {
        showToast('Please fill in all required fields', 'warning');
        return;
    }

    state.portfolio.projects.push(project);
    renderProjects();
    closeProjectModal();
    state.hasChanges = true;
    showToast('Project added successfully!', 'success');
}

function renderProjects() {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = state.portfolio.projects.map((project, index) => `
        <div class="project-item">
            <span class="project-item-title">${project.title}</span>
            <button type="button" class="project-item-remove" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    document.querySelectorAll('.project-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const index = btn.getAttribute('data-index');
            state.portfolio.projects.splice(index, 1);
            renderProjects();
            state.hasChanges = true;
        });
    });
}

// ==================== PORTFOLIO GENERATION ====================
function generatePortfolio() {
    const portfolio = generatePortfolioHTML();
    const preview = document.getElementById('portfolioPreview');
    preview.innerHTML = portfolio;

    // Generate code
    const code = generateCode();
    document.getElementById('generatedCode').textContent = code;

    // Update livepreview
    addEventListenersToPortfolio();
}

function generatePortfolioHTML() {
    const { fullName, title, aboutMe, email, github, linkedin, profileImage, skills, projects, template } = state.portfolio;

    return `
        <div class="portfolio portfolio-${template}">
            <!-- Hero Section -->
            <section class="hero">
                <div class="hero-content">
                    <img src="${profileImage}" alt="${fullName}" class="hero-image" onerror="this.src='https://via.placeholder.com/100?text=No+Image'">
                    <h1>${fullName}</h1>
                    <p>${title}</p>
                </div>
            </section>

            <!-- About Section -->
            <section class="about">
                <h2>About Me</h2>
                <p>${aboutMe}</p>
            </section>

            <!-- Skills Section -->
            <section class="skills">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${skills.map(skill => `<div class="skill-item"><div class="skill-item-name">${skill}</div></div>`).join('')}
                </div>
            </section>

            <!-- Projects Section -->
            <section class="projects">
                <h2>Projects</h2>
                <div class="projects-grid">
                    ${projects.map(project => `
                        <div class="project-card">
                            <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/300x200?text=Project+Image'">
                            <div class="project-info">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-description">${project.description}</p>
                                <div class="project-tech">
                                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Contact Section -->
            <section class="contact">
                <h2>Get In Touch</h2>
                <p>I'm always open to new opportunities and interesting projects.</p>
                <div class="contact-links">
                    ${email ? `<a href="mailto:${email}" class="contact-link"><i class="fas fa-envelope"></i> Email</a>` : ''}
                    ${github ? `<a href="${github}" target="_blank" class="contact-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${linkedin ? `<a href="${linkedin}" target="_blank" class="contact-link"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                </div>
            </section>
        </div>
    `;
}

// ==================== TAB SWITCHING ====================
function switchTab(tabName) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// ==================== CODE GENERATION ====================
function generateCode() {
    const { fullName, title, aboutMe, email, github, linkedin, profileImage, skills, projects } = state.portfolio;

    const projectsHTML = projects.map(project => `
                    <div class="project-card">
                        <img src="${project.image}" alt="${project.title}" class="project-image">
                        <div class="project-info">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="project-tech">
                                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                        </div>
                    </div>
                `).join('');

    const skillsHTML = skills.map(skill => `
                    <div class="skill-item"><div class="skill-item-name">${skill}</div></div>
                `).join('');

    const contactLinksHTML = `
                ${email ? `<a href="mailto:${email}" class="contact-link"><i class="fas fa-envelope"></i> Email</a>` : ''}
                ${github ? `<a href="${github}" target="_blank" class="contact-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
                ${linkedin ? `<a href="${linkedin}" target="_blank" class="contact-link"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
            `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fullName} - Portfolio</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #6366f1;
            --bg: #0f172a;
            --bg-secondary: #1e293b;
            --text: #f1f5f9;
            --text-secondary: #cbd5e1;
            --border: #475569;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
        }
        .portfolio {
            min-height: 100vh;
        }
        .hero {
            background: linear-gradient(135deg, var(--primary), #a855f7);
            padding: 60px 30px;
            text-align: center;
            color: white;
        }
        .hero h1 {
            font-size: 48px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        .hero p {
            font-size: 20px;
            opacity: 0.9;
        }
        .hero-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 20px;
            border: 4px solid white;
            object-fit: cover;
        }
        .about, .skills, .projects, .contact {
            padding: 60px 30px;
        }
        .about h2, .skills h2, .projects h2, .contact h2 {
            font-size: 32px;
            margin-bottom: 30px;
            color: var(--primary);
        }
        .about p {
            color: var(--text-secondary);
            max-width: 600px;
        }
        .skills {
            background: var(--bg-secondary);
        }
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        .skill-item {
            background: var(--bg);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid var(--border);
        }
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .project-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 8px;
            overflow: hidden;
        }
        .project-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .project-info {
            padding: 20px;
        }
        .project-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .project-description {
            color: var(--text-secondary);
            font-size: 14px;
            margin-bottom: 12px;
        }
        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 12px;
        }
        .tech-tag {
            background: var(--primary);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
        }
        .contact {
            background: var(--bg-secondary);
            text-align: center;
        }
        .contact-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 30px;
        }
        .contact-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            padding: 10px 20px;
            border: 2px solid var(--primary);
            border-radius: 8px;
        }
        .contact-link:hover {
            background: var(--primary);
            color: white;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 32px; }
            .about h2, .skills h2, .projects h2, .contact h2 { font-size: 24px; }
            .skills-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
            .projects-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="portfolio">
        <section class="hero">
            <img src="${profileImage}" alt="${fullName}" class="hero-image">
            <h1>${fullName}</h1>
            <p>${title}</p>
        </section>

        <section class="about">
            <h2>About Me</h2>
            <p>${aboutMe}</p>
        </section>

        <section class="skills">
            <h2>Skills</h2>
            <div class="skills-grid">
                ${skillsHTML}
            </div>
        </section>

        <section class="projects">
            <h2>Projects</h2>
            <div class="projects-grid">
                ${projectsHTML}
            </div>
        </section>

        <section class="contact">
            <h2>Get In Touch</h2>
            <p>I'm always open to new opportunities and interesting projects.</p>
            <div class="contact-links">
                ${contactLinksHTML}
            </div>
        </section>
    </div>
</body>
</html>`;
}

// ==================== COPY CODE ====================
function copyCode() {
    const code = document.getElementById('generatedCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy code', 'error');
    });
}

function copyHtmlCode() {
    const html = generateCode();
    navigator.clipboard.writeText(html).then(() => {
        showToast('HTML code copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy code', 'error');
    });
}

// ==================== DOWNLOAD PORTFOLIO ====================
function downloadPortfolio() {
    const html = generateCode();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.portfolio.fullName.replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Portfolio downloaded successfully!', 'success');
}

// ==================== EVENT LISTENERS FOR PORTFOLIO ====================
function addEventListenersToPortfolio() {
    const links = document.querySelectorAll('#portfolioPreview a[target="_blank"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Allow normal click behavior
        });
    });

    // Add smooth scroll behavior
    const sections = document.querySelectorAll('#portfolioPreview .portfolio > section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ==================== UTILITY FUNCTIONS ====================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
