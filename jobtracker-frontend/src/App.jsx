import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './styles/App.css';
import JobList from './components/JobList.jsx';
import JobCard from './components/JobCard.jsx';
import JobForm from './components/JobForm.jsx';
import JobEditForm from './components/JobEditForm.jsx';
import JobOverview from './components/JobOverview.jsx';
import JobApplications from './components/JobApplications.jsx';

//Main App Component
function App() {
  return (
    <>
    {/* Creates a Browser Router to route each path to their components*/}
     <BrowserRouter>
      <nav className="navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
              <Link id="title" to="/">Job Tracker</Link>
          </div>
            <ul className="navbar-right">
            <Link to={`/JobForm`}><button id="addApplication">
                Add application +
              </button>
            </Link>
            </ul>
        </div>
      </nav>
        <Routes>
          {/* The main page has two routed components */}
          <Route path='/' element={
            <>
            <JobOverview />
            <JobList />
            </>
            } 
            />
            {/* Creates routes for each component */}
          <Route path='/applications/all' element={<JobApplications />} />
          <Route path='/applications/:jobId' element={<JobCard />} />
          <Route path='/applications/:jobId/edit' element={<JobEditForm />} />
          <Route path='/JobForm' element={<JobForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
