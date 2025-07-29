// rolling-fetch-client/src/utils/fundsWorker.js

self.onmessage = async function (e) {
  const { fundIds, chunkSize, concurrencyLimit } = e.data;

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const fetchFundsData = async (fundIds) => {
    const response = await fetch(
      `http://localhost:4000/api/funds?ids=${fundIds.join(",")}`
    );
    return response.json();
  };

  const chunks = chunkArray(fundIds, chunkSize);
  const results = [];
  let currentIndex = 0;

  const runNext = async () => {
    if (currentIndex >= chunks.length) return;

    const chunk = chunks[currentIndex++];
    try {
      const data = await fetchFundsData(chunk);
      results.push(...data);
      console.log("Chunk processed:", data); // Debugging log
      self.postMessage({ type: "chunk", data });
    } catch (err) {
      console.error("Error fetching chunk", chunk, err);
    }

    return runNext();
  };

  const workers = Array.from({ length: concurrencyLimit }, runNext);
  await Promise.all(workers);

  console.log("All chunks processed:", results); // Debugging log
  self.postMessage({ type: "complete", data: results });
};
