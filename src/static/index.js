document.addEventListener('DOMContentLoaded', () => {
    console.log("hi")
    const navLinks = document.querySelectorAll('aside a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-target');
            contentSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                    section.classList.add('fade-in');
                    section.classList.add("active")
                } else {
                    section.classList.add('hidden');
                    section.classList.remove('fade-in');
                    section.classList.remove("active")
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            this.classList.add('active');
        });
    });
});
