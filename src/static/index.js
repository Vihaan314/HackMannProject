document.addEventListener('DOMContentLoaded', () => {
    console.log("hi")
    const navLinks = document.querySelectorAll('aside a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-target');
            contentSections.forEach(section => {
                if (targetId === 'mood_tracking') {
                    fetch(moodTrackingUrl)
                    .then(response => response.text())
                    .then(html => {
                        const moodTrackingContent = document.getElementById('mood_tracking-content');
                        moodTrackingContent.innerHTML = html;
                        moodTrackingContent.classList.remove('hidden');
                        moodTrackingContent.classList.add('fade-in');
                        moodTrackingContent.classList.add('active');
                        evalScripts(moodTrackingContent);
    
                    });
                    } else {
                        document.getElementById('mood_tracking-content').classList.add('hidden');
                        document.getElementById('mood_tracking-content').classList.remove('fade-in');
                        document.getElementById('mood_tracking-content').classList.remove('active');
                    }

                if (targetId === 'counseling') {
                    fetch(counselingUrl)
                    .then(response => response.text())
                    .then(html => {
                        const counselingContent = document.getElementById('counseling-content');
                        counselingContent.innerHTML = html;
                        counselingContent.classList.remove('hidden');
                        counselingContent.classList.add('fade-in');
                        counselingContent.classList.add('active');
                        evalScripts(counselingContent);
    
                    });
                    } else {
                        document.getElementById('counseling-content').classList.add('hidden');
                        document.getElementById('counseling-content').classList.remove('fade-in');
                        document.getElementById('counseling-content').classList.remove('active');
                    }
                
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                    section.classList.add('fade-in');
                    section.classList.add("active");
                } else {
                    section.classList.add('hidden');
                    section.classList.remove('fade-in');
                    section.classList.remove("active");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            this.classList.add('active');
        });
    });
});

document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-target');
        document.getElementById(targetSection).classList.remove('hidden');

        document.querySelectorAll('.content-section').forEach(section => {
            if (section.id !== targetSection) {
                section.classList.add('hidden');
            }
        });
    });
});


function evalScripts(element) {
    element.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        newScript.text = oldScript.text;
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}