
// import { Link, useLoaderData } from 'react-router-dom';  
import axios from 'axios';
import { invoke } from 'lodash';
import { useEffect, useState } from 'react';
 
export default function YourStudentSchedulePage() {
useEffect(()=>{
  retrieveStudentId()
}, [])
const [courseRegistrationList, setCourseRegistrationList]= useState([])
  async function retrieveStudentId() {
    const studentIdResponse = await axios.get('/api/student')
    const studentId=studentIdResponse.data?.studentId
    retrieveStudentRecords(studentId)
  }
  async function retrieveStudentRecords (studentId) {
    const courseList = await axios.get(`/api/courseReg/${studentId}`)
   setCourseRegistrationList(courseList.data) 
    console.log(courseList)
}
console.log(courseRegistrationList)

return (  
  <>  
    <h2>Hello [firstName], [studentId]</h2>  
    <p>These are the courses you are registered for:</p>  
    <ul>  
      {courseRegistrationList.map((course) => (  
        <li key={course.crId}>{course.courseId} - Student: {course.studentId}</li>  
      ))}  
    </ul>  
  </>  
);  

  // return (
  //   <>
  //     <h2>Hello [firstName], [studentId]</h2>
  //     <p>These are the courses you are registered for:</p>        
  //     <ul>{courseRegistrationList}</ul>
  //   </>
  // );

   
}

