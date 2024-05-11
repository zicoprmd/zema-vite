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
            href="https://zicoprmd.github.io/linktree"
            target="blank"
            rel="noopenner norefferer">
            {' '}
            Zico Permadi, MD
          </a>
        </p>
      </div>
    </section>
  );
};

export default Reserved;
