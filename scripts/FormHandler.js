/**
 * FormHandler - Handles contact form submission and validation
 */
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        if (this.validate(data)) {
            this.submitForm(data);
        }
    }
    
    validate(data) {
        if (!data.name || data.name.trim() === '') {
            this.showError('Please enter your name');
            return false;
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            this.showError('Please enter a valid email address');
            return false;
        }
        
        if (!data.message || data.message.trim() === '') {
            this.showError('Please enter a message');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    submitForm(data) {
        // In a real application, you would send this to a backend API
        // For now, we'll just show a success message
        this.showSuccess(`Thank you for your message, ${data.name}! I'll get back to you soon.`);
        this.form.reset();
    }
    
    showError(message) {
        alert(`Error: ${message}`);
    }
    
    showSuccess(message) {
        alert(message);
    }
}

export default FormHandler;
