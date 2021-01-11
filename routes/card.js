const Router = require('express');
const router = Router();
const Card = require('../models/cardModel');
const Course = require('../models/coursesModule');

router.post('/add', async (req, res) => {
  const course = await Course.getCourseById(req.body.id);
  await Card.add(course);
  res.redirect('/card');
});

router.get('/', async (req, res) => {
  const card = await Card.fetch();
  res.render('card', {
    isCard: true,
    title: 'Card',
    courses: card.courses,
    price: card.price,
  });
});

module.exports = router;
