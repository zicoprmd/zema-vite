import './Newsletter.scss';

const Newsletter = () => {
  const greeting = () => {
    const form = document.forms['zema-form'];
    alert('Thank you! Your message has been sent. 💌');
    if (form) form.reset();
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="newsletter-inner">
        <span className="newsletter-eyebrow">✦ Stay Connected ✦</span>
        <h2 className="newsletter-title">Follow Zema&apos;s journey</h2>
        <p className="newsletter-subtitle">
          Get updates on milestones, memories, and moments as our little one
          grows. Sent with love.
        </p>
        <form
          name="zema-form"
          method="POST"
          action="https://formsubmit.co/zicoprmd@gmail.com"
          encType="multipart/form-data"
          className="newsletter-form">
          <input type="email" name="email" placeholder="Your email address" required />
          <button className="btn-submit" type="submit" onClick={greeting}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
