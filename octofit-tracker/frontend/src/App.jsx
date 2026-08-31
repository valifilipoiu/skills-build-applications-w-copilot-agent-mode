import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

function HomePage() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-3">Train smarter, compete together.</h1>
          <p className="lead text-secondary mb-4">
            A modern activity tracker for workouts, teams, leaderboards, and progress insights.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <button className="btn btn-primary btn-lg">View leaderboard</button>
            <button className="btn btn-outline-primary btn-lg">Track activity</button>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <div className="card-body">
              <h2 className="h4 fw-bold mb-3">Today at a glance</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">Workout streak: 18 days</li>
                <li className="list-group-item px-0">Active teams: 5</li>
                <li className="list-group-item px-0">Top score: 8,450</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeaderboardPage() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Leaderboard</h2>
      <div className="list-group">
        {['Ava', 'Noah', 'Mila', 'Leo', 'Ivy'].map((name, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={name}>
            <span>{index + 1}. {name}</span>
            <span className="badge bg-primary rounded-pill">{9000 - index * 300}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">OctoFit</span>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
