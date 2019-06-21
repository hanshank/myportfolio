const contactForm = document.getElementById('contact-form');

// const handleFormSubmit = e => {
//   console.log(e.target.email.value);

//   const form = new FormData();
//   form.append('email', JSON.stringify(e.target.email.value));
//   form.append('message', JSON.stringify(e.target.message.value));

//   fetch('/mailers/contact', {
//     method: 'POST',
//     body: form,
//   });
//   e.preventDefault();
//   contactForm.reset();
// };

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
