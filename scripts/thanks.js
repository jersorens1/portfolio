document.addEventListener('DOMContentLoaded', () => {
    const currentURL = window.location.href;
    const queryString = currentURL.split('?')[1];
    const formData = new URLSearchParams(queryString);

    function show(param) {
        return formData.get(param) || '';
    }

    const encodedDateStr = show('timestamp');
    const decodedDatStr = decodeURIComponent(encodedDateStr);
    const dateObj = new Date(decodedDatStr);
    const formattedDate = dateObj.toLocaleString();

    const showInfo = document.querySelector('.results');
    showInfo.innerHTML = `
    <h3>Hey ${show('name')}!</h3>
    <p>I'll get back to you as soon as possible at the following email address.</p>
    <p><strong>Your Email:</strong> ${show("email")}</p>
    <p><strong>Your Message:</strong> ${show("message")}</p>
    <p><strong>Time Submitted:</strong> ${formattedDate}</p>`;
});