// Load icons data
fetch('/client/static/content/icons.json')
    .then(response => response.json())
    .then(data => {
        const iconsContainer = document.getElementById('iconsContainer');
        const experienceTitle = document.getElementById('experienceTitle');
        const experienceDescription = document.getElementById('experienceDescription');

        const iconSize = 50;  // Increased from 40 to 50
        const padding = 15;   // Increased padding slightly
        const containerRect = iconsContainer.getBoundingClientRect();
        const stackWidth = containerRect.width;
        const stackHeight = containerRect.height;

        // Ensure the icons container has the correct CSS properties
        iconsContainer.style.position = 'relative';
        iconsContainer.style.overflow = 'hidden';

        function isOverlapping(x1, y1, x2, y2) {
            return Math.abs(x1 - x2) < (iconSize + padding) && Math.abs(y1 - y2) < (iconSize + padding);
        }

        function getRandomPosition() {
            return {
                x: Math.random() * (stackWidth - iconSize),
                y: Math.random() * (stackHeight - iconSize)
            };
        }

        let positions = [];

        data.icons.forEach((icon, index) => {
            const img = document.createElement('img');
            img.src = icon.src;
            img.alt = icon.name;
            img.className = 'tech-icon';
            img.style.width = `${iconSize}px`;
            img.style.height = `${iconSize}px`;
            img.style.position = 'absolute';
            img.style.cursor = 'pointer';
            img.style.transition = 'all 1s ease';  // Smooth transition for movement
            img.style.backgroundColor = '#1458c5';  // Add background color
            img.style.borderRadius = '4px';  // Add rounded corners
            img.style.padding = '3px';  // Add some padding to separate icon from background

            let newPos;
            do {
                newPos = getRandomPosition();
            } while (positions.some(pos => isOverlapping(newPos.x, newPos.y, pos.x, pos.y)));

            positions.push(newPos);
            img.style.left = `${newPos.x}px`;
            img.style.top = `${newPos.y}px`;
            iconsContainer.appendChild(img);

            setInterval(() => {
                let newPos;
                do {
                    newPos = getRandomPosition();
                } while (positions.some((pos, i) => i !== index && isOverlapping(newPos.x, newPos.y, pos.x, pos.y)));

                positions[index] = newPos;
                img.style.left = `${newPos.x}px`;
                img.style.top = `${newPos.y}px`;
            }, 3500 + index * 1000);  // Increased interval for slower movement

            // Update click event to display title and description
            img.addEventListener('click', () => {
                experienceTitle.textContent = icon.name;
                experienceDescription.textContent = icon.description || "No description available.";
                
                // Add a highlight effect to the clicked icon
                img.style.boxShadow = '0 0 15px #ec8585';  // Increased glow effect
                setTimeout(() => {
                    img.style.boxShadow = 'none';
                }, 3000);
            });
        });
    })
    .catch(error => console.error('Error loading icons:', error));