// Application state
let currentData = {
    services: [],
    contractors: [],
    laborers: [],
    projects: []
};

// DOM elements
const elements = {
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('.section'),
    servicesGrid: document.getElementById('services-grid'),
    contractorsGrid: document.getElementById('contractors-grid'),
    laborersGrid: document.getElementById('laborers-grid'),
    portfolioGrid: document.getElementById('portfolio-grid'),
    featuredServicesGrid: document.getElementById('featured-services-grid'),
    featuredContractorsGrid: document.getElementById('featured-contractors-grid'),
    contactForm: document.getElementById('contact-form'),
    contractorModal: document.getElementById('contractor-modal'),
    projectModal: document.getElementById('project-modal'),
    contractorDetails: document.getElementById('contractor-details'),
    projectDetails: document.getElementById('project-details')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    await loadAllData();
    updateStats();
    renderFeaturedContent();
    renderAllContent();
}

function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Filters
    document.getElementById('service-category-filter')?.addEventListener('change', filterServices);
    document.getElementById('contractor-specialty-filter')?.addEventListener('change', filterContractors);
    document.getElementById('contractor-location-filter')?.addEventListener('change', filterContractors);
    document.getElementById('laborer-specialty-filter')?.addEventListener('change', filterLaborers);
    document.getElementById('available-only-filter')?.addEventListener('change', filterLaborers);
    document.getElementById('portfolio-category-filter')?.addEventListener('change', filterPortfolio);

    // Contact form
    elements.contactForm?.addEventListener('submit', handleContactSubmit);

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Mobile menu toggle
    document.querySelector('.nav-hamburger')?.addEventListener('click', toggleMobileMenu);
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    showSection(targetId);
    
    // Update active nav link
    elements.navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
}

function showSection(sectionId) {
    elements.sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Data loading functions
async function loadAllData() {
    try {
        const [servicesResponse, contractorsResponse, laborersResponse, projectsResponse] = await Promise.all([
            fetch('/api/services'),
            fetch('/api/contractors'),
            fetch('/api/laborers'),
            fetch('/api/projects')
        ]);

        currentData.services = await servicesResponse.json();
        currentData.contractors = await contractorsResponse.json();
        currentData.laborers = await laborersResponse.json();
        currentData.projects = await projectsResponse.json();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load data. Please try again later.');
    }
}

function updateStats() {
    document.getElementById('contractors-count').textContent = currentData.contractors.length;
    document.getElementById('projects-count').textContent = currentData.projects.length;
    document.getElementById('services-count').textContent = currentData.services.length;
    document.getElementById('laborers-count').textContent = currentData.laborers.length;

    // Animate numbers
    animateNumbers();
}

function animateNumbers() {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 40);
    });
}

function renderFeaturedContent() {
    // Featured services (first 3)
    const featuredServices = currentData.services.slice(0, 3);
    elements.featuredServicesGrid.innerHTML = featuredServices.map(service => createServiceCard(service)).join('');

    // Featured contractors (first 3)
    const featuredContractors = currentData.contractors.slice(0, 3);
    elements.featuredContractorsGrid.innerHTML = featuredContractors.map(contractor => createContractorCard(contractor)).join('');
}

function renderAllContent() {
    renderServices();
    renderContractors();
    renderLaborers();
    renderPortfolio();
}

function renderServices() {
    if (!elements.servicesGrid) return;
    elements.servicesGrid.innerHTML = currentData.services.map(service => createServiceCard(service)).join('');
}

function renderContractors() {
    if (!elements.contractorsGrid) return;
    elements.contractorsGrid.innerHTML = currentData.contractors.map(contractor => createContractorCard(contractor)).join('');
}

function renderLaborers() {
    if (!elements.laborersGrid) return;
    elements.laborersGrid.innerHTML = currentData.laborers.map(laborer => createLaborerCard(laborer)).join('');
}

function renderPortfolio() {
    if (!elements.portfolioGrid) return;
    elements.portfolioGrid.innerHTML = currentData.projects.map(project => createProjectCard(project)).join('');
}

// Card creation functions
function createServiceCard(service) {
    return `
        <div class="service-card">
            <div class="card-header">
                <img src="/api/placeholder/60/60" alt="${service.name}" class="card-image">
                <div class="card-info">
                    <h3>${service.name}</h3>
                    <p>${service.category}</p>
                </div>
            </div>
            <div class="card-content">
                <p>${service.description}</p>
            </div>
        </div>
    `;
}

function createContractorCard(contractor) {
    return `
        <div class="contractor-card" onclick="showContractorDetails(${contractor.id})">
            <div class="card-header">
                <img src="${contractor.profileImage || '/api/placeholder/60/60'}" alt="${contractor.name}" class="card-image">
                <div class="card-info">
                    <h3>${contractor.name}</h3>
                    <p>${contractor.specialty}</p>
                </div>
            </div>
            <div class="card-content">
                <p>${contractor.description}</p>
                <p><strong>Experience:</strong> ${contractor.experience}</p>
                <p><strong>Location:</strong> ${contractor.location}</p>
            </div>
            <div class="card-meta">
                <div class="rating">
                    <span class="stars">${generateStars(parseFloat(contractor.rating))}</span>
                    <span>${contractor.rating} (${contractor.reviewCount} reviews)</span>
                </div>
                <div class="badges">
                    ${contractor.isLicensed ? '<span class="badge badge-licensed">Licensed</span>' : ''}
                    ${contractor.isInsured ? '<span class="badge badge-licensed">Insured</span>' : ''}
                </div>
            </div>
        </div>
    `;
}

function createLaborerCard(laborer) {
    return `
        <div class="laborer-card">
            <div class="card-header">
                <img src="${laborer.profileImage || '/api/placeholder/60/60'}" alt="${laborer.name}" class="card-image">
                <div class="card-info">
                    <h3>${laborer.name}</h3>
                    <p>${laborer.specialty}</p>
                </div>
            </div>
            <div class="card-content">
                <p><strong>Experience:</strong> ${laborer.experience}</p>
                <p><strong>Hourly Rate:</strong> ${laborer.hourlyRate}</p>
            </div>
            <div class="card-meta">
                <div class="rating">
                    <span class="stars">${generateStars(parseFloat(laborer.rating))}</span>
                    <span>${laborer.rating} (${laborer.reviewCount} reviews)</span>
                </div>
                <span class="badge ${laborer.isAvailable ? 'badge-available' : 'badge-busy'}">
                    ${laborer.isAvailable ? 'Available' : 'Busy'}
                </span>
            </div>
        </div>
    `;
}

function createProjectCard(project) {
    return `
        <div class="portfolio-card" onclick="showProjectDetails(${project.id})">
            <img src="${project.image || '/api/placeholder/400/300'}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p><strong>Category:</strong> ${project.category}</p>
                <p><strong>Contractor:</strong> ${project.contractorName}</p>
                <p><strong>Completed:</strong> ${project.completionYear}</p>
                <p>${project.description}</p>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '☆';
    }
    
    return stars;
}

// Filter functions
function filterServices() {
    const category = document.getElementById('service-category-filter').value;
    const filtered = category 
        ? currentData.services.filter(service => service.category.toLowerCase() === category.toLowerCase())
        : currentData.services;
    
    elements.servicesGrid.innerHTML = filtered.map(service => createServiceCard(service)).join('');
}

function filterContractors() {
    const specialty = document.getElementById('contractor-specialty-filter').value;
    const location = document.getElementById('contractor-location-filter').value;
    
    let filtered = currentData.contractors;
    
    if (specialty) {
        filtered = filtered.filter(contractor => contractor.specialty === specialty);
    }
    if (location) {
        filtered = filtered.filter(contractor => contractor.location === location);
    }
    
    elements.contractorsGrid.innerHTML = filtered.map(contractor => createContractorCard(contractor)).join('');
}

function filterLaborers() {
    const specialty = document.getElementById('laborer-specialty-filter').value;
    const availableOnly = document.getElementById('available-only-filter').checked;
    
    let filtered = currentData.laborers;
    
    if (specialty) {
        filtered = filtered.filter(laborer => laborer.specialty === specialty);
    }
    if (availableOnly) {
        filtered = filtered.filter(laborer => laborer.isAvailable);
    }
    
    elements.laborersGrid.innerHTML = filtered.map(laborer => createLaborerCard(laborer)).join('');
}

function filterPortfolio() {
    const category = document.getElementById('portfolio-category-filter').value;
    const filtered = category 
        ? currentData.projects.filter(project => project.category.toLowerCase() === category.toLowerCase())
        : currentData.projects;
    
    elements.portfolioGrid.innerHTML = filtered.map(project => createProjectCard(project)).join('');
}

// Modal functions
function showContractorDetails(contractorId) {
    const contractor = currentData.contractors.find(c => c.id === contractorId);
    if (!contractor) return;
    
    const contractorProjects = currentData.projects.filter(p => p.contractorId === contractorId);
    
    elements.contractorDetails.innerHTML = `
        <h2>${contractor.name}</h2>
        <div style="display: flex; gap: 2rem; margin: 1rem 0;">
            <img src="${contractor.profileImage || '/api/placeholder/120/120'}" alt="${contractor.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
            <div>
                <p><strong>Specialty:</strong> ${contractor.specialty}</p>
                <p><strong>Experience:</strong> ${contractor.experience}</p>
                <p><strong>Location:</strong> ${contractor.location}</p>
                <p><strong>Email:</strong> ${contractor.email}</p>
                <p><strong>Phone:</strong> ${contractor.phone}</p>
                <div class="rating">
                    <span class="stars">${generateStars(parseFloat(contractor.rating))}</span>
                    <span>${contractor.rating} (${contractor.reviewCount} reviews)</span>
                </div>
                <div class="badges" style="margin-top: 1rem;">
                    ${contractor.isLicensed ? '<span class="badge badge-licensed">Licensed</span>' : ''}
                    ${contractor.isInsured ? '<span class="badge badge-licensed">Insured</span>' : ''}
                </div>
            </div>
        </div>
        <div style="margin: 2rem 0;">
            <h3>About</h3>
            <p>${contractor.description}</p>
        </div>
        ${contractorProjects.length > 0 ? `
            <div>
                <h3>Recent Projects</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    ${contractorProjects.map(project => `
                        <div class="portfolio-card" onclick="showProjectDetails(${project.id})">
                            <img src="${project.image || '/api/placeholder/250/150'}" alt="${project.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                            <div class="card-content">
                                <h4>${project.title}</h4>
                                <p>${project.category} • ${project.completionYear}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
    
    elements.contractorModal.style.display = 'block';
}

function showProjectDetails(projectId) {
    const project = currentData.projects.find(p => p.id === projectId);
    if (!project) return;
    
    elements.projectDetails.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image || '/api/placeholder/500/300'}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin: 1rem 0;">
        <div style="margin: 1rem 0;">
            <p><strong>Category:</strong> ${project.category}</p>
            <p><strong>Contractor:</strong> ${project.contractorName}</p>
            <p><strong>Completed:</strong> ${project.completionYear}</p>
        </div>
        <div style="margin: 2rem 0;">
            <h3>Project Description</h3>
            <p>${project.description}</p>
        </div>
    `;
    
    elements.projectModal.style.display = 'block';
}

function closeModal() {
    elements.contractorModal.style.display = 'none';
    elements.projectModal.style.display = 'none';
}

// Contact form handling
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        projectType: formData.get('projectType'),
        description: formData.get('description')
    };
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showSuccess('Thank you for your message! We\'ll get back to you soon.');
            e.target.reset();
        } else {
            const error = await response.json();
            showError('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showError('Failed to send message. Please try again.');
    }
}

// Utility functions
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Global functions for button clicks
window.showSection = showSection;
window.showContractorDetails = showContractorDetails;
window.showProjectDetails = showProjectDetails;

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 1rem;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);