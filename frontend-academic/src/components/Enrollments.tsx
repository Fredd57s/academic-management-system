import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

const GET_STUDENTS_AND_COURSES = gql`
  query GetStudentsAndCourses {
    getStudents {
      id
      name
    }
    getCourses {
      id
      name
      instructor
    }
  }
`;

const GET_ENROLLMENTS = gql`
  query GetEnrollments {
    getEnrollments {
      id
      student {
        id
        name
      }
      course {
        id
        name
        instructor
      }
    }
  }
`;

const CREATE_ENROLLMENT = gql`
  mutation CreateEnrollment($studentId: Int!, $courseId: Int!) {
    createEnrollment(studentId: $studentId, courseId: $courseId) {
      id
    }
  }
`;

interface Enrollment {
  id: number;
  student: { id: number; name: string };
  course: { id: number; name: string; instructor: string };
}

export default function Enrollments() {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');

  const { data: dropdownData, loading: loadingDropdowns } = useQuery<any>(GET_STUDENTS_AND_COURSES);
  const { data: enrollmentsData, loading: loadingEnrollments, refetch } = useQuery<any>(GET_ENROLLMENTS);

  const [createEnrollment, { loading: creating, error: mutationError }] = useMutation(CREATE_ENROLLMENT, {
    onCompleted: () => {
      setStudentId('');
      setCourseId('');
      refetch();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEnrollment({
      variables: {
        studentId: parseInt(studentId),
        courseId: parseInt(courseId)
      }
    });
  };

  if (loadingDropdowns || loadingEnrollments) return <p>Loading enrollment system...</p>;

  return (
    <div className="panel">
      <h2>Enrollment Management</h2>
      
      <form onSubmit={handleSubmit}>
        <select 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          required
        >
          <option value="">-- Select Student --</option>
          {dropdownData?.getStudents?.map((student: any) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>

        <select 
          value={courseId} 
          onChange={(e) => setCourseId(e.target.value)} 
          required
        >
          <option value="">-- Select Course & Instructor --</option>
          {dropdownData?.getCourses?.map((course: any) => (
            <option key={course.id} value={course.id}>
              {course.name} (Taught by: {course.instructor})
            </option>
          ))}
        </select>

        <button type="submit" disabled={creating}>
          {creating ? 'Processing...' : 'Enroll Student'}
        </button>
        {mutationError && <p style={{ color: '#dc2626', width: '100%', marginTop: '0.5rem' }}>Error enrolling: {mutationError.message}</p>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Enrollment ID</th>
            <th>Student</th>
            <th>Course</th>
            <th>Instructor</th>
          </tr>
        </thead>
        <tbody>
          {enrollmentsData?.getEnrollments?.map((enrollment: Enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.id}</td>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.course.name}</td>
              <td>{enrollment.course.instructor}</td>
            </tr>
          ))}
          {enrollmentsData?.getEnrollments?.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No enrollments registered.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}