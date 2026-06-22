import { useEffect, useState } from "react";
import api from "../services/api";

function MyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get("/result/my-results", {
        withCredentials: true,
      });

      setResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>📊 My Results</h1>

      {results.length === 0 ? (
        <h2>No Results Found</h2>
      ) : (
        results.map((result) => (
          <div
            key={result._id}
            className="stat-card"
            style={{ marginBottom: "20px" }}
          >
            <h2>{result.quizId?.title}</h2>
            <h3>Score : {result.score}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default MyResults;