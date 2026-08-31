import { useEffect, useState } from 'react';

const LEADERBOARD_API = '/api/leaderboard/';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const payload = await fetchJson(`${getApiBaseUrl()}${LEADERBOARD_API}`, { signal: controller.signal });
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load leaderboard from the API.');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <ul className="list-group list-group-flush">
          {items.map((entry) => (
            <li key={entry._id ?? entry.user?._id ?? entry.rank} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{entry.rank}. {entry.user?.name ?? 'Unknown user'}</span>
              <span className="badge bg-primary rounded-pill">{entry.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
