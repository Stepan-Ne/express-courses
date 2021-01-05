const { Router } = require('express');
const router = Router();
const Course = require('../models/coursesModule');

router.get('/', (req, res) => {
    res.render('add', {
        isAdd: true,
        title: 'Add'
    })
})

router.post('/', async (req, res) => {
    
    const course = new Course(req.body.title, req.body.price, req.body.img)

    //console.log(req.body)
    await course.save()

    res.redirect('/')
})


module.exports = router;