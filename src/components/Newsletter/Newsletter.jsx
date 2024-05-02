import React from 'react';
//scss
import './Newsletter.scss';

const Newsletter = () => {
  const form = document.forms['zema-form'];

  const greeting = () => {
    alert('email submitted');
    form.reset();
  };
  return (
    <section>
      <div id="newsletter">
        <div className="title-wrapper">
          <h2 className="title-news">NEWSLETTER</h2>
        </div>
        <form
          name="zema-form"
          method="POST"
          action="https://formsubmit.co/zicoprmd@gmail.com"
          enctype="multipart/form-data"
          className="forms-wrapper">
          <input type="email" name="email" placeholder="Email" required />
          <button className="btn-submit" onClick={greeting}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
