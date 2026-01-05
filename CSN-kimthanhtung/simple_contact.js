// Xử lý form liên hệ đơn giản (không cần PHP)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const messageDiv = document.getElementById('contactMessage');
            if (messageDiv) {
                messageDiv.style.display = 'block';
                messageDiv.className = 'message success';
                messageDiv.textContent = 'Cảm ơn bạn đã liên hệ! Tin nhắn đã được ghi nhận.';
                
                // Reset form
                this.reset();
                
                // Ẩn thông báo sau 5 giây
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        });
    }
});