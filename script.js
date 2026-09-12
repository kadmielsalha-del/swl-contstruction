/* =========================================
   SWL CONSTRUCTION — MAIN JAVASCRIPT
========================================= */


/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1200);

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

});


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   ANIMATED STATISTICS
========================================= */

const statNumbers = document.querySelectorAll("[data-target]");

const statsObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const number = entry.target;
            const target = Number(number.dataset.target);

            let current = 0;

            const duration = 1600;
            const startTime = performance.now();


            function animate(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(
                    target * easedProgress
                );

                number.textContent = current + "+";

                if (progress < 1) {

                    requestAnimationFrame(animate);

                } else {

                    number.textContent = target + "+";

                }

            }


            requestAnimationFrame(animate);

            statsObserver.unobserve(number);

        });

    },
    {
        threshold: 0.6
    }
);


statNumbers.forEach((number) => {

    statsObserver.observe(number);

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   BACK TO TOP BUTTON
========================================= */

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 700) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   PROJECT IMAGE PARALLAX
========================================= */

const featuredProject =
    document.querySelector(".featured-project");

window.addEventListener("scroll", () => {

    if (!featuredProject) return;

    const rect =
        featuredProject.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    if (
        rect.top < windowHeight &&
        rect.bottom > 0
    ) {

        const progress =
            (windowHeight - rect.top) /
            (windowHeight + rect.height);

        const movement =
            (progress - 0.5) * 80;

        const image =
            featuredProject.querySelector(
                ".featured-image"
            );

        if (image) {

            image.style.transform =
                `scale(1.08) translateY(${movement}px)`;

        }

    }

});


/* =========================================
   PROJECT CARD MOUSE EFFECT
========================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.querySelector(".contact-form");

const formMessage =
    document.querySelector(".form-message");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const button =
        contactForm.querySelector(".form-button");

    button.disabled = true;

    button.innerHTML =
        "Sending...";


    setTimeout(() => {

        button.innerHTML =
            "Enquiry Sent ✓";

        button.classList.add("success");

        formMessage.textContent =
            "Thanks — your enquiry has been received. We'll be in touch shortly.";

        formMessage.classList.add("show");

        contactForm.reset();


        setTimeout(() => {

            button.disabled = false;

            button.innerHTML =
                'Send Enquiry <span>↗</span>';

            button.classList.remove("success");

        }, 4000);

    }, 1000);

});


/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow =
    document.createElement("div");

cursorGlow.classList.add("cursor-glow");

document.body.appendChild(cursorGlow);


window.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});


/* =========================================
   REDUCE MOTION ACCESSIBILITY
========================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}
