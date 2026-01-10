//hero slider 
let current = 0;
        const slides = document.querySelectorAll('.slide');
        const bgText = document.getElementById('bg-text');
        const progressBar = document.getElementById('progress-bar');
        const counter = document.getElementById('counter');
        let timer;

        function initProgress() {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.transition = 'width 6000ms linear';
                progressBar.style.width = '100%';
            }, 50);
        }

        function changeSlide(direction = 'next') {
            const prevIndex = current;

            if (direction === 'next') {
                current = (current + 1) % slides.length;
            } else {
                current = (current - 1 + slides.length) % slides.length;
            }

            // Handle Slide Animations
            slides.forEach((slide, i) => {
                const imgContainer = slide.querySelector('.slide-img-container');
                const img = slide.querySelector('img');

                if (i === current) {
                    slide.classList.add('active', 'z-20');
                    slide.classList.remove('z-10', 'opacity-0');
                    slide.style.opacity = '1';
                    imgContainer.classList.replace('clip-hidden', 'clip-active');
                    img.classList.add('ken-burns');
                    bgText.innerText = slide.getAttribute('data-bg-label');
                } else {
                    slide.classList.remove('active', 'z-20');
                    slide.classList.add('z-10');
                    imgContainer.classList.replace('clip-active', 'clip-hidden');
                    img.classList.remove('ken-burns');
                    setTimeout(() => { if (i !== current) slide.style.opacity = '0' }, 1000);
                }
            });

            // Update UI
            // counter.style.transform = `translateY(-${current * 1rem})`;
            const counterItemHeight = counter.children[0].offsetHeight;
            counter.style.transform = `translateY(-${current * counterItemHeight}px)`;


            // Reset Timer
            clearInterval(timer);
            initProgress();
            timer = setInterval(() => changeSlide('next'), 6000);
        }

        // Pause on Hover
        document.getElementById('hero').addEventListener('mouseenter', () => {
            clearInterval(timer);
            progressBar.style.animationPlayState = 'paused';
        });

        document.getElementById('hero').addEventListener('mouseleave', () => {
            timer = setInterval(() => changeSlide('next'), 6000);
            progressBar.style.animationPlayState = 'running';
        });

        // Start
        window.onload = () => {
            initProgress();
            timer = setInterval(() => changeSlide('next'), 6000);
};
        
//End Hero slider

//Testimonial slider
    let tIndex = 0;
    const tSlides = document.querySelectorAll('.testimonial-slide');
    const tDots = document.querySelectorAll('.dot');
    let tTimer;

    function showTestimonial(n) {
        tIndex = (n + tSlides.length) % tSlides.length;
        
        tSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === tIndex);
        });

        tDots.forEach((dot, i) => {
            dot.classList.toggle('bg-slate-900', i === tIndex);
            dot.classList.toggle('bg-slate-200', i !== tIndex);
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
    const tContainer = document.getElementById('testimonial-section');
    tContainer.addEventListener('mouseenter', () => clearInterval(tTimer));
    tContainer.addEventListener('mouseleave', resetTTimer);

    window.onload = resetTTimer;
//End Testimonial