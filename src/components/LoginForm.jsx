// import { useState } from 'react';

// export default function LoginForm({ onLogin }) {
//   const [studentIdValue, setStudentIdValue] = useState('');
//   const [passwordValue, setPasswordValue] = useState('');

//   return (
//     <form
//       onSubmit={(e) => {
//         onLogin(e, {
//           studentId: studentIdValue,
//           password: passwordValue,
//         });
//       }}
//     >
//       <label htmlFor="studentId">Student Id:</label>
//       <input
//         name="studentId"
//         id="studentId"
//         type="text"
//         required
//         onChange={(e) => setStudentIdValue(e.target.value)}
//       />
//       <label htmlFor="password">Password:</label>
//       <input
//         name="password"
//         id="password"
//         type="password"
//         required
//         onChange={(e) => setPasswordValue(e.target.value)}
//       />
//       <button type="submit">Log In</button>
//     </form>
//   );
// }


//Second try
// import { useState } from 'react';  
// import { useNavigate } from 'react-router-dom'; 

// export default function LoginForm({ onLogin }) {  
//   const [studentIdValue, setStudentIdValue] = useState('');  
//   const [passwordValue, setPasswordValue] = useState('');  
//   const [errorMessage, setErrorMessage] = useState(''); // To capture error messages  
//   const [isLoading, setIsLoading] = useState(false); // For loading state  
//   const navigate = useNavigate(); // Use the useNavigate hook  


//   const handleSubmit = async (e) => {  
//     e.preventDefault(); // Prevent default form submission  
//     setErrorMessage(''); // Clear any existing error message  
//     setIsLoading(true); // Set loading state to true  
    

//     try {  
//       // Use the onLogin function provided via props  
//       await onLogin({ studentId: studentIdValue, password: passwordValue });  
//     } catch (error) {  
//       // Handle any errors from the login attempt  
//       setErrorMessage('Login failed. Please check your credentials.'); // Set failure message  
//     } finally {  
//       setIsLoading(false); // Reset loading state  
//     }  
//   };  

//   return (  
//     <form onSubmit={handleSubmit}>  
//       <div>  
//         <label htmlFor="studentId">Student Id:</label>  
//         <input  
//           name="studentId"  
//           id="studentId"  
//           type="text"  
//           value={studentIdValue} // Control input's value  
//           onChange={(e) => setStudentIdValue(e.target.value)}  
//           required  
//         />  
//       </div>  
//       <div>  
//         <label htmlFor="password">Password:</label>  
//         <input  
//           name="password"  
//           id="password"  
//           type="password"  
//           value={passwordValue} // Control input's value  
//           onChange={(e) => setPasswordValue(e.target.value)}  
//           required  
//         />  
//       </div>  
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}  
//       <button type="submit" disabled={isLoading}>  
//         {isLoading ? 'Logging In...' : 'Log In'}  
//       </button>  
//     </form>  
//   );  
// }


import { useState } from 'react';  
import { useNavigate } from 'react-router-dom';   

export default function LoginForm({ onLogin }) {  
  const [studentIdValue, setStudentIdValue] = useState('');  
  const [passwordValue, setPasswordValue] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setErrorMessage('');  
    setIsLoading(true);  
    console.log(studentIdValue, passwordValue)
    try {  
      const success = await onLogin({ studentId: studentIdValue, password: passwordValue });  
      if (success) {  
        setStudentIdValue(''); // Clear input  
        setPasswordValue(''); // Clear password  
       // navigate('/api/courses'); // Navigate on success  
      } 
      else {  
       setErrorMessage('Login failed. Please check your credentials.');  
      }  
    } catch (error) {  
      console.log(error, 'login error')
      setErrorMessage('An error occurred during login. Please try again.');  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  return (  
    
    <form onSubmit={handleSubmit}>  
      <div>  
        <h2>Welcome to LearnMountain</h2>
        <p>Welcome, register or sign in to get started</p>
        <br></br>
        <label htmlFor="studentId">Student Id:</label>  
        <input  
          name="studentId"  
          id="studentId"  
          type="text"  
          value={studentIdValue}  
          onChange={(e) => setStudentIdValue(e.target.value)}  
          required  
        />  
      </div>  
      <div>  
        <label htmlFor="password">Password:</label>  
        <input  
          name="password"  
          id="password"  
          type="password"  
          value={passwordValue}  
          onChange={(e) => setPasswordValue(e.target.value)}  
          required  
        />  
      </div>  
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
      <button type="submit" disabled={isLoading}>  
        {isLoading ? 'Logging In...' : 'Log In'}  
      </button>  
    </form>  
  );  
}