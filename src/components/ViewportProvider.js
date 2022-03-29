import React from "react";

export const ViewportProviderContext = React.createContext();

export function ViewportProvider({ children }) {
  const [viewportHeight, setViewportHeight] = React.useState(
    window.innerHeight
  );

  React.useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ViewportProviderContext.Provider value={{ viewportHeight }}>
      {children}
    </ViewportProviderContext.Provider>
  );
}
