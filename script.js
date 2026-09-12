// Smooth reveal animations
const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .about-text, .stat, .contact-form"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


// Quote form
const form = document.querySelector(".contact-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = form.querySelector("button");

    button.textContent = "Thank you — we'll be in touch";
    button.style.background = "#ffffff";

    setTimeout(() => {
        button.textContent = "Request a Quote";
        button.style.background = "";
        form.reset();
    }, 4000);
});
