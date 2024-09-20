document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Here, you would typically send the data to your server
        // For this example, we'll just log it to the console
        console.log('Form submitted:', data);
        
        // Clear the form
        form.reset();
        
        // Show a success message (you can replace this with a more user-friendly notification)
        alert('Thank you for your message. I\'ll get back to you soon!');
    });
});