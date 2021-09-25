import React, { FC, useEffect } from 'react';
import SvgComponent from './components/svgIcon';
import styles from './app.module.scss';
import { environmentVariable } from './utils';

const App: FC = () => {
  useEffect(() => {
    console.log(`environmentVariable()`, environmentVariable());
  }, []);

  return (
    <div className={styles.App}>
      <h2>Welcome to vite-react-cil</h2>
      <ul>
        <li>
          <a href="https://github.com/lgf196/ant-simple-pro">
            <SvgComponent iconClass="logon" fontSize="30px" />
            <h4>ant-simple-pro</h4>
            <section>
              简洁，美观，快速上手，支持3大框架(vue3.0,react,angular,typescript)；Concise,
              beautiful, quick to get started, support 3 big frameworks
            </section>
          </a>
        </li>
        <li>
          <a href="https://github.com/lgf196/JoL-player">
            <SvgComponent iconClass="logon" fontSize="30px" />
            <h4>JoL-player</h4>
            <section>
              简洁，美观，功能强大的react播放器(simple and beautiful, powerful react player)
            </section>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default App;
