import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import wretch from "wretch";

export const QueryArtProviderContext = React.createContext();

const metAPI = wretch().url(
  "https://collectionapi.metmuseum.org/public/collection/v1"
);

const fetchObjectIDs = () =>
  metAPI
    .url("/search")
    .query({
      q: "happy",
      hasImages: true,
      medium: "Paintings",
    })
    .get()
    .json();

const BATCH_COUNT = 2;

const fetchObjects = async ({ queryKey, pageParam = 0 }) => {
  const { objectIDs } = queryKey[1];
  const requests = [];

  let nextIndex = pageParam + BATCH_COUNT;
  let isLastBatch = false;
  if (nextIndex >= objectIDs.length) {
    nextIndex = objectIDs.length;
    isLastBatch = true;
  }

  for (let i = pageParam; i < nextIndex; i++) {
    const request = metAPI.url(`/objects/${objectIDs[i]}`).get().json();
    requests.push(request);
  }

  const objects = await Promise.all(requests);

  return {
    objects,
    nextIndex: isLastBatch ? undefined : nextIndex,
  };
};

export function QueryArtProvider({ children }) {
  const { isLoading: isLoadingObjectIDs, data: objectIDsData } = useQuery(
    "objectIDs",
    fetchObjectIDs
  );

  console.log("objectIDsData :>> ", objectIDsData);

  const {
    data: objectsData,
    status: objectsStatus,
    fetchNextPage: fetchNextObjects,
    hasNextPage: hasMoreObjects,
  } = useInfiniteQuery(["objects", objectIDsData], fetchObjects, {
    getNextPageParam: (lastPage) => lastPage.nextIndex,
    enabled: Boolean(objectIDsData),
  });

  let objects;
  if (objectsData) {
    objects = objectsData.pages.flatMap(({ objects }) => objects);
  }

  let initialQueryStatus = "idle";
  if (isLoadingObjectIDs && objectsStatus === "idle") {
    initialQueryStatus = "loading";
  } else if (!isLoadingObjectIDs && objectsStatus === "loading") {
    initialQueryStatus = "loading";
  } else if (!isLoadingObjectIDs && objectsStatus === "success") {
    initialQueryStatus = "success";
  }

  return (
    <QueryArtProviderContext.Provider
      value={{
        initialQueryStatus,
        objects,
        objectsStatus,
        fetchNextObjects,
        hasMoreObjects,
      }}
    >
      {children}
    </QueryArtProviderContext.Provider>
  );
}
