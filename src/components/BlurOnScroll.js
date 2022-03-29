import React from "react";

import { ViewportProviderContext } from "components/ViewportProvider";

const BLUR_AMPLIFICATION = 6;

export function BlurOnScroll({ children }) {
  const { viewportHeight } = React.useContext(ViewportProviderContext);

  const $elRef = React.useRef();
  const [position, setPosition] = React.useState();

  React.useEffect(() => {
    const handleScroll = () => {
      if ($elRef.current) {
        const { top, height } = $elRef.current.getBoundingClientRect();
        const newPosition = (top + height / 2) / viewportHeight;

        if (newPosition <= 0 || position < 0) {
          setPosition(0);
        } else if (newPosition >= 1 || position > 1) {
          setPosition(1);
        } else {
          setPosition(newPosition);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [viewportHeight, position]);

  const getOpacityValue = () => {
    const y = -Math.pow(3 * position - 1.5, 2) + 1;

    let value = y;
    if (y <= 0) {
      value = 0;
    } else if (y >= 1) {
      value = 1;
    }

    return value;
  };

  return (
    <div
      ref={$elRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: getOpacityValue(),
      }}
    >
      {children}
    </div>
  );
}
