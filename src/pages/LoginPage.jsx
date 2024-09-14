import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {

    const res = await axios.post('/api/studentAuth', formData);

    if (res.data.success) {
      navigate('/me');
    }
  };

  return (
    <>
    
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

// const ParentComponent = () => {  
//   const handleSubmit = async ({ studentId, password }) => {  
//     const response = await fetch('/api/studentAuth', {  
//       method: 'POST',  
//       headers: {  
//         'Content-Type': 'application/json',  
//       },  
//       body: JSON.stringify({ studentId, password }),  
//     });  

//     const data = await response.json();  

//     if (!data.success) {  
//       throw new Error('Invalid credentials'); // Trigger the catch block in LoginForm  
//     }  

//     // Proceed to redirect or update state after successful login  
//   };  

//   return <LoginForm onLogin={handleSubmit} />;  
// };  

// export default ParentComponent;
