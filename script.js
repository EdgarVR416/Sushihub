document.addEventListener('DOMContentLoaded', function() {
    
    initMobileMenu();
    initFAQ();
    initGameFiltering();
    initScrollProgress();
    initTypingAnimation();
    initSmoothScroll();
    initCurrencyTabs();
    initCustomCursor();
    initParticleSystem();
    initScrollReveal();
    initTiltEffect();
    initProgressBars();
    initEnhancedTyping();
    initSmoothTransitions();
    
    console.log('SushiHub website loaded successfully!');
});

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
}

function initFAQ() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const content = faqItem.querySelector('.faq-content');
            const icon = this.querySelector('i');
            
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherItem = otherToggle.closest('.faq-item');
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherToggle.querySelector('i');
                    
                    otherContent.classList.remove('show');
                    otherToggle.classList.remove('active');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            content.classList.toggle('show');
            this.classList.toggle('active');
            
            if (icon) {
                if (content.classList.contains('show')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

function initGameFiltering() {
    const gameCards = document.querySelectorAll('.game-card');
    const gameSearch = document.getElementById('gameSearch');
    
    if (gameSearch) {
        gameSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            gameCards.forEach(card => {
                const gameTitle = card.querySelector('h3').textContent.toLowerCase();
                const gameDesc = card.querySelector('p').textContent.toLowerCase();
                const gameCategory = card.getAttribute('data-category') || '';
                
                let searchMatch = searchTerm === '' || 
                                 gameTitle.includes(searchTerm) || 
                                 gameDesc.includes(searchTerm) ||
                                 gameCategory.includes(searchTerm);
                
                if (searchMatch) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            const visibleCards = Array.from(gameCards).filter(card => 
                card.style.display !== 'none'
            );
            
            const gamesContainer = document.querySelector('#games .advanced-grid');
            let noResultsMsg = document.getElementById('no-results-message');
            
            if (visibleCards.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'no-results-message';
                    noResultsMsg.className = 'col-span-full text-center py-12';
                    noResultsMsg.innerHTML = `
                        <div class="text-gray-400">
                            <i class="fas fa-search text-4xl mb-4"></i>
                            <p class="text-xl">No games found matching "${searchTerm}"</p>
                            <p class="text-sm mt-2">Try searching for different keywords</p>
                        </div>
                    `;
                    gamesContainer.appendChild(noResultsMsg);
                } else {
                    noResultsMsg.querySelector('p').textContent = `No games found matching "${searchTerm}"`;
                    noResultsMsg.style.display = 'block';
                }
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });

        gameSearch.addEventListener('focus', function() {
            this.placeholder = 'Try: volleyball, combat, fishing, basketball...';
        });
        
        gameSearch.addEventListener('blur', function() {
            this.placeholder = 'Search games...';
        });
    }
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '3px solid #3b82f6';
        element.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 2000);
            }
        };
        
        setTimeout(typeWriter, 500);
    });
}

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-card, .game-card, .executor-card, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));
}

function showLoading(element) {
    if (element) {
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading';
        loadingSpinner.style.marginLeft = '10px';
        element.appendChild(loadingSpinner);
    }
}

function hideLoading(element) {
    if (element) {
        const spinner = element.querySelector('.loading');
        if (spinner) {
            spinner.remove();
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
    
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
}

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
});

window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
    }, 0);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    });
}

function initCurrencyTabs() {
    const currencyTabs = document.querySelectorAll('.currency-tab');
    const dailyPlan = document.querySelector('.daily-plan');
    const pricingCards = document.querySelectorAll('.pricing-card');
    const pricingGrid = document.querySelector('.pricing-grid');
    
    currencyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const currency = this.getAttribute('data-currency');
            
            pricingCards.forEach(card => {
                card.classList.add('currency-switch');
                setTimeout(() => {
                    card.classList.remove('currency-switch');
                }, 300);
            });
            
            currencyTabs.forEach(otherTab => {
                otherTab.classList.remove('active');
            });
            this.classList.add('active');
            
            const allPricing = document.querySelectorAll('.currency-pricing');
            allPricing.forEach(pricing => {
                pricing.classList.add('hidden');
            });
            
            setTimeout(() => {
                const activePricing = document.querySelectorAll(`.currency-pricing.${currency}`);
                activePricing.forEach(pricing => {
                    pricing.classList.remove('hidden');
                });
            }, 200);
            
            if (currency === 'brl') {
                dailyPlan.classList.remove('hidden');
                pricingGrid.classList.add('show-daily');
            } else {
                dailyPlan.classList.add('hidden');
                pricingGrid.classList.remove('show-daily');
            }
            
            trackEvent('currency_changed', { currency: currency });
        });
    });
}

function openPurchaseModal(planType) {
    const modal = document.getElementById('purchaseModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const activeCurrency = document.querySelector('.currency-tab.active').getAttribute('data-currency');
    let content = '';
    
    const planDetails = {
        weekly: {
            icon: 'fas fa-calendar-week',
            title: 'Weekly Plan',
            duration: '7 days access',
            prices: {
                robux: '500 Robux',
                brl: 'R$ 6',
                usd: '$1.75',
                boost: '1 Boost'
            },
            features: [
                'All supported games',
                'Premium scripts',
                'Discord support'
            ]
        },
        monthly: {
            icon: 'fas fa-calendar-alt',
            title: 'Monthly Plan',
            duration: '30 days access',
            prices: {
                robux: '700 Robux',
                brl: 'R$ 10',
                usd: '$3.00',
                boost: '2 Boosts'
            },
            features: [
                'All supported games',
                'Premium scripts',
                'Priority support',
                'Early access features'
            ]
        },
        lifetime: {
            icon: 'fas fa-infinity',
            title: 'Lifetime Plan',
            duration: 'Forever access',
            prices: {
                robux: '900 Robux',
                brl: 'R$ 12',
                usd: '$4.50',
                boost: '6 Boosts'
            },
            features: [
                'All supported games',
                'Premium scripts',
                'VIP support',
                'Exclusive features',
                'No recurring payments'
            ]
        },
        daily: {
            icon: 'fas fa-calendar-day',
            title: 'Daily Plan',
            duration: '24 hours access',
            prices: {
                brl: 'R$ 4'
            },
            features: [
                'All supported games',
                'Premium scripts',
                'Discord support'
            ]
        }
    };
    
    const plan = planDetails[planType];
    if (!plan) return;
    
    const price = plan.prices[activeCurrency] || 'Contact Support';
    const currencyName = {
        robux: 'Robux',
        brl: 'PIX (BRL)',
        usd: 'PayPal (USD)',
        boost: 'Discord Boost'
    }[activeCurrency];
    
    content = `
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="${plan.icon} text-2xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold mb-2">${plan.title}</h3>
            <div class="text-3xl font-bold text-gradient mb-2">${price}</div>
            <p class="text-gray-400">${plan.duration}</p>
            <div class="mt-2">
                <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Payment: ${currencyName}</span>
            </div>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 mb-6">
            <h4 class="font-semibold mb-3">What's included:</h4>
            <ul class="space-y-2 text-sm">
                ${plan.features.map(feature => `
                    <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>${feature}</li>
                `).join('')}
            </ul>
        </div>
        <p class="text-gray-400 mb-6 text-center">
            Click the button below to join our Discord server and complete your purchase securely.
        </p>
        <div class="flex flex-col gap-3">
            <a href="https://discord.com/invite/kKHztfCZdG" class="btn-primary text-center" target="_blank">
                <i class="fab fa-discord mr-2"></i>Join Discord to Purchase
            </a>
            <button onclick="closePurchaseModal()" class="btn-secondary text-center">
                Cancel
            </button>
        </div>
    `;
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    trackEvent('purchase_intent', { plan: planType, currency: activeCurrency });
}

function closePurchaseModal() {
    const modal = document.getElementById('purchaseModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('purchaseModal');
    if (e.target === modal) {
        closePurchaseModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePurchaseModal();
    }
});

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    const hoverElements = document.querySelectorAll('a, button, .card-hover, .tilt-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
}

function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        const colors = ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
    
    setInterval(createParticle, 2000);
    
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 1000);
    }
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-card');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

function initEnhancedTyping() {
    const typeElements = document.querySelectorAll('[data-type]');
    
    typeElements.forEach(element => {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 100;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    typingObserver.unobserve(entry.target);
                }
            });
        });
        
        typingObserver.observe(element);
    });
}

function initSmoothTransitions() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(59, 130, 246, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = e.clientX - 5 + 'px';
        ripple.style.top = e.clientY - 5 + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFAQ();
    initGameFiltering();
    initTypingAnimation();
    initScrollProgress();
    initCurrencyTabs();
    initCustomCursor();
    initParticleSystem();
    initScrollReveal();
    initTiltEffect();
    initProgressBars();
    initEnhancedTyping();
    initSmoothTransitions();
    
    document.body.classList.add('loaded');
    
    console.log('🍣 SushiHub website initialized with advanced features!');
});

window.SushiHub = {
    initMobileMenu,
    initFAQ,
    initGameFiltering,
    trackEvent,
    openPurchaseModal,
    closePurchaseModal,
    initCurrencyTabs
}; 