/*==========================================
        SEARCH
==========================================*/

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let cards = document.querySelectorAll(".course-card");

        cards.forEach(card => {

            let text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/*==========================================
        COUNTER ANIMATION
==========================================*/

const counters = document.querySelectorAll(".stat-card h2");

const runCounter = (counter) => {

    const target = parseInt(counter.innerText);

    let count = 0;

    const speed = target / 40;

    const update = () => {

        count += speed;

        if (count < target) {

            counter.innerText = Math.floor(count) + "+";

            requestAnimationFrame(update);

        } else {

            counter.innerText = target + "+";

        }

    }

    update();

}

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            runCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

});

counters.forEach(counter => observer.observe(counter));

/*==========================================
        SCROLL REVEAL
==========================================*/

const revealItems = document.querySelectorAll(

".course-card,.subject-card,.feature-box,.stat-card"

);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

revealItems.forEach(item=>{

    item.classList.add("hidden");

    revealObserver.observe(item);

});