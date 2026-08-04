// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// PROGRESS BAR
// ========================================
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});

// ========================================
// BACK TO TOP
// ========================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// TYPING EFFECT
// ========================================
const roles = ['Network Engineer', 'IT Support Specialist', 'Fresh Graduate TKJ'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeRole() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];
    
    if (!isDeleting && charIndex <= currentRole.length) {
        typingElement.textContent = currentRole.substring(0, charIndex);
        charIndex++;
        setTimeout(typeRole, 80);
    } else if (isDeleting && charIndex > 0) {
        typingElement.textContent = currentRole.substring(0, charIndex);
        charIndex--;
        setTimeout(typeRole, 40);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typeRole, isDeleting ? 1500 : 800);
    }
}

// ========================================
// ANIMATE STATS COUNTER
// ========================================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = current.toFixed(1);
            }
        }, stepTime);
    });
}

// ========================================
// INTERSECTION OBSERVER - STATS
// ========================================
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            aboutObserver.unobserve(entry.target);
        }
    });
});

const aboutSection = document.querySelector('.about');
if (aboutSection) aboutObserver.observe(aboutSection);

// ========================================
// INTERSECTION OBSERVER - SKILL BARS
// ========================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 200);
            });
        }
    });
});

document.querySelectorAll('.skill-group').forEach(group => {
    skillObserver.observe(group);
});

// ========================================
// PROJECTS DATA
// ========================================
const projects = [
    {
        title: 'Fiber to the Home (FTTH) Mapping',
        description: 'Membangun simulasi jaringan FTTH menggunakan OLT ke ODC, dari ODC ke ODP, dan dari ODP ke rumah pelanggab.',
        technologies: ['OLT', 'ODC', 'ODP', 'ONT/ONU']
    },
    {
        title: 'Instalasi Jaringan Hotspot Area Publik',
        description: 'Proyek akhir semester: Membangun jaringan hotspot dengan user management menggunakan MikroTik.',
        technologies: ['MikroTik', 'Hotspot', 'User Manager']
    },
    {
        title: 'Perakitan & Troubleshooting PC',
        description: 'Praktikum merakit PC dari nol hingga troubleshooting masalah hardware dan software.',
        technologies: ['Hardware', 'Windows', 'Driver Installation']
    },
    {
        title: 'Instalasi Server Debian',
        description: 'Menginstall dan mengkonfigurasi server Debian untuk layanan DNS, DHCP, dan Web Server.',
        technologies: ['Debian Linux', 'DNS Server', 'Apache2']
    },
    {
        title: 'Kabeling Jaringan (Crimping & Testing)',
        description: 'Praktikum pembuatan kabel straight, cross, dan rollover serta testing menggunakan LAN tester.',
        technologies: ['UTP Cable', 'Crimping', 'Network Testing']
    }
];

// ========================================
// LOAD PROJECTS
// ========================================
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image">
                <i class="fas fa-code"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========================================
// CERTIFICATES DATA
// ========================================
const certificates = [
    {
        id: 'ukk',
        title: 'UKK',
        description: 'Network Device Installation and Configuration',
        status: 'Certified',
        image: 'sertifikat/UKK.jpg',
        download: 'sertifikat/Sertifikat UKK.pdf',
        icon: 'fa-solid fa-certificate'
    },
    {
        id: 'bnsp',
        title: 'BNSP',
        description: 'Sertifikasi Kompetensi Teknik Jaringan Komputer',
        status: 'Certified',
        image: 'sertifikat/BNSP.jpg',
        download: 'sertifikat/BNSP.pdf',
        icon: 'fa-solid fa-award'
    },
    {
        id: 'shtka',
        title: 'SHTKA',
        description: 'Tes Kemampuan Akademik',
        status: 'Certified',
        image: 'sertifikat/TKA.jpg',
        download: 'sertifikat/TKA.pdf',
        icon: 'fa-solid fa-graduation-cap'
    },
    {
        id: 'pkl',
        title: 'Praktik Kerja Lapangan',
        description: 'PT. Indo Bismar',
        status: 'Certified',
        image: 'sertifikat/Sertifikat PKL.jpg',
        download: 'sertifikat/Sertifikat PKL.pdf',
        icon: 'fa-solid fa-briefcase'
    },
    {
        id: 'Pelatihan Jointer Fiber Optik',
        title: 'Jointer Fiber Optic',
        description: 'Pelatihan Splicing Fiber Optic and Konfigurasi GPON and EPON - Fiber to the Home(FTTH)',
        status: 'Certified',
        image: 'sertifikat/Sertifikat pelatihan Axelbit.jpg',
        download: 'sertifikat/sertifikat-Training_Fiber_Optik_Surabaya_Batch_II-529.pdf',
        icon: 'fa-solid fa-shield-halved'
    },
    {
        id: 'bnsp',
        title: 'BNSP',
        description: 'Jointer Fiber Optic - FTTH',
        status: 'Segera Tersedia',
        image: 'sertifikat/coming soon.jpg',
        download: 'sertifikat/.pdf',
        icon: 'fa-solid fa-cloud'
    }
];

// ========================================
// LOAD CERTIFICATES
// ========================================
function loadCertificates() {
    const grid = document.getElementById('certsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    certificates.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.setAttribute('data-id', cert.id);
        
        const statusBadge = cert.status === 'Certified' 
            ? '<span class="status certified"><i class="fas fa-check-circle"></i> Certified</span>'
            : '<span class="status in-progress"><i class="fas fa-spinner fa-spin"></i> In Progress</span>';
        
        const downloadBtn = cert.status === 'Certified'
            ? `<a href="${cert.download}" download class="btn-download">
                    <i class="fas fa-download"></i> Download
               </a>`
            : '';
        
        card.innerHTML = `
            <div class="cert-image-wrapper">
                <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
                <div class="cert-overlay">
                    <i class="fas fa-search-plus"></i>
                    <span>Klik untuk lihat</span>
                </div>
            </div>
            <div class="cert-body">
                <div class="cert-header">
                    <div class="cert-icon"><i class="${cert.icon}"></i></div>
                    <h3>${cert.title}</h3>
                </div>
                <p>${cert.description}</p>
                <div class="cert-footer">
                    ${statusBadge}
                    ${downloadBtn}
                </div>
            </div>
        `;
        
        // Click to preview
        const wrapper = card.querySelector('.cert-image-wrapper');
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            openImagePreview(img.src, cert.title, cert.download);
        });
        
        grid.appendChild(card);
    });
}

// ========================================
// IMAGE PREVIEW MODAL
// ========================================
function openImagePreview(src, title, downloadLink) {
    let modal = document.getElementById('imageModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3 class="modal-title"></h3>
                <img src="" alt="Preview" class="modal-image" />
                <div class="modal-actions">
                    <a href="#" class="btn-download-modal" download>
                        <i class="fas fa-download"></i> Download Sertifikat
                    </a>
                    <button class="btn-close-modal">Tutup</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const closeModalBtn = modal.querySelector('.btn-close-modal');
        
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }
    
    const img = modal.querySelector('.modal-image');
    const titleEl = modal.querySelector('.modal-title');
    const downloadBtn = modal.querySelector('.btn-download-modal');
    
    img.src = src;
    titleEl.textContent = title;
    
    if (downloadLink && downloadLink !== '#') {
        downloadBtn.href = downloadLink;
        downloadBtn.style.display = 'inline-flex';
    } else {
        downloadBtn.style.display = 'none';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========================================
// WHATSAPP
// ========================================
const whatsappNumber = '6281252285123';

function openWhatsApp(message) {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
}

document.getElementById('whatsappButton')?.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp('Halo, saya melihat portofolio Anda sebagai fresh graduate SMK TKJ. Apakah ada peluang kerja/magang?');
});

document.getElementById('floatingWhatsapp')?.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp('Halo Christian, saya tertarik dengan profil Anda. Bisa diskusi lebih lanjut?');
});

// ========================================
// CONTACT FORM
// ========================================
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[placeholder="Nama Lengkap"]').value;
    const email = this.querySelector('input[placeholder="Email"]').value;
    const company = this.querySelector('input[placeholder="Perusahaan / Instansi"]').value;
    const topic = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    if (name && email && company && topic && message) {
        const sendWA = confirm(`Halo ${name}, terima kasih! Kirim via WhatsApp untuk respon lebih cepat?`);
        if (sendWA) {
            const waMsg = `Halo, saya ${name} dari ${company}%0AEmail: ${email}%0A%0A*Topik: ${topic}*%0A%0A${message}`;
            openWhatsApp(waMsg);
        } else {
            alert(`Terima kasih ${name}! Pesan akan dibalas dalam 1x24 jam.`);
        }
        this.reset();
    } else {
        alert('Mohon lengkapi semua field!');
    }
});

// ========================================
// DARK MODE TOGGLE
// ========================================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ========================================
// DOWNLOAD CV
// ========================================
document.getElementById('downloadCV')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('🚀 File CV akan segera tersedia!');
});

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadCertificates();
    setTimeout(typeRole, 1000);
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.theme-btn)');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

console.log('🚀 Portofolio Christian Deni Saputra siap!');