import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { QueryArtProvider } from "components/QueryArtProvider";
import { ViewportProvider } from "components/ViewportProvider";
import { Main } from "components/Main";

import "./App.css";

/*

- each art piece container should be of full viewport width and height
- on scroll, each piece should "snap" in place
- art should be centered in container, and should contain basic metadata about the art piece
  - title
  - artistDisplayName
  - artistDisplayBio
  - artistULAN_URL
  - objectDate
  - department
  - medium
  - description?
  - objectURL
- each piece should be zoomable?

- query for art that hasImage, isHighlight
- initial query for all objectIDs
- initially load the first 10
- if scrolling reaches the last 5, load the next 10

*/

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryArtProvider>
        <ViewportProvider>
          <Main />
        </ViewportProvider>
      </QueryArtProvider>
    </QueryClientProvider>
  );
}

export default App;
