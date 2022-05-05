import React, { FC } from 'react';

const BoardPage: FC = () => (
  <div>
    <h1>BoardPage</h1>
    <button type='button'>Back</button>
    <button type='button'>Add column</button>
    <div>
      <ul>
        <li>
          <h2>Column1</h2>
          <div>
            <ul>
              <li>
                <h3>Task1</h3>
              </li>
              <li>
                <h3>Task2</h3>
              </li>
            </ul>
          </div>
          <button type='button'>Add task</button>
        </li>

        <li>
          <h2>Column2</h2>
          <div>
            <ul>
              <li>
                <h3>Task1</h3>
              </li>
            </ul>
          </div>
          <button type='button'>Add task</button>
        </li>
      </ul>
    </div>
  </div>
);

export default BoardPage;
