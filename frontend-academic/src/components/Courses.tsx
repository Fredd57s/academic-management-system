import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id
      name
      instructor
      capacity
    }
  }
`;

const CREATE_COURSE = gql`
  mutation CreateCourse($name: String!, $instructor: String!, $capacity: Int!) {
    createCourse(name: $name, instructor: $instructor, capacity: $capacity) {
      id
      name
    }
  }
`;

interface Course {
  id: number;
  name: string;
  instructor: string;
  capacity: number;
}

export default function Courses() {
  const [name, setName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [capacity, setCapacity] = useState('');

  const { loading, error, data, refetch } = useQuery<any>(GET_COURSES);

  const [createCourse, { loading: creating, error: mutationError }] = useMutation(CREATE_COURSE, {
    onCompleted: () => {
      setName('');
      setInstructor('');
      setCapacity('');
      refetch(); 
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cap = parseInt(capacity);
    
    // Validación extra de seguridad
    if (cap < 1 || cap > 60) {
      alert("Error: Course capacity must be between 1 and 60.");
      return;
    }

    createCourse({ 
      variables: { 
        name, 
        instructor, 
        capacity: cap 
      } 
    });
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading: {error.message}</p>;

  return (
    <div className="panel">
      <h2>Course Management</h2>
      
      <form onSubmit={handleSubmit}>
        <select 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        >
          <option value="">-- Select Course Name --</option>
          <option value="Software Architecture">Software Architecture</option>
          <option value="Database Systems">Database Systems</option>
          <option value="Web Development">Web Development</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Mobile Development">Mobile Development</option>
        </select>
        
        <select 
          value={instructor} 
          onChange={(e) => setInstructor(e.target.value)} 
          required
        >
          <option value="">-- Select Instructor --</option>
          <option value="Ing. Carlos Ruiz">Ing. Carlos Ruiz</option>
          <option value="Dra. Ana Gomez">Dra. Ana Gomez</option>
          <option value="MSc. Luis Silva">MSc. Luis Silva</option>
        </select>

        <input 
          type="number" 
          placeholder="Capacity (Max 60)" 
          value={capacity} 
          onChange={(e) => {
            // Evitamos que ingresen números de más de 2 dígitos de longitud
            if (e.target.value.length <= 2) {
              setCapacity(e.target.value);
            }
          }} 
          required 
          min="1"
          max="60"
        />
        <button type="submit" disabled={creating}>
          {creating ? 'Saving...' : 'Create Course'}
        </button>
        {mutationError && <p style={{ color: '#dc2626', width: '100%', marginTop: '0.5rem' }}>Error: {mutationError.message}</p>}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {data?.getCourses?.map((course: Course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{course.capacity}</td>
            </tr>
          ))}
          {data?.getCourses?.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No courses registered.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}