document.addEventListener('DOMContentLoaded', () => {
    const currentURL = window.location.href;
    const queryString = currentURL.split('?')[1];
    
    // If no query parameters, redirect to contact page
    if (!queryString) {
        window.location.href = 'contact.html';
        return;
    }
    
    const formData = new URLSearchParams(queryString);

    function getParam(param) {
        return formData.get(param) || '';
    }

    function formatDate(dateString) {
        try {
            const date = new Date(decodeURIComponent(dateString));
            return date.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Just now';
        }
    }

    function truncateMessage(message, maxLength = 200) {
        if (message.length <= maxLength) return message;
        return message.substring(0, maxLength) + '...';
    }

    // Get form data
    const name = getParam('name');
    const email = getParam('email');
    const subject = getParam('subject');
    const message = getParam('message');
    const timestamp = getParam('timestamp');

    // If essential data is missing, redirect to contact page
    if (!name || !email || !message) {
        window.location.href = 'contact.html';
        return;
    }

    // Populate the message details
    const messageDetailsContainer = document.getElementById('message-details');
    
    const formattedDate = formatDate(timestamp);
    const displayMessage = truncateMessage(message);
    const subjectText = subject ? subject : 'General Inquiry';
    
    messageDetailsContainer.innerHTML = `
        <h3>Hello ${name}! 👋</h3>
        <p><strong>Your Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subjectText}</p>
        <p><strong>Your Message:</strong></p>
        <div class="user-message">"${displayMessage}"</div>
        <div class="timestamp">
            <i class="fas fa-clock"></i> Submitted on ${formattedDate}
        </div>
    `;

    // Add animation delay for better UX
    setTimeout(() => {
        messageDetailsContainer.style.opacity = '0';
        messageDetailsContainer.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }, 300);

    // Update the page title with the user's name
    document.title = `Thank You, ${name}! - Jeremy Sorensen`;

    // Optional: Auto-redirect after a certain time (uncomment if desired)
    // setTimeout(() => {
    //     window.location.href = 'index.html';
    // }, 10000); // Redirect after 10 seconds

    // Add CSS for the fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});