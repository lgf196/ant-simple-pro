import React, { FC, useEffect } from 'react';
import SvgComponent from './components/svgIcon';
import { environmentVariable } from './utils';
import { Button } from 'antd';
const App: FC = () => {
  useEffect(() => {
    console.log(`environmentVariable()`, environmentVariable());
  }, []);

  return (
    <div>
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

export default App;
