import { chunkArray } from "./chunkArray";
import { fetchFundsData } from "./fetchFundsData";

// Uncomment this if you want to use the resemble batching approach
export const fetchFundsWithResembleBatching = async (
  fundIds,
  chunkSize = 4,
  concurrencyLimit = 5
) => {
  console.error("Using resemble batching approach");
  const chunks = chunkArray(fundIds, chunkSize);
  const results = [];

  let index = 0;
  const activeRequests = [];

  // Function to process the next chunk in the queue
  // This will be called recursively to maintain concurrency
  // and ensure that we don't exceed the concurrency limit
  // and continue processing the next chunks
  // This is similar to the rolling window but uses a resemble batching approach
  // where we process the next chunk as soon as one finishes
  // instead of waiting for all to finish
  const processNext = async () => {
    if (index >= chunks.length) return;
    const currentChunk = chunks[index++];
    try {
      const data = await fetchFundsData(currentChunk);
      results.push(...data);
    } catch (err) {
      console.error("Error fetching chunk", currentChunk, err);
    }
    return processNext();
  };

  // Start initial pool of `concurrencyLimit` tasks
  // This will kick off the first `concurrencyLimit` number of requests
  for (let i = 0; i < concurrencyLimit; i++) {
    activeRequests.push(processNext());
  }

  // Wait until all active requests finish
  // This ensures that we maintain the concurrency limit
  await Promise.all(activeRequests);
  return results;
};
