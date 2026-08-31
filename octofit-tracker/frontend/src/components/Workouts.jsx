import { useEffect, useState } from 'react';

const WORKOUTS_API = '/api/workouts/';

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

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const payload = await fetchJson(`${getApiBaseUrl()}${WORKOUTS_API}`, { signal: controller.signal });
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load workouts from the API.');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <ul className="list-group list-group-flush">
          {items.map((workout) => (
            <li key={workout._id ?? workout.title} className="list-group-item">
              <strong>{workout.title}</strong>
              <div className="text-muted small">{workout.category} • {workout.durationMinutes} min</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
