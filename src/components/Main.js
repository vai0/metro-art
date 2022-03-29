import React from "react";

import { QueryArtProviderContext } from "components/QueryArtProvider";
import { Art } from "components/Art";
import { BlurOnScroll } from "components/BlurOnScroll";

export function Main() {
  const { initialQueryStatus, objects } = React.useContext(
    QueryArtProviderContext
  );

  if (initialQueryStatus === "success") {
    return (
      <>
        {/* <pre
          style={{ maxWidth: "100%", fontSize: "12px", whiteSpace: "pre-wrap" }}
        >
          {JSON.stringify(objects, null, 2)}
        </pre> */}
        {objects.map(({ objectID, primaryImage, title }) => (
          <BlurOnScroll key={objectID}>
            <Art primaryImage={primaryImage} title={title} />
          </BlurOnScroll>
        ))}
      </>
    );
  } else {
    return "loading...";
  }
}
