// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// View project detail function
async function viewProjectDetail(projectId) {
    try {
        const response = await fetch(`/api/projects/${projectId}`);
        const project = await response.json();
        
        // Create project detail modal content
        const modalContent = `
            <div style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                <h2>${project.title}</h2>
                <p style="color: #666; margin-bottom: 2rem;">${project.description}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h3 style="color: #2c3e50; margin-bottom: 1rem; border-bottom: 2px solid #e74c3c; padding-bottom: 0.5rem;">Project Overview</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <p><strong>Category:</strong> ${project.category}</p>
                                <p><strong>Size:</strong> ${project.size}</p>
                                <p><strong>Location:</strong> ${project.location}</p>
                                <p><strong>Budget:</strong> ${project.budget}</p>
                            </div>
                            <div>
                                <p><strong>Status:</strong> 
                                    <span style="background: ${project.status === 'completed' ? '#27ae60' : project.status === 'in-progress' ? '#f39c12' : '#3498db'}; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">
                                        ${project.status.replace('-', ' ').toUpperCase()}
                                    </span>
                                </p>
                                <p><strong>Progress:</strong> ${project.progress}%</p>
                                <p><strong>Start Date:</strong> ${project.start_date}</p>
                                <p><strong>Expected Completion:</strong> ${project.expected_completion}</p>
                            </div>
                        </div>
                        
                        <h3 style="color: #2c3e50; margin: 2rem 0 1rem; border-bottom: 2px solid #e74c3c; padding-bottom: 0.5rem;">Progress Tracking</h3>
                        <div style="background: #f0f0f0; height: 8px; border-radius: 4px; overflow: hidden; margin: 0.5rem 0;">
                            <div style="height: 100%; background: linear-gradient(90deg, #e74c3c, #f39c12); border-radius: 4px; width: ${project.progress}%;"></div>
                        </div>
                        <p style="text-align: center; color: #666; font-size: 0.9rem;">${project.progress}% Complete</p>
                    </div>
                    
                    <div>
                        <h3 style="color: #2c3e50; margin-bottom: 1rem; border-bottom: 2px solid #e74c3c; padding-bottom: 0.5rem;">Client Information</h3>
                        <p><strong>Name:</strong> ${project.client_name}</p>
                        <p><strong>Email:</strong> ${project.client_email}</p>
                        <p><strong>Phone:</strong> ${project.client_phone}</p>
                        
                        <h3 style="color: #2c3e50; margin: 2rem 0 1rem; border-bottom: 2px solid #e74c3c; padding-bottom: 0.5rem;">Contractor</h3>
                        ${project.contractor ? `
                            <p><strong>Name:</strong> ${project.contractor.name}</p>
                            <p><strong>Email:</strong> ${project.contractor.email}</p>
                            <p><strong>Phone:</strong> ${project.contractor.phone}</p>
                            <p><strong>Rating:</strong> ${project.contractor.rating}/5</p>
                        ` : '<p>No contractor assigned</p>'}
                        
                        <h3 style="color: #2c3e50; margin: 2rem 0 1rem; border-bottom: 2px solid #e74c3c; padding-bottom: 0.5rem;">Team Members (${project.assigned_workers_detail ? project.assigned_workers_detail.length : 0})</h3>
                        ${project.assigned_workers_detail && project.assigned_workers_detail.length > 0 ? 
                            project.assigned_workers_detail.map(worker => `
                                <div style="background: #f8f9fa; padding: 1rem; margin: 1rem 0; border-radius: 5px;">
                                    <h4>${worker.name}</h4>
                                    <p><strong>Specialties:</strong> ${worker.specialties.join(', ')}</p>
                                    <p><strong>Experience:</strong> ${worker.experience_years} years</p>
                                    <p><strong>Rate:</strong> $${worker.hourly_rate}/hour</p>
                                </div>
                            `).join('') : '<p>No workers assigned</p>'
                        }
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button onclick="window.open('projects.html', '_blank')" style="background: #e74c3c; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 5px; cursor: pointer; font-weight: 600; margin-right: 1rem;">
                        View All Projects
                    </button>
                    <button onclick="closeModal('projectDetailModal')" style="background: transparent; color: #e74c3c; border: 2px solid #e74c3c; padding: 0.75rem 1.5rem; border-radius: 5px; cursor: pointer; font-weight: 600;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        // Create and show modal
        const modal = document.createElement('div');
        modal.id = 'projectDetailModal';
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeModal('projectDetailModal')">&times;</span>
                ${modalContent}
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
    } catch (error) {
        console.error('Error loading project details:', error);
        alert('Failed to load project details');
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const data = {
                firstName: contactForm.querySelector('input[placeholder="First Name"]').value,
                lastName: contactForm.querySelector('input[placeholder="Last Name"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                phone: contactForm.querySelector('input[type="tel"]').value,
                reason: contactForm.querySelector('select').value,
                subject: contactForm.querySelector('input[placeholder="Subject"]').value,
                message: contactForm.querySelector('textarea').value,
                agreed: contactForm.querySelector('input[type="checkbox"]').checked
            };
            
            // Validate form
            if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.reason || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!data.agreed) {
                alert('Please agree to receive communications from BuildPro Connect.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            }
            e.target.value = value;
        });
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function(e) {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                e.target.style.borderColor = '#e74c3c';
                e.target.setAttribute('title', 'Please enter a valid email address');
            } else {
                e.target.style.borderColor = '#e9ecef';
                e.target.removeAttribute('title');
            }
        });
    });
});

// Original contact form handling (for backward compatibility)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm && !contactForm.querySelector('input[placeholder="First Name"]')) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Message sent successfully! We will get back to you soon.');
                    this.reset();
                } else {
                    alert('Error sending message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending message. Please try again.');
            }
        });
    }
});

// Quote form submission
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        phone: this.querySelector('input[type="tel"]').value,
        serviceType: this.querySelector('select').value,
        description: this.querySelector('textarea').value,
        budget: this.querySelector('input[placeholder*="Budget"]').value
    };

    try {
        const response = await fetch('/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Quote request submitted successfully! We will contact you within 24 hours.');
            this.reset();
            closeModal('quoteModal');
        } else {
            alert('Error submitting quote request. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting quote request. Please try again.');
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .project-card, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project card click handlers
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('h3').textContent;
            alert(`Viewing details for: ${projectTitle}\n\nThis would open a detailed project page in a real implementation.`);
        });
    });
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Add validation to forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
});

// Loading animation
function showLoading(element) {
    element.innerHTML = '<div class="loading">Loading...</div>';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Enhanced form submission with loading states
document.addEventListener('DOMContentLoaded', () => {
    const submitButtons = document.querySelectorAll('form button[type="submit"]');
    
    submitButtons.forEach(button => {
        const originalText = button.textContent;
        
        button.addEventListener('click', () => {
            if (button.form && validateForm(button.form)) {
                showLoading(button);
                
                // Simulate form submission delay
                setTimeout(() => {
                    hideLoading(button, originalText);
                }, 2000);
            }
        });
    });
});

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Preloader
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <i class="fas fa-hammer"></i>
            <h3>BuildPro Connect</h3>
            <div class="loading-bar"></div>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const preloaderContent = preloader.querySelector('.preloader-content');
    preloaderContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const icon = preloader.querySelector('i');
    icon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: hammer 1s infinite;
    `;
    
    const title = preloader.querySelector('h3');
    title.style.cssText = `
        font-size: 1.5rem;
        margin-bottom: 2rem;
    `;
    
    const loadingBar = preloader.querySelector('.loading-bar');
    loadingBar.style.cssText = `
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        overflow: hidden;
        position: relative;
    `;
    
    const loadingProgress = document.createElement('div');
    loadingProgress.style.cssText = `
        width: 0%;
        height: 100%;
        background: white;
        border-radius: 2px;
        transition: width 0.3s ease;
    `;
    loadingBar.appendChild(loadingProgress);
    
    document.body.appendChild(preloader);
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes hammer {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(15deg); }
    }
    
    .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #e74c3c;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize preloader
window.addEventListener('load', createPreloader); 