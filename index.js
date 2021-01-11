const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRouter = require('./routes/card');


const app = express();
// customization of handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
// registration this module as engine
app.engine('hbs', hbs.engine)
// config express
app.set('view engine', 'hbs')
app.set('views', 'views')

// registr folder with css
app.use(express.static(path.join(__dirname, 'public')))
// encoded
app.use(express.urlencoded({ extended: true }))



app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})