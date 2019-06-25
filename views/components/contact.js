const contactForm = document.getElementById('contact-form');

const handleFormSubmit = e => {
  const url = '/mailers/contact';
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      senderEmail: e.target.email.value,
      senderMessage: e.target.message.value,
    }),
  };

  fetch(url, options);
  e.preventDefault();
  contactForm.reset();
};

contactForm.addEventListener('submit', handleFormSubmit);
