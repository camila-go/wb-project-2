import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Course, CourseRegistration, Student } from './src/model.js';

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

// Custom route middleware function that checks if the user is logged in.
function loginRequired(req, res, next) {
  if (!req.session.studentId) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

// API to list all courses available
app.get('/api/courses', async (req, res) => {
  const allCourses = await Course.findAll();
  res.json(allCourses);
});

// API endpoint to get a studentId registered for a course
app.get('/api/courseReg/:studentId', async (req, res) => {  
  const { studentId } = req.params;  

  try {  
    const registrations = await CourseRegistration.findAll({  
      where: { studentId: studentId },  
    });  

    if (registrations.length === 0) {  
      return res.status(404).json({ message: 'No registrations found for this student.' });  
    }  

  //  res.json(registrations);  
 // } catch (error) {  
   // console.error('Error fetching course registrations:', error);  
  //  res.status(500).json({ message: 'Internal server error' });  
//  }  
//});  

    // Map over the found registrations to format the data if needed  
    const formattedCourseRegs = registrations.map(reg => ({  
      crId: reg.crId,  
      studentId: reg.studentId,  
      courseId: reg.courseId,  
    }));  

    res.json(formattedCourseRegs);  
  } catch (error) {  
    console.error('Error fetching course registrations:', error);  
    res.status(500).json({ message: 'Internal server error' });  
  }  
});  

// API to get the course a student is registered to
app.post('/api/courseReg', loginRequired, async (req, res) => {
  const { studentId } = req.session;
  const { courseId, score } = req.body;

  const student = await Student.findByPk(studentId);
  const courseReg = await CourseRegistration.createCourseReg({ courseId: courseId, studentId: studentId });

  res.json(courseReg);
});

// API to register a new student
app.post('/register', async (req, res) => {  
  const { firstName, lastName, email, password } = req.body;  

  try {  
    // Check if the student already exists  
    const existingStudent = await getStudentByEmail(email);  
    if (existingStudent) {  
      return res.status(400).json({ message: 'Student already exists' });  
    }  

    // password  
    const Password = await (password, 10);  

    // Create student  
    const student = await createStudent(firstName, lastName, email, password);  

    res.status(201).json({ message: 'Student registered successfully', student });  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ message: 'Internal server error' });  
  }  
});  

// API to validate the student's password is correct
app.post('/api/studentAuth', async (req, res) => {
  const { studentId, password } = req.body;
  console.log(req.body)
  try {
    const student = await Student.findOne({ where: { studentId } });

  if (student && student.password === password) {
    req.session.studentId = student.studentId;
    return res.json({ success: true });
  }
  // If student does not exist or password does not match  
  return res.json({ success: false, message: 'Invalid studentId or password' });  
} catch (error) {  
  console.error('Error during student authentication:', error);  
  return res.status(500).json({ message: 'Internal server error' });  
}  
});  


  // } else {
  //   return res.json({ success: false });
  // }
// } catch (error) {  
//   console.error('Error during student authentication:', error);  
//   res.status(500).json({ message: 'Internal server error' });  
// }  
// });

// Note the `loginRequired` argument passed to the routes below!


// API to logout a student
app.post('/api/logout', loginRequired, (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// app.post('/api/courseReg', loginRequired, async (req, res) => {
  //const { studentId } = req.session;
  //const { courseId, signUp } = req.body;

  //const student= await Student.findByPk(studentId);
  //const courseReg = await student.createCourseReg({ courseId: courseId });

  //res.json(courseReg);
//});
//app.get('/api/courseReg/:studentId', loginRequired, async (req, res) => {  
 // const { studentId } = req.params; // Get studentId from params  

  // Find course registrations for a specific student  
  //const courseRegs = await CourseRegistration.findAll({  
   // where: { studentId: studentId },  
    // Include related models if necessary, e.g., Course  
 // });  

 // res.json(courseRegs); // Send the list of course registrations  
//});


//app.get('/api/courseReg/:studentId', loginRequired, async (req, res) => {  
  //const { studentId } = req.params; // Get studentId from params  

  //try {  
    //const courseRegs = await CourseRegistration.findAll({  
      //where: { studentId: studentId },  
      // You might want to include related models, such as Course  
   // });  

    // Map over the found registrations to format the data if needed  
    //const formattedCourseRegs = courseRegs.map(reg => {  
      //return {  
       // crId: reg.crId,  
      //  studentId: reg.studentId,  
     //   courseId: reg.courseId,  
     // };  
   // });  

 //   res.json(formattedCourseRegs); // Send the formatted list of course registrations  
 // } catch (error) {  
  //  console.error(error);  
  //  res.status(500).json({ error: 'An error occurred while fetching course registrations' });  
  //}  
//});

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
