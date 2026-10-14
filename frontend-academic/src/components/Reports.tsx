import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_REPORT_DATA = gql`
  query GetReportData {
    getStudents {
      id
      name
      major
    }
    getEnrollments {
      student {
        id
      }
      course {
        name
      }
    }
  }
`;

export default function Reports() {
  const [showReport, setShowReport] = useState(false);
  const { loading, error, data } = useQuery<any>(GET_REPORT_DATA);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error loading reports: {error.message}</p>;

  const getStudentCourses = (studentId: number) => {
    const studentEnrollments = data?.getEnrollments?.filter(
      (enrollment: any) => enrollment.student.id === studentId
    );
    
    if (!studentEnrollments || studentEnrollments.length === 0) {
      return "None";
    }

    return studentEnrollments.map((e: any) => e.course.name).join(', ');
  };

  return (
    <div className="panel">
      <h2>Academic Report</h2>
      
      <button 
        onClick={() => setShowReport(true)} 
        style={{ marginBottom: '1.5rem', background: '#2563eb' }}
      >
        Generate Report
      </button>

      {showReport && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data?.getStudents?.map((student: any) => (
            <div 
              key={student.id} 
              style={{ 
                background: '#f8fafc', 
                padding: '1rem', 
                borderRadius: '8px', 
                borderLeft: '4px solid #2563eb' 
              }}
            >
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                {student.name} <span style={{ fontWeight: 'normal', color: '#475569' }}>— {student.major}</span>
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155' }}>
                <strong>Courses:</strong> {getStudentCourses(student.id)}
              </p>
            </div>
          ))}

          {data?.getStudents?.length === 0 && (
            <p style={{ textAlign: 'center' }}>No students registered yet.</p>
          )}
        </div>
      )}
    </div>
  );
}