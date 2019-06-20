const contactForm = document.getElementById('contact-form');

const handleFormSubmit = e => {
  console.log(e.target.email.value);
  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: e.target.email.value,
      message: e.target.message.value,
    },
  });
  e.preventDefault();
  contactForm.reset();
};

contactForm.addEventListener('submit', handleFormSubmit);
