const express = require('express');
const router = express.Router();
const Student = require('../../db/schema/studSchema'); 
const Department = require('../../db/schema/deptSchema'); 
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('dept');
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Internal server error',
         });
    }
});
router.get('/search', async (req, res) => {
    try {
        const queryParams = req.query;
        const filters = {};
        if (queryParams.name) {
            filters.name = { $regex: queryParams.name, $options: 'i' };
        }
        if (queryParams.registrationNumber) {
            filters.registrationNumber = queryParams.registrationNumber;
        }
        const students = await Student.find(filters).populate('dept');
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Internal server error',
         });
    }
});
router.post('/', async (req, res) => {
    try {
        const { registrationNumber, name, age, grade, department } = req.body;
        const dept = await Dept.findById(dept);
        if (!dept) return res.status(400).json({ 
            message: 'Dept not found' ,
        });
        const newStudent = new Student({ registrationNumber, name, age, grade, department });
        await newStudent.save();
        res.status(201).json({
             message: 'Student added successfully' ,
            });
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'Registration Number must be unique' });
        }
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updateData = req.body;
        const student = await Student.findByIdAndUpdate(studentId, updateData, { new: true });
        if (!student) 
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findByIdAndDelete(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/dept', async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/dept/search', async (req, res) => {
    try {
        const queryParams = req.query;
        const filters = {};

        if (queryParams.name) {
            filters.name = { $regex: queryParams.name, $options: 'i' };
        }

        const dept = await Department.find(filters);
        res.status(200).json(departments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/dept/:id/stud', async (req, res) => {
    try {
        const deptId = req.params.id;
        const stud = await Student.find({ dept: deptId }).populate('dept');
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.delete('/dept/:id', async (req, res) => {
    try {
        const depatId = req.params.id;
        const stut = await Student.find({ dept: deptId });
        if (students.length > 0) return res.status(400).json({ 
            message: 'Department has students. Remove students first.',
         });
        const dept = await Dept.findByIdAndDelete(deptId);
        if (!dept) return res.status(404).json({ 
            message: 'Department not found' ,
        });
        res.status(200).json({ 
            message: 'Department deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Internal server error'
         });
    }
});

module.exports = router;