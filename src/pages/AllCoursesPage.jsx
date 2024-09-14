import { Link, useLoaderData } from 'react-router-dom';

export default function AllCoursesPage() {
  const { courses } = useLoaderData();

  const courseList = courses.map(({ courseId, courseName,courseDates, location, schedule, tuition}) => (
    <li key={courseId}>
      {courseId},{courseName}, {courseDates}, {location}, {schedule}, {tuition}
    </li>
  ));

  return (
    <>
      <h2>Welcome [firstName], [studentId]</h2>
      <p>Register for classes below </p>        
      <ul>{courseList}</ul>
    </>
  );
}
