import { useState } from "react";
import { fetchFundsWithRollingWindow } from "./utils/fetchFundsWithRollingWindow";

function App() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFunds = async () => {
    setLoading(true);
    // Simulate fetching 100 fund IDs
    const mockFundIds = Array.from({ length: 100 }, (_, i) =>
      (i + 1).toString()
    );

    // Simulate fetching funds with rolling window
    const result = await fetchFundsWithRollingWindow(mockFundIds);
    setFunds(result);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Fund Data Simulator</h1>
      <button onClick={loadFunds} disabled={loading}>
        {loading ? "Loading..." : "Fetch 100 Funds"}
      </button>

      <ul>
        {funds.map((fund) => (
          <li key={fund.id}>
            {fund.name} — Score: {fund.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
