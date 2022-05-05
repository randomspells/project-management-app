import React, { FC } from 'react';

export const MainPage: FC = () => (
  <div>
    <h1>MainPage</h1>
    <button type='button'>Create Board</button>
    <div>
      <ul>
        <li>
          <div className='board'>
            <h2>Board1</h2>
            <p>Description</p>
          </div>
        </li>
        <li>
          <div className='board'>
            <h2>Board2</h2>
            <p>Description</p>
          </div>
        </li>
        <li>
          <div className='board'>
            <h2>Board3</h2>
            <p>Description</p>
          </div>
        </li>
        <li>
          <div className='board'>
            <h2>Board4</h2>
            <p>Description</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default MainPage;
