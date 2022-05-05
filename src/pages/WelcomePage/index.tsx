import React, { FC } from 'react';
import style from './index.module.scss';

const WelcomePage: FC = () => {
  const { wrapper } = style;
  return (
    <div className={wrapper}>
      <h1>WelcomePage</h1>
      <div>
        <h2>Team</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui a ut
          sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!
        </p>
        <h2>Project</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui a ut
          sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!
        </p>
        <h2>Course</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui a ut
          sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
