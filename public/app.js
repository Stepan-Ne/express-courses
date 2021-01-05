// work with class price in the courses.hbs
document.querySelectorAll('.price').forEach(node => {
    // change style of the price
    node.textContent = new Intl.NumberFormat('us-Us', {
        currency: 'usd',
        style: 'currency'
    }).format(node.textContent)
})