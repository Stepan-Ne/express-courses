const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.render('add', {
        isAdd: true,
        title: 'Add'
    })
})


module.exports = router;