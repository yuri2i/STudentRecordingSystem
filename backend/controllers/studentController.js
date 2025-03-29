const { v4: uuidv4 } = require("uuid");
 let students = [];
 
 
 const getStudents = (req, res) => res.json(students);
 
 
 // const addStudent = (req, res) => {
 //     const { name, course } = req.body;
 //     const newStudent = { id: uuidv4(), name, course };
 //     students.push(newStudent);
 //     res.status(201).json(newStudent);
 // };
 
 const addStudent = (req, res) => {
     const { name, course, image } = req.body; // Add 'image'
 
     // Check if a student with the SAME course already exists
     const exists = students.some(student => student.course.toLowerCase() === course.toLowerCase());
 
     if (exists) {
         return res.status(400).json({ message: "This course is already registered!" });
     }
 
     // Allow same name, but unique course
     const newStudent = { id: uuidv4(), name, course, image };
     students.push(newStudent);
     
     res.status(201).json({ message: "Student added successfully!", student: newStudent });
 };
 
 // const updateStudent = (req, res) => {
 //     const { id } = req.params;
 //     const { name, course } = req.body;
 //     const student = students.find(s => s.id === id);
 //     if (!student) return res.status(404).json({ message: "Student not found" });
 //     student.name = name;
 //     student.course = course;
 //     res.status(200).json(student);
 
 // };
 
 const updateStudent = (req, res) => {
     const { id } = req.params;
     const { name, course, image } = req.body;
     const student = students.find(s => s.id === id);
 
     if (!student) {
         return res.status(404).json({ message: "Student not found" });
     }
 
     student.name = name;
     student.course = course;
     student.image = image; // Update image as well
 
     res.status(200).json({ message: "Student updated successfully!", student });
 };
 
 
 
 const deleteStudent = (req, res) => {
     students = students.filter(s => s.id !== req.params.id);
     res.status(200).json({ message: "Student deleted" });
 };
 
 
 module.exports = { getStudents, addStudent, updateStudent, deleteStudent };