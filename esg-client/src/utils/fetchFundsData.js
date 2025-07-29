import axios from "axios";

// Fetch data for a chunk of items (e.g., 4 items at a time)
export const fetchFundsData = async (fundIds) => {
  const response = await axios.get(
    `http://localhost:4000/api/funds?ids=${fundIds.join(",")}`
  );
  return response.data;
};
