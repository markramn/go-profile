document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const landingSection = document.getElementById('home');
    const contactButton = document.getElementById('contactMe');

    function toggleScrollIndicator() {
        if (window.scrollY < landingSection.offsetHeight / 2) {
            scrollIndicator.style.opacity = '1';
        } else {
            scrollIndicator.style.opacity = '0';
        }
    }

    // Initial check for scroll indicator
    toggleScrollIndicator();

    // Add scroll event listener
    window.addEventListener('scroll', toggleScrollIndicator);

    function scrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Update scroll indicator visibility
            if (targetId !== 'home') {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
            
            // Update URL hash without triggering a scroll
            history.pushState(null, null, `#${targetId}`);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Add event listener for the contact button
    if (contactButton) {
        contactButton.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    }

    // Update hash on scroll (debounced)
    let timeout;
    window.addEventListener('scroll', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const sections = document.querySelectorAll('section');
            let currentSectionId = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                    currentSectionId = section.id;
                }
            });

            if (currentSectionId && currentSectionId !== window.location.hash.substring(1)) {
                history.replaceState(null, null, `#${currentSectionId}`);
            }
        }, 100);
    });
});

// Sample projects data
const projects = [
    { title: "Connected Conservation", description: "Worked with extremly high quality satellite data to train machine learning algorithms to detect large mammals from space.", image: "/client/static/images/projects/elephant.jpg", likes: 60 },
    { title: "Conversation Analytics", description: "Full stack design, architecture & production development of a Conversation Analytics product that analyzes customer interaction data.", image: "/client/static/images/projects/conversation.jpg", likes: 96 },
    { title: "Semantic Search", description: "Development of semantic searching applications for full text & fuzzy search using Elastic Cloud", image: "/client/static/images/projects/search.jpg", likes: 225 },
    { title: "Tour de France", description: "Developed into production the realtime analytics backend for Connected Stadium for the Tour de France, a real time tracking application used to track support vehicle, VIPs & fans.", image: "/client/static/images/projects/cycling.jpg", likes: 47 },
    { title: "RAG", description: "Design & development of a fully conversational feature allowing users to interact with their customer data by querying & grounding large language models.", image: "/client/static/images/projects/rag.jpg", likes: 110 },
    { title: "Power(BI) to the people!", description: "Designed and developed a fully managed PowerBI Embedded Service to white-label PBI Content into our application", image: "/client/static/images/projects/pbi.jpg", likes: 206 },
    { title: "Machine Learning", description: "Built many classical machine learning models for forecasting, classification & prediction.", image: "/client/static/images/projects/alan.jpg", likes: 124 },
    { title: "Big Data Pipeline Development", description: "Architected & developed many large big data processing pipelines using Azure Functions", image: "/client/static/images/projects/process.jpg", likes: 85 }
];

function createProjectCard(project) {
    return `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <span class="likes">${project.likes}</span>
            </div>
        </div>
    `;
}

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = projects.map(createProjectCard).join('');
}

// Call the function to render projects when the page loads
window.addEventListener('load', renderProjects);