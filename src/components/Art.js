import React from "react";

export function Art({ primaryImage, title }) {
  console.log(primaryImage);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        scrollSnapAlign: "start",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "5vh 5vw",
          height: "100vh",
        }}
      >
        <img src={primaryImage} alt={title} style={{ maxWidth: "80vw" }} />
        <div style={{ maxWidth: "40vw", padding: "2em" }}>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
}
