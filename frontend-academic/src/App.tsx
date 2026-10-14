import { useState } from 'react';
import Students from './components/Students';
import Courses from './components/Courses';
import Enrollments from './components/Enrollments';
import Reports from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <>
      <header>
        <h1>Academic Management System</h1>
        <p>Comprehensive university administration platform</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={() => setActiveTab('students')}
            style={{ background: activeTab === 'students' ? '#1d4ed8' : '#2563eb' }}
          >
            Students
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            style={{ background: activeTab === 'courses' ? '#1d4ed8' : '#2563eb' }}
          >
            Courses
          </button>
          <button 
            onClick={() => setActiveTab('enrollments')}
            style={{ background: activeTab === 'enrollments' ? '#1d4ed8' : '#2563eb' }}
          >
            Enrollments
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            style={{ background: activeTab === 'reports' ? '#1d4ed8' : '#2563eb' }}
          >
            Reports
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'students' && <Students />}
        {activeTab === 'courses' && <Courses />}
        {activeTab === 'enrollments' && <Enrollments />}
        {activeTab === 'reports' && <Reports />}
      </main>

      <footer>
        Software Architecture Practice — GraphQL
      </footer>
    </>
  );
}

export default App;