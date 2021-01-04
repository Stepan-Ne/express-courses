const { Router } = require('express')
const router = Router();

 router.get('/', (req, res) => {
     res.render('courses', {
        isCourses: true,
        title: 'Courses' 
     })
 })

module.exports = router;