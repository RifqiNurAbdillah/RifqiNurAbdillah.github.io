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

