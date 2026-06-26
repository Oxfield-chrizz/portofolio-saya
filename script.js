// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling
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

// WhatsApp Configuration
// GANTI DENGAN NOMOR WHATSAPP ANDA
const whatsappNumber = '6281252285123';

function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
}

// WhatsApp buttons
const whatsappButton = document.getElementById('whatsappButton');
if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        const message = 'Halo, saya melihat portofolio Anda sebagai fresh graduate SMK TKJ. Apakah ada peluang kerja/magang?';
        openWhatsApp(message);
    });
}

const floatingWhatsapp = document.getElementById('floatingWhatsapp');
if (floatingWhatsapp) {
    floatingWhatsapp.addEventListener('click', (e) => {
        e.preventDefault();
        const message = 'Halo Christian, saya tertarik dengan profil Anda. Bisa diskusi lebih lanjut?';
        openWhatsApp(message);
    });
}

// Projects Data (Proyek selama SMK)
const projects = [
    {
        title: "Simulasi Jaringan Kantor dengan MikroTik",
        description: "Membangun simulasi jaringan kantor dengan 3 divisi menggunakan router MikroTik dan switch manageable.",
        technologies: ["MikroTik", "VLAN", "DHCP Server", "NAT"]
    },
    {
        title: "Instalasi Jaringan Hotspot Area Publik",
        description: "Proyek akhir semester: Membangun jaringan hotspot dengan user management menggunakan MikroTik.",
        technologies: ["MikroTik", "Hotspot", "User Manager"]
    },
    {
        title: "Perakitan & Troubleshooting PC",
        description: "Praktikum merakit PC dari nol hingga troubleshooting masalah hardware dan software.",
        technologies: ["Hardware", "Windows", "Driver Installation"]
    },
    {
        title: "Instalasi Server Debian",
        description: "Menginstall dan mengkonfigurasi server Debian untuk layanan DNS, DHCP, dan Web Server.",
        technologies: ["Debian Linux", "DNS Server", "Apache2"]
    },
    {
        title: "Kabeling Jaringan (Crimping & Testing)",
        description: "Praktikum pembuatan kabel straight, cross, dan rollover serta testing menggunakan LAN tester.",
        technologies: ["UTP Cable", "Crimping", "Network Testing"]
    },
];

// Load projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="fas fa-network-wired"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[placeholder="Nama Lengkap"]').value;
        const email = this.querySelector('input[placeholder="Email"]').value;
        const company = this.querySelector('input[placeholder="Perusahaan/Instansi"]').value;
        const topic = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && company && topic && message) {
            const sendViaWA = confirm(`Halo ${name}, terima kasih atas pesannya! Apakah Anda ingin mengirim via WhatsApp untuk respon lebih cepat?`);
            
            if (sendViaWA) {
                const waMessage = `Halo Andika, saya ${name} dari ${company}%0AEmail: ${email}%0A%0A*Topik: ${topic}*%0A%0A${message}`;
                openWhatsApp(waMessage);
            } else {
                alert(`Terima kasih ${name}! Pesan Anda akan saya balas dalam 1x24 jam.`);
            }
            this.reset();
        } else {
            alert('Mohon lengkapi semua field yang diperlukan!');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(30, 60, 114, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }
});

// Animate skill bars
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelectorAll('.skill-progress');
            skillProgress.forEach(progress => {
                const width = progress.style.width;
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Animate elements on scroll
const fadeInElements = document.querySelectorAll('.edu-card, .cert-card, .intern-card, .project-card, .skill-category, .soft-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    fadeObserver.observe(el);
});

// Hero animation
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            heroText.style.transition = 'all 0.8s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
        }, 100);
    }
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(30px)';
        setTimeout(() => {
            heroImage.style.transition = 'all 0.8s ease';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 300);
    }

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    // Cek preferensi yang tersimpan
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    } else {
        // Cek preferensi sistem (opsional)
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Event klik tombol
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Mencegah event bubbling
        document.body.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        this.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Animasi kecil
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Reset tombol jika ada error (debug)
console.log('Dark mode toggle siap digunakan!');

});