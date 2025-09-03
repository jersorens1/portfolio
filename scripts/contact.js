document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const loadingIndicator = document.getElementById('loading-indicator');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');

    // Character counter for message textarea
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 2000;
        charCounter.textContent = `${currentLength} / ${maxLength}`;
        
        if (currentLength > maxLength * 0.9) {
            charCounter.style.color = '#d70000';
        } else {
            charCounter.style.color = '#666';
        }
    });

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.style.borderColor = '#d70000';
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + '-error');
        const inputElement = document.getElementById(fieldId);
        
        errorElement.classList.remove('show');
        inputElement.style.borderColor = '#ddd';
    }

    function clearAllErrors() {
        ['name', 'email', 'message'].forEach(field => {
            clearError(field);
        });
    }

    function validateForm() {
        clearAllErrors();
        let isValid = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!validateName(name)) {
            showError('name', 'Please enter your full name (at least 2 characters)');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!validateMessage(message)) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        return isValid;
    }

    // Real-time validation
    document.getElementById('name').addEventListener('blur', function() {
        if (this.value && !validateName(this.value)) {
            showError('name', 'Please enter your full name (at least 2 characters)');
        } else if (this.value) {
            clearError('name');
        }
    });

    document.getElementById('email').addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
        } else if (this.value) {
            clearError('email');
        }
    });

    document.getElementById('message').addEventListener('blur', function() {
        if (this.value && !validateMessage(this.value)) {
            showError('message', 'Please enter a message (at least 10 characters)');
        } else if (this.value) {
            clearError('message');
        }
    });

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><div class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>';
        loadingIndicator.classList.remove('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // Prepare form data
        const formData = new FormData(form);

        try {
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                loadingIndicator.classList.add('hidden');
                successMessage.classList.remove('hidden');
                form.reset();
                charCounter.textContent = '0 / 2000';
                
                // Optional: Redirect to thanks page after delay
                setTimeout(() => {
                    const thankYouData = new URLSearchParams({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message'),
                        timestamp: new Date().toISOString()
                    });
                    window.location.href = `thanks.html?${thankYouData.toString()}`;
                }, 3000);
                
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
            loadingIndicator.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    });

    // Prevent form submission on Enter key in input fields (except textarea)
    form.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});