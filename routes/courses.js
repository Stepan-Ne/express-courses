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

module.exports = router;