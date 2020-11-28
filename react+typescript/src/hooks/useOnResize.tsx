import { useState, useEffect } from 'react';

export interface useWindowSizeType {
  width: number;
  height: number;
}

const useWindowSize = (): useWindowSizeType => {
  const [windowSize, setWindowSize] = useState<useWindowSizeType>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize
}
export default useWindowSize;
