import { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

const GET_STUDENTS = gql`
  query GetStudents {
    getStudents {
      id
      name
      major
      semester
    }
  }
`;

const CREATE_STUDENT = gql`
  mutation CreateStudent($name: String!, $major: String!, $semester: Int!) {
    createStudent(name: $name, major: $major, semester: $semester) {
      id
      name
    }
  }
`;

interface Student {
  id: number;
  name: string;
  major: string;
  semester: number;
}

export default function Students() {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [semester, setSemester] = useState('');

  const { loading, error, data, refetch } = useQuery<any>(GET_STUDENTS);

  const [createStudent, { loading: creating }] = useMutation(CREATE_STUDENT, {
    onCompleted: () => {
      setName('');
      setMajor('');
      setSemester('');
      refetch(); 
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createStudent({ 
      variables: { 
        name, 
        major, 
        semester: parseInt(semester)
      } 
    });
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading: {error.message}</p>;

  return (
    <div className="panel">
      <h2>Student Management</h2>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
        <select 
          value={major} 
          onChange={(e) => setMajor(e.target.value)} 
          required
        >
          <option value="">-- Select Major --</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Computer Science">Computer Science</option>
        </select>

        <input 
          type="number" 
          placeholder="Semester (e.g., 8)" 
          value={semester} 
          onChange={(e) => setSemester(e.target.value)} 
          required 
          min="1"
          max="10"
        />
        <button type="submit" disabled={creating}>
          {creating ? 'Saving...' : 'Register Student'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Major</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {data?.getStudents?.map((student: Student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.major}</td>
              <td>{student.semester}</td>
            </tr>
          ))}
          {data?.getStudents?.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No students registered.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}