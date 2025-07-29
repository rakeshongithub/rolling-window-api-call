import { chunkArray } from "./chunkArray";
import { fetchFundsData } from "./fetchFundsData";

// Rolling window to maintain concurrency of 5
export const fetchFundsWithRollingWindow = async (
  fundIds,
  chunkSize = 4,
  concurrencyLimit = 5
) => {
  console.error("Using rolling window approach");
  // Split the fund IDs into chunks of size `chunkSize`
  const chunks = chunkArray(fundIds, chunkSize);
  const results = [];

  let currentIndex = 0;

  // Function to run the next chunk in the queue
  // This will be called recursively to maintain concurrency
  // and ensure that we don't exceed the concurrency limit
  // and continue processing the next chunks
  const runNext = async () => {
    if (currentIndex >= chunks.length) return;

    const chunk = chunks[currentIndex++];
    try {
      const data = await fetchFundsData(chunk);
      results.push(...data);
    } catch (err) {
      console.error("Error fetching chunk", chunk, err);
    }

    // Start next one when this is done
    return runNext();
  };

  // Start initial pool of `concurrencyLimit` tasks
  const workers = Array.from({ length: concurrencyLimit }, runNext);

  // Wait until all workers finish
  await Promise.all(workers);
  return results;
};
