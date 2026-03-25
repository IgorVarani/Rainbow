let slides = document.querySelectorAll(".slide");
let index = 0;

function mostrarSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
    index++;
    if (index >= slides.length) index = 0;
    mostrarSlide(index);
});

document.querySelector(".prev").addEventListener("click", () => {
    index--;
    if (index < 0) index = slides.length - 1;
    mostrarSlide(index);
});

/* Auto-play */
setInterval(() => {
    index++;
    if (index >= slides.length) index = 0;
    mostrarSlide(index);
}, 3000);