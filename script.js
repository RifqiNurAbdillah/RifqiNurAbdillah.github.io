document.getElementById("btn").addEventListener("click", function() {
  alert("Tombol diklik!");
});

(function(){
const slides = document.getElementById('slides');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
const dots = Array.from(document.querySelectorAll('.dot'));
const caption = document.getElementById('caption');


// teks/ caption per slide — edit sesuai kebutuhan
const captions = [
'Foto 1 — deskripsi singkat untuk gambar pertama.',
'Foto 2 — deskripsi singkat untuk gambar kedua.'
];


let idx = 0; // 0 atau 1


function goTo(i){
idx = (i + 2) % 2;
// slide transform karena slides width 200% dan tiap slide 50%
slides.style.transform = `translateX(${ -idx * 50 }%)`;
dots.forEach(d=>d.classList.toggle('active', Number(d.dataset.index) === idx));
caption.textContent = captions[idx];
}


prev.addEventListener('click', ()=>goTo(idx - 1));
next.addEventListener('click', ()=>goTo(idx + 1));
dots.forEach(d=>d.addEventListener('click', e=>goTo(Number(e.currentTarget.dataset.index))));


// Optional: keyboard control
document.addEventListener('keydown', e=>{
if(e.key === 'ArrowLeft') prev.click();
if(e.key === 'ArrowRight') next.click();
});


// init
goTo(0);
})();

const cards = document.querySelectorAll('.animate-card');

const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // animasi hanya sekali
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

cards.forEach(card => cardObserver.observe(card));

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('project-list');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-button');
    const filterBtn = document.getElementById('filter-button');
    const filterDropdown = document.getElementById('filter-dropdown');
    const currentFilterText = document.getElementById('current-filter-text');

    // Inisialisasi variabel filter
    let currentFilter = 'all';

    // --- Toggle Filter Dropdown ---
    if (filterBtn && filterDropdown) {
        filterBtn.addEventListener('click', () => {
            filterDropdown.classList.toggle('hidden');
        });
    }

    // --- Menangani pilihan filter ---
    if (filterDropdown) {
        filterDropdown.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                currentFilter = a.dataset.filter;
                currentFilterText.textContent = a.textContent;
                filterDropdown.classList.add('hidden');
                loadProjects(); // Memuat ulang daftar proyek berdasarkan filter yang dipilih
            });
        });
    }

    // --- Load Projects berdasarkan filter dan search ---
    function loadProjects() {
        // Daftar proyek statis, bisa diganti dengan data dinamis (dari server)
        const projects = [
            {
                title: "Web Downloader Video",
                category: "website",
                image: "gambar portofolio/image.png",
                description: "Web yang berisi alat untuk download video dari Instagram, Facebook, dan TikTok",
                link: "/downloader.html"
            },
            {
                title: "Web Penilaian Siswa",
                category: "website",
                image: "gambar portofolio/SAW.png",
                description: "Web analisis siswa yang kurang berprestasi yang terintegrasi database MYSQL",
                link: "saw.html"
            },
            {
                title: "Web Kopi",
                category: "website",
                image: "gambar portofolio/webkopi.png",
                description: "Web marketplace yang menampilkan jenis-jenis kopi yang terintegrasi database MYSQL",
                link: "/kopi.html"
            },
            {
                title: "Web Sebaran Informasi Geografis",
                category: "website",
                image: "gambar portofolio/signew.png",
                description: "Web yang dibuat untuk menampilkan sebaran balita dengan jumlah posyandu.",
                link: "/sig.html"
            },
            {
                title: "UI/UX Design for Mobile App",
                category: "ui_ux",
                image: "gambar portofolio/uiux.png",
                description: "Desain UI/UX untuk aplikasi mobile yang bertujuan meningkatkan pengalaman pengguna.",
                link: "/uiuxdesign.html"
            },
            // Tambahkan proyek lainnya di sini...
        ];

        const searchQuery = searchInput.value.trim().toLowerCase();
        
        // Filter proyek berdasarkan kategori dan pencarian
        const filteredProjects = projects.filter(project => {
            const matchesCategory = currentFilter === 'all' || project.category === currentFilter;
            const matchesSearch = project.title.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        // Clear previous projects
        container.innerHTML = '';

        // Jika tidak ada proyek yang ditemukan
        if (filteredProjects.length === 0) {
            container.innerHTML = '<p class="col-span-full text-center text-gray-500">Tidak ada proyek ditemukan.</p>';
            return;
        }

        // Tampilkan proyek
        filteredProjects.forEach(project => {
            const col = document.createElement('div');
            col.classList.add('col', 'mb-5');
            col.setAttribute('data-category', project.category);

            const card = document.createElement('div');
            card.classList.add('card', 'h-100', 'rounded-4', 'animate-card');
            
            const img = document.createElement('img');
            img.classList.add('card-img-top');
            img.src = project.image;
            img.alt = project.title;
            card.appendChild(img);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'p-4', 'text-center');
            const title = document.createElement('h5');
            title.classList.add('fw-bolder');
            title.textContent = project.title;
            cardBody.appendChild(title);
            card.appendChild(cardBody);

            const cardFooter = document.createElement('div');
            cardFooter.classList.add('card-footer', 'p-4', 'pt-0', 'border-top-0', 'bg-transparent');
            const description = document.createElement('p');
            description.textContent = project.description;
            const link = document.createElement('a');
            link.href = project.link;
            link.target = "_self";
            link.textContent = "Lihat Selengkapnya";
            description.appendChild(link);
            cardFooter.appendChild(description);
            card.appendChild(cardFooter);

            col.appendChild(card);
            container.appendChild(col);
        });
    }

    // --- Event listeners for search ---
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            loadProjects();
        });

        // --- Menekan tombol Enter di input search ---
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                loadProjects();
            }
        });
    }

    // Load initial projects
    loadProjects();
});
