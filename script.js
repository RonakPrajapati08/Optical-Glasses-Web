//toggle
function toggleMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const hamburgerLines = document.querySelectorAll('#hamburger span');
    const links = document.querySelectorAll('.mobile-link');
    const closeBtn = document.getElementById('mobile-close-btn');

    const isOpening = overlay.classList.contains('opacity-0');

    if (isOpening) {
        // SHOW OVERLAY
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');

        // HAMBURGER → X
        hamburgerLines[0].classList.add('rotate-45', 'translate-y-[8px]');
        hamburgerLines[1].classList.add('opacity-0');
        hamburgerLines[2].classList.add('-rotate-45', 'translate-y-[-8px]');

        // LINKS ANIMATION
        links.forEach((link, i) => {
            setTimeout(() => {
                link.classList.remove('opacity-0', 'translate-y-4');
                link.classList.add('opacity-100', 'translate-y-0');
            }, i * 80);
        });

        // CLOSE BUTTON SHOW
        closeBtn.classList.remove('opacity-0', 'scale-75');
        closeBtn.classList.add('opacity-100', 'scale-100');

        document.body.style.overflow = 'hidden';
    } else {
        // HIDE LINKS
        links.forEach(link => {
            link.classList.add('opacity-0', 'translate-y-4');
            link.classList.remove('opacity-100', 'translate-y-0');
        });

        // X → HAMBURGER
        hamburgerLines[0].classList.remove('rotate-45', 'translate-y-[8px]');
        hamburgerLines[1].classList.remove('opacity-0');
        hamburgerLines[2].classList.remove('-rotate-45', 'translate-y-[-8px]');

        // CLOSE BUTTON HIDE
        closeBtn.classList.add('opacity-0', 'scale-75');
        closeBtn.classList.remove('opacity-100', 'scale-100');

        // HIDE OVERLAY
        setTimeout(() => {
            overlay.classList.add('opacity-0', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'auto';
        }, 400);
    }
}


//hero slider
let current = 0;
const slides = document.querySelectorAll(".slide");
const bgText = document.getElementById("bg-text");
const progressBar = document.getElementById("progress-bar");
const counter = document.getElementById("counter");
let timer;

function initProgress() {
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.transition = "width 6000ms linear";
    progressBar.style.width = "100%";
  }, 50);
}

function changeSlide(direction = "next") {
  const prevIndex = current;

  if (direction === "next") {
    current = (current + 1) % slides.length;
  } else {
    current = (current - 1 + slides.length) % slides.length;
  }

  // Handle Slide Animations
  slides.forEach((slide, i) => {
    const imgContainer = slide.querySelector(".slide-img-container");
    const img = slide.querySelector("img");

    if (i === current) {
      slide.classList.add("active", "z-20");
      slide.classList.remove("z-10", "opacity-0");
      slide.style.opacity = "1";
      imgContainer.classList.replace("clip-hidden", "clip-active");
      img.classList.add("ken-burns");
      bgText.innerText = slide.getAttribute("data-bg-label");
    } else {
      slide.classList.remove("active", "z-20");
      slide.classList.add("z-10");
      imgContainer.classList.replace("clip-active", "clip-hidden");
      img.classList.remove("ken-burns");
      setTimeout(() => {
        if (i !== current) slide.style.opacity = "0";
      }, 1000);
    }
  });

  // Update UI
  // counter.style.transform = `translateY(-${current * 1rem})`;
  const counterItemHeight = counter.children[0].offsetHeight;
  counter.style.transform = `translateY(-${current * counterItemHeight}px)`;

  // Reset Timer
  clearInterval(timer);
  initProgress();
  timer = setInterval(() => changeSlide("next"), 6000);
}

// Pause on Hover
document.getElementById("hero").addEventListener("mouseenter", () => {
  clearInterval(timer);
  progressBar.style.animationPlayState = "paused";
});

document.getElementById("hero").addEventListener("mouseleave", () => {
  timer = setInterval(() => changeSlide("next"), 6000);
  progressBar.style.animationPlayState = "running";
});

// Start
window.onload = () => {
  initProgress();
  timer = setInterval(() => changeSlide("next"), 6000);
};

//End Hero slider

//Testimonial slider
let tIndex = 0;
const tSlides = document.querySelectorAll(".testimonial-slide");
const tDots = document.querySelectorAll(".dot");
let tTimer;

function showTestimonial(n) {
  tIndex = (n + tSlides.length) % tSlides.length;

  tSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === tIndex);
  });

  tDots.forEach((dot, i) => {
    dot.classList.toggle("bg-slate-900", i === tIndex);
    dot.classList.toggle("bg-slate-200", i !== tIndex);
  });
}

function changeTestimonial(n) {
  showTestimonial(tIndex + n);
  resetTTimer();
}

function resetTTimer() {
  clearInterval(tTimer);
  tTimer = setInterval(() => changeTestimonial(1), 8000);
}

// Pause on Hover
const tContainer = document.getElementById("testimonial-section");
tContainer.addEventListener("mouseenter", () => clearInterval(tTimer));
tContainer.addEventListener("mouseleave", resetTTimer);

window.onload = resetTTimer;
//End Testimonial

//inquiry form popup
function toggleBookingModal() {
  const modal = document.getElementById("bookingModal");
  const content = document.getElementById("modalContent");

  if (modal.classList.contains("opacity-0")) {
    // --- OPEN ANIMATION ---
    // 1. Show the main container
    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("opacity-100", "pointer-events-auto");

    // 2. Animate the card (scale and fade)
    content.classList.remove("scale-95", "opacity-0");
    content.classList.add("scale-100", "opacity-100");

    // 3. Freeze background scroll
    document.body.style.overflow = "hidden";
  } else {
    // --- CLOSE ANIMATION ---
    // 1. Hide the card first
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");

    // 2. Hide the container after a small delay to let card finish
    modal.classList.remove("opacity-100", "pointer-events-auto");
    modal.classList.add("opacity-0", "pointer-events-none");

    // 3. Re-enable scroll
    document.body.style.overflow = "auto";
  }
}

// Close modal if user clicks on the backdrop (outside the card)
window.addEventListener("click", (e) => {
  const modal = document.getElementById("bookingModal");
  // If the click is on the modal wrapper but NOT on the content inside
  if (e.target === modal) {
    toggleBookingModal();
  }
});
