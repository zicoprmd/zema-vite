import React from 'react';
//scss
import './Reserved.scss';

const Reserved = () => {
  return (
    <section>
      <div className="reserved">
        <p>
          All right reserved, created by
          <a
            href="https://twitter.com/zicoprmd"
            target="blank"
            rel="noopenner norefferer">
            {' '}
            zico permadi, MD
          </a>
        </p>
      </div>
    </section>
  );
};

export default Reserved;
