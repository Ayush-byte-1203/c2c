// Global state
let currentSection = 'home';
let services = [];
let contractors = [];
let laborers = [];
let projects = [];

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up navigation
    setupNavigation();
    
    // Show home section by default
    showSection('home');
    
    // Load data
    loadAllData();
    
    // Set up event listeners
    setupEventListeners();
}

function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    // Update sections
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
    
    currentSection = sectionId;
    
    // Load section-specific data
    if (sectionId === 'services') {
        renderServices();
    } else if (sectionId === 'contractors') {
        renderContractors();
    } else if (sectionId === 'laborers') {
        renderLaborers();
    } else if (sectionId === 'portfolio') {
        renderProjects();
    }
}

function setupEventListeners() {
    // Service filters
    const serviceFilters = document.querySelectorAll('.filter-btn');
    serviceFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            serviceFilters.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterServices(category);
        });
    });
    
    // Contractor filters
    const specialtyFilter = document.getElementById('specialtyFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', function() {
            filterContractors();
        });
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', function() {
            filterContractors();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// API functions
async function fetchData(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
    }
}

async function loadAllData() {
    try {
        const [servicesData, contractorsData, laborersData, projectsData] = await Promise.all([
            fetchData('services'),
            fetchData('contractors'),
            fetchData('laborers'),
            fetchData('projects')
        ]);
        
        services = servicesData;
        contractors = contractorsData;
        laborers = laborersData;
        projects = projectsData;
        
        // Populate filter options
        populateFilters();
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function populateFilters() {
    // Populate specialty filter
    const specialtyFilter = document.getElementById('specialtyFilter');
    if (specialtyFilter && contractors.length > 0) {
        const specialties = [...new Set(contractors.map(c => c.specialty))];
        specialties.forEach(specialty => {
            const option = document.createElement('option');
            option.value = specialty;
            option.textContent = specialty;
            specialtyFilter.appendChild(option);
        });
    }
    
    // Populate location filter
    const locationFilter = document.getElementById('locationFilter');
    if (locationFilter && contractors.length > 0) {
        const locations = [...new Set(contractors.map(c => c.location))];
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    }
}

// Render functions
function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    if (services.length === 0) {
        servicesGrid.innerHTML = '<div class="loading">Loading services...</div>';
        return;
    }
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card" data-category="${service.category}">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-price">Starting at $${parseFloat(service.startingPrice).toLocaleString()}</div>
        </div>
    `).join('');
}

function renderContractors() {
    const contractorsGrid = document.getElementById('contractorsGrid');
    if (!contractorsGrid) return;
    
    if (contractors.length === 0) {
        contractorsGrid.innerHTML = '<div class="loading">Loading contractors...</div>';
        return;
    }
    
    contractorsGrid.innerHTML = contractors.map(contractor => `
        <div class="contractor-card" onclick="showContractorDetails(${contractor.id})">
            <div class="contractor-header">
                <img src="${contractor.profileImage || '/api/placeholder/60/60'}" alt="${contractor.name}" class="contractor-avatar">
                <div class="contractor-info">
                    <h3>${contractor.name}</h3>
                    <div class="contractor-specialty">${contractor.specialty}</div>
                </div>
            </div>
            <div class="contractor-details">
                <p><strong>Experience:</strong> ${contractor.experience}</p>
                <p><strong>Location:</strong> ${contractor.location}</p>
                <p>${contractor.description}</p>
            </div>
            <div class="contractor-meta">
                <div class="contractor-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(parseFloat(contractor.rating)))}</span>
                    <span>${contractor.rating} (${contractor.reviewCount} reviews)</span>
                </div>
                <div class="contractor-badges">
                    ${contractor.isLicensed ? '<span class="badge badge-licensed">Licensed</span>' : ''}
                    ${contractor.isInsured ? '<span class="badge badge-insured">Insured</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderLaborers() {
    const laborersGrid = document.getElementById('laborersGrid');
    if (!laborersGrid) return;
    
    if (laborers.length === 0) {
        laborersGrid.innerHTML = '<div class="loading">Loading laborers...</div>';
        return;
    }
    
    laborersGrid.innerHTML = laborers.map(laborer => `
        <div class="laborer-card">
            <img src="${laborer.profileImage || '/api/placeholder/80/80'}" alt="${laborer.name}" class="laborer-avatar">
            <div class="laborer-name">${laborer.name}</div>
            <div class="laborer-specialty">${laborer.specialty}</div>
            <div class="laborer-rate">$${parseFloat(laborer.hourlyRate).toFixed(2)}/hour</div>
            <div class="contractor-rating">
                <span class="rating-stars">${'★'.repeat(Math.floor(parseFloat(laborer.rating)))}</span>
                <span>${laborer.rating} (${laborer.reviewCount} reviews)</span>
            </div>
            <div class="availability-status ${laborer.isAvailable ? 'status-available' : 'status-busy'}">
                ${laborer.isAvailable ? 'Available' : 'Busy'}
            </div>
        </div>
    `).join('');
}

function renderProjects() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    if (projects.length === 0) {
        portfolioGrid.innerHTML = '<div class="loading">Loading projects...</div>';
        return;
    }
    
    portfolioGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image || '/api/placeholder/350/200'}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-category">${project.category}</div>
                <p class="project-description">${project.description}</p>
                <div class="project-footer">
                    <div class="project-contractor">By ${project.contractorName}</div>
                    <div class="project-year">${project.completionYear}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter functions
function filterServices(category) {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterContractors() {
    const specialtyFilter = document.getElementById('specialtyFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (!specialtyFilter || !locationFilter) return;
    
    const selectedSpecialty = specialtyFilter.value;
    const selectedLocation = locationFilter.value;
    
    let filteredContractors = contractors;
    
    if (selectedSpecialty !== 'all') {
        filteredContractors = filteredContractors.filter(c => c.specialty === selectedSpecialty);
    }
    
    if (selectedLocation !== 'all') {
        filteredContractors = filteredContractors.filter(c => c.location === selectedLocation);
    }
    
    // Re-render with filtered data
    const contractorsGrid = document.getElementById('contractorsGrid');
    if (contractorsGrid) {
        contractorsGrid.innerHTML = filteredContractors.map(contractor => `
            <div class="contractor-card" onclick="showContractorDetails(${contractor.id})">
                <div class="contractor-header">
                    <img src="${contractor.profileImage || '/api/placeholder/60/60'}" alt="${contractor.name}" class="contractor-avatar">
                    <div class="contractor-info">
                        <h3>${contractor.name}</h3>
                        <div class="contractor-specialty">${contractor.specialty}</div>
                    </div>
                </div>
                <div class="contractor-details">
                    <p><strong>Experience:</strong> ${contractor.experience}</p>
                    <p><strong>Location:</strong> ${contractor.location}</p>
                    <p>${contractor.description}</p>
                </div>
                <div class="contractor-meta">
                    <div class="contractor-rating">
                        <span class="rating-stars">${'★'.repeat(Math.floor(parseFloat(contractor.rating)))}</span>
                        <span>${contractor.rating} (${contractor.reviewCount} reviews)</span>
                    </div>
                    <div class="contractor-badges">
                        ${contractor.isLicensed ? '<span class="badge badge-licensed">Licensed</span>' : ''}
                        ${contractor.isInsured ? '<span class="badge badge-insured">Insured</span>' : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Modal functions
function showContractorDetails(contractorId) {
    const contractor = contractors.find(c => c.id === contractorId);
    if (!contractor) return;
    
    modalBody.innerHTML = `
        <div class="contractor-modal">
            <div class="contractor-header">
                <img src="${contractor.profileImage || '/api/placeholder/100/100'}" alt="${contractor.name}" class="contractor-avatar" style="width: 100px; height: 100px;">
                <div class="contractor-info">
                    <h2>${contractor.name}</h2>
                    <div class="contractor-specialty">${contractor.specialty}</div>
                    <div class="contractor-rating">
                        <span class="rating-stars">${'★'.repeat(Math.floor(parseFloat(contractor.rating)))}</span>
                        <span>${contractor.rating} (${contractor.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>
            <div class="contractor-details" style="margin-top: 2rem;">
                <p><strong>Experience:</strong> ${contractor.experience}</p>
                <p><strong>Location:</strong> ${contractor.location}</p>
                <p><strong>Email:</strong> ${contractor.email}</p>
                <p><strong>Phone:</strong> ${contractor.phone}</p>
                <p><strong>Description:</strong> ${contractor.description}</p>
                <div class="contractor-badges" style="margin-top: 1rem;">
                    ${contractor.isLicensed ? '<span class="badge badge-licensed">Licensed</span>' : ''}
                    ${contractor.isInsured ? '<span class="badge badge-insured">Insured</span>' : ''}
                </div>
            </div>
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="contactContractor('${contractor.email}')">Contact Contractor</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function contactContractor(email) {
    window.location.href = `mailto:${email}`;
    modal.style.display = 'none';
}

// Form handling
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            alert('Thank you for your message! We will get back to you soon.');
            e.target.reset();
        } else {
            alert('Sorry, there was an error sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatRating(rating) {
    return parseFloat(rating).toFixed(1);
}

// Make functions globally available
window.showSection = showSection;
window.showContractorDetails = showContractorDetails;
window.contactContractor = contactContractor;