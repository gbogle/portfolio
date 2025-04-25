
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // create typing  and add it 
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-effect';
    const coverSubtitle = document.querySelector('.cover-subtitle');
    if (coverSubtitle) {
        coverSubtitle.parentNode.insertBefore(typingElement, coverSubtitle.nextSibling);
    }
    
    // displayed phrases
    const phrases = [
        'People Centered',
        'Data Storytelling',
        'Design Thinking',
        'Product Strategy', 
        'Insight Discovery',
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        // Remove character if it is deleting
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // make the typing speed
        let typeSpeed = isDeleting ? 50 : 100;
        
        // of word is complete, wait then delete
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 1000; // Pause at end 
            isDeleting = true;
        } 
        // move onto the next string 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; 
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // start the typing 
    typeWriter();

// form submission using formspree
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
       
        const form = this;
        
        // add a thank you message 
        if (!document.querySelector('.form-thank-you')) {
            const thankYouMessage = document.createElement('div');
            thankYouMessage.className = 'form-thank-you';
            thankYouMessage.style.display = 'none';
            thankYouMessage.innerHTML = '<h3>Thank you for your message!</h3><p>I\'ll get back to you as soon as possible.</p>';
            form.parentNode.appendChild(thankYouMessage);
        }
        
        // show thank you message 
        if (window.location.search.includes('submitted=true')) {
            form.style.display = 'none';
            document.querySelector('.form-thank-you').style.display = 'block';
        }
    });
}

});