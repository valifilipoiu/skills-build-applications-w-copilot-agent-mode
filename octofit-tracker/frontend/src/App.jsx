import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function HomePage() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4 mb-5">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-3">Train smarter, compete together.</h1>
          <p className="lead text-secondary mb-4">
            Monitor users, teams, activity, and performance across your modern fitness ecosystem.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <NavLink className="btn btn-primary btn-lg" to="/leaderboard">View leaderboard</NavLink>
            <NavLink className="btn btn-outline-primary btn-lg" to="/activities">Track activity</NavLink>
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

      <div className="row g-4">
        <div className="col-md-6"><Users /></div>
        <div className="col-md-6"><Activities /></div>
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
          <div className="navbar-nav ms-auto gap-3">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
