const { Router } = require('express')
const router = Router();
const Course = require('../models/coursesModule');

 router.get('/', async (req, res) => {

    const courses = await Course.getData()
     res.render('courses', {
        isCourses: true,
        title: 'Courses',
        courses
     })
 })

 router.get('/:id', async (req, res) => {
    
const course = await Course.getCourseById(req.params.id)

   res.render('course', {
      title: `Course ${course.title}`,
      course,
      layout: 'empty'
   })
 })

 // Edit the Course
 router.get('/:id/edit', async (req, res) => {
   const course = await Course.getCourseById(req.params.id)


    res.render('edit-course', {
       title: 'Edit',
       course
    })
 })

 // send form of edit
 router.post('/lala', async (req, res) => {
 await Course.update(req.body)
 
res.redirect('/courses')
 })


module.exports = router;