document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Handle form submission
    const form = document.getElementById('notifyForm');
    const message = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (email) {
                // In a real scenario, you'd send this to a backend
                // For now, simulate success
                message.style.color = 'var(--primary-color)';
                message.textContent = 'Grazie! Ti avviseremo non appena apriremo.';
                form.reset();
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    message.textContent = '';
                }, 5000);
            }
        });
    }
});
