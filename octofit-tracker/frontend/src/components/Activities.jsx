import { useEffect, useState } from 'react';

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

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const payload = await fetchJson(`${getApiBaseUrl()}/api/activities`, { signal: controller.signal });
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load activities from the API.');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-muted">Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <ul className="list-group list-group-flush">
          {items.map((activity) => (
            <li key={activity._id ?? `${activity.type}-${activity.date}`} className="list-group-item">
              <strong>{activity.type}</strong>
              <div className="text-muted small">{activity.durationMinutes} minutes • {activity.caloriesBurned} cal</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
