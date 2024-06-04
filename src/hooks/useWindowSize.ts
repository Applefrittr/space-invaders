import { useEffect, useState } from "react";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([innerWidth, innerHeight]);
    };
    window.addEventListener("resize", updateSize, false);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export default useWindowSize;
