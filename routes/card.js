const Router = require('express');
const router = Router();
const Card = require('../models/cardModel');
const Course = require('../models/coursesModule');

router.post('/add', async (req, res) => {
  const course = await Course.getCourseById(req.body.id);
  await Card.add(course);
  const card = await Card.fetch();

  res.redirect('/card', {
    title: 'Card',
    card,
  });
});

router.get('/', async (req, res) => {
    const card = await Card.fetch();
    res.render('card', {
        
    })

})

module.exports = router;
