
//import { courseReg } from '/api/courseReg'; // Import your API function  
import { Link, useLoaderData } from 'react-router-dom';  
//import axios from 'axios';  

// Loader function to fetch course registrations by studentId  
export default function YourStudentRegistrationPage() {
  const { courseReg } = useLoaderData();

//export async function loader({ params }) {  
  const studentId = params.studentId; // Assuming studentId is passed in the route params  
  //const courseRegistration = await courseReg(studentId);  
  const courseRegistrationList = courseReg.map (({ courseId, studentId, crId }) => (
    <li key={crId}>
      {crId},{courseId},{studentId}
    </li>
  ));

  return (
    <>
      <h2>Hello [firstName], [studentId]</h2>
      <p>These are the courses you are registered for:</p>        
      <ul>{courseRegistrationList}</ul>
    </>
  );

   // const courseRegistrationList = courseRegistration.map(({ crId, studentId, courseId }) => {  
  //   return (  
  //     <li key={crId}> {/* Use crId as the key */}  
  //       <Link to={`/courses/${courseId}`}>{courseName}</Link>  
  //       <span> (Student ID: {studentId})</span> {/* Display studentId */}  
  //     </li>  
  //   );  
  // });  

  //const courseRegistration = await axios.get(`/api/courseReg/${studentId}`);  
  //return json({ courseRegistration });  
  //return json({ courseRegistration: courseRegistration.data }); // Adjust according to the API response  
}

//export default function YourStudentSchedulePage() {  
 // const { courseRegistration } = useLoaderData(); // Assuming courseRegistration includes studentId  

  // const courseRegistrationList = courseRegistration.map(({ crId, studentId, courseId }) => {  
  //   return (  
  //     <li key={crId}> {/* Use crId as the key */}  
  //       <Link to={`/courses/${courseId}`}>{courseName}</Link>  
  //       <span> (Student ID: {studentId})</span> {/* Display studentId */}  
  //     </li>  
  //   );  
  // });  

  // return (  
  //   <> 
  //     <YourStudentRegistrationPage/>
  //     <h1>Your Schedule</h1>  
  //     {/* <ul>{courseRegistrationList}</ul>   */}
  //   </>  
  // );  
// }
