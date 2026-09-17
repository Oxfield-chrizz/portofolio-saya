// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
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
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = progress + '%';
});

// ========================================
// BACK TO TOP
// ========================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
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
        if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, isDeleting ? 1500 : 800);
    }
}

// ========================================
// ANIMATE STATS COUNTER (DIPERBAIKI)
// ========================================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    console.log('📊 Stats ditemukan:', stats.length);

    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isDecimal = stat.getAttribute('data-decimal') === 'true';
        if (isNaN(target)) return;

        let current = 0;
        const steps = 60;
        const increment = target / steps;
        const stepTime = 1500 / steps;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = isDecimal ? target.toFixed(2) : Math.round(target);
                clearInterval(counter);
            } else {
                stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
        }, stepTime);
    });
}

// ========================================
// INTERSECTION OBSERVER - STATS
// ========================================
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('✅ About section terlihat, jalankan animateStats()');
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    aboutObserver.observe(aboutSection);
}

// ========================================
// INTERSECTION OBSERVER - SKILL BARS
// ========================================
document.querySelectorAll('.skill-group').forEach(group => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach((fill, index) => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(group);
});

// ========================================
// PROJECTS DATA (GAMBAR OTOMATIS DARI ONLINE)
// ========================================
const projects = [
    {
        title: 'Fiber to the Home (FTTH) Mapping',
        description: 'Membangun simulasi jaringan FTTH menggunakan OLT ke ODC, dari ODC ke ODP, dan dari ODP ke rumah pelanggan.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop',
        icon: 'fa-solid fa-network-wired',
        technologies: ['OLT', 'ODC', 'ODP', 'ONT/ONU']
    },
    {
        title: 'Instalasi Jaringan Hotspot Area Publik',
        description: 'Proyek akhir semester: Membangun jaringan hotspot dengan user management menggunakan MikroTik.',
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=500&fit=crop',
        icon: 'fa-solid fa-wifi',
        technologies: ['MikroTik', 'Hotspot', 'User Manager']
    },
    {
        title: 'Perakitan & Troubleshooting PC',
        description: 'Praktikum merakit PC dari nol hingga troubleshooting masalah hardware dan software.',
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=500&fit=crop',
        icon: 'fa-solid fa-microchip',
        technologies: ['Hardware', 'Windows', 'Driver Installation']
    },
    {
        title: 'Kabeling Jaringan (Crimping & Testing)',
        description: 'Praktikum pembuatan kabel straight, cross, dan rollover serta testing menggunakan LAN tester.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
        icon: 'fa-solid fa-plug',
        technologies: ['UTP Cable', 'Crimping', 'Network Testing']
    }
];

// ========================================
// LOAD PROJECTS (DENGAN GAMBAR ONLINE)
// ========================================
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image-wrapper">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="project-image" 
                     loading="lazy"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                <div class="project-image-fallback" style="display:none;">
                    <i class="${project.icon}"></i>
                </div>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(t => `<span>${t}</span>`).join('')}
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
        id: 'tka',
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
        id: 'fiber',
        title: 'Jointer Fiber Optic',
        description: 'Pelatihan Splicing Fiber Optic & Konfigurasi GPON/EPON - FTTH',
        status: 'Certified',
        image: 'sertifikat/Sertifikat pelatihan Axelbit.jpg',
        download: 'sertifikat/sertifikat-Training_Fiber_Optik_Surabaya_Batch_II-529.pdf',
        icon: 'fa-solid fa-shield-halved'
    },
    {
        id: 'bnsp-ftth',
        title: 'BNSP - FTTH',
        description: 'Jointer Fiber Optic - FTTH',
        status: 'Segera Tersedia',
        image: 'sertifikat/Proses.jpg',
        download: '#',
        icon: 'fa-solid fa-clock'
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

        let statusBadge = '';
        if (cert.status === 'Certified') {
            statusBadge = '<span class="status certified"><i class="fas fa-check-circle"></i> Certified</span>';
        } else if (cert.status === 'Segera Tersedia') {
            statusBadge = '<span class="status segera-tersedia"><i class="fas fa-clock"></i> Segera Tersedia</span>';
        } else {
            statusBadge = '<span class="status in-progress"><i class="fas fa-spinner fa-spin"></i> In Progress</span>';
        }

        const downloadBtn = (cert.status === 'Certified' && cert.download !== '#')
            ? `<a href="${cert.download}" download class="btn-download">
                   <i class="fas fa-download"></i> Download
               </a>`
            : '';

        card.innerHTML = `
            <div class="cert-image-wrapper">
                <img src="${cert.image}" alt="${cert.title}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23e2e8f0%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%2394a3b8%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${cert.title}%3C/text%3E%3C/svg%3E'" />
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

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        modal.querySelector('.btn-close-modal').addEventListener('click', closeModal);
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
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
// CONTACT FORM (FormSubmit.co)
// ========================================
// Form akan dikirim langsung oleh FormSubmit.co ke email
// JavaScript hanya untuk notifikasi bahwa pesan terkirim

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Validasi manual sebelum dikirim
        const name = this.querySelector('input[name="Nama"]').value.trim();
        const email = this.querySelector('input[name="Email"]').value.trim();
        const company = this.querySelector('input[name="Perusahaan"]').value.trim();
        const topic = this.querySelector('select[name="Topik"]').value;
        const message = this.querySelector('textarea[name="Pesan"]').value.trim();

        // Jika ada field kosong, cegah submit
        if (!name || !email || !company || !topic || !message) {
            e.preventDefault();
            alert('⚠️ Mohon lengkapi semua field yang diperlukan!');
            return;
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('⚠️ Mohon masukkan alamat email yang valid!');
            return;
        }

        // Tampilkan notifikasi loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        // Tampilkan pesan sukses sebelum redirect
        console.log('📧 Mengirim pesan ke email...');

        // Form akan otomatis submit oleh FormSubmit.co
        // Tidak perlu e.preventDefault() karena kita ingin form dikirim
        
        // Reset button setelah 3 detik jika ada masalah
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

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
            if (window.scrollY >= top) current = section.getAttribute('id');
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