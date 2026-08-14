/* =========================================================
   BIHAR LEARNERS
   Main Application JavaScript
========================================================= */

"use strict";


/* =========================================================
   1. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initNavbarScroll();

    initSmoothScroll();

    initRevealAnimation();

    initProgressAnimation();

});


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("menu-open");


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        const icon =
            menuToggle.querySelector("i");


        if (icon) {

            icon.className =
                isOpen
                    ? "bi bi-x-lg"
                    : "bi bi-list";

        }

    });


    /* CLOSE MENU AFTER CLICKING LINK */

    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove(
                "menu-open"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.className =
                    "bi bi-list";

            }

        });

    });


    /* CLOSE WHEN CLICKING OUTSIDE */

    document.addEventListener(
        "click",
        event => {

            const clickedInsideNav =
                mainNav.contains(event.target);


            const clickedMenu =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenu &&
                mainNav.classList.contains(
                    "menu-open"
                )
            ) {

                mainNav.classList.remove(
                    "menu-open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.className =
                        "bi bi-list";

                }

            }

        }
    );


    /* CLOSE MENU ON RESIZE */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 760) {

                mainNav.classList.remove(
                    "menu-open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.className =
                        "bi bi-list";

                }

            }

        }
    );

}


/* =========================================================
   3. NAVBAR SCROLL EFFECT
========================================================= */

function initNavbarScroll() {

    const header =
        document.querySelector(
            ".site-header"
        );


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 20) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   4. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    10;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   5. SCROLL REVEAL ANIMATION
========================================================= */

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(
            ".feature-card, .course-card, .stat-item, .test-banner"
        );


    if (!elements.length) {
        return;
    }


    /* Initial state */

    elements.forEach(
        element => {

            element.classList.add(
                "reveal-item"
            );

        }
    );


    /* Intersection Observer */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element => {

            observer.observe(element);

        }
    );

}


/* =========================================================
   6. PROGRESS ANIMATION
========================================================= */

function initProgressAnimation() {

    const progressBars =
        document.querySelectorAll(
            ".progress-bar"
        );


    if (!progressBars.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const target =
                                entry.target.dataset.progress;


                            if (target) {

                                entry.target.style.width =
                                    `${target}%`;

                            }


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.4
            }
        );


    progressBars.forEach(
        bar => {

            bar.style.width = "0%";

            observer.observe(bar);

        }
    );

}


/* =========================================================
   7. CURRENT YEAR
========================================================= */

function setCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(
        element => {

            element.textContent =
                currentYear;

        }
    );

}


setCurrentYear();


/* =========================================================
   8. HEADER SCROLL STYLE
========================================================= */

const navbarStyle = document.createElement(
    "style"
);


navbarStyle.textContent = `

    .site-header.scrolled {

        background:
            rgba(255, 255, 255, 0.95);

        box-shadow:
            0 8px 30px rgba(15, 23, 42, 0.06);

    }


    .reveal-item {

        opacity: 0;

        transform:
            translateY(25px);

        transition:
            opacity .6s ease,
            transform .6s ease;

    }


    .reveal-visible {

        opacity: 1;

        transform:
            translateY(0);

    }

`;


document.head.appendChild(navbarStyle);


/* =========================================================
   9. ESCAPE KEY
   Close mobile menu with ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const mainNav =
            document.getElementById(
                "mainNav"
            );


        if (
            !menuToggle ||
            !mainNav
        ) {
            return;
        }


        mainNav.classList.remove(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        const icon =
            menuToggle.querySelector("i");


        if (icon) {

            icon.className =
                "bi bi-list";

        }

    }
);