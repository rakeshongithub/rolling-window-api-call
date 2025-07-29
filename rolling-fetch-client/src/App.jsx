import { useFundsWorker } from "./hooks/useFundsWorker";

function App() {
  const { funds, loading, loadFunds } = useFundsWorker();

  const handleLoadFunds = () => {
    const mockFundIds = Array.from({ length: 100 }, (_, i) =>
      (i + 1).toString()
    );
    loadFunds(mockFundIds);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Fund Data Simulator</h1>
      <button onClick={handleLoadFunds} disabled={loading}>
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
