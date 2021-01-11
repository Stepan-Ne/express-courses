// type of price
const toCurrencyPrice = (price) => {
    return new Intl.NumberFormat('us-Us', {
        currency: 'usd',
        style: 'currency',
      }).format(price);
}

// work with class price in the courses.hbs
document.querySelectorAll('.price').forEach((node) => {
  // change style of the price
  node.textContent = toCurrencyPrice(node.textContent)
});

// Delete course from price
const $card = document.querySelector('#card');
if ($card) {
    $card.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id;
      // router.delete('/remove/:id')
      fetch('/card/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.courses.length) {
            // update tab
            const html = card.courses.map((c) => {
              return `
                    <tr>
           <td>${c.title}</td>
           <td>${c.count}</td>
           <td>
               <button class='btn-small js-remove' data-id='${c.id}'>DELETE</button>
           </td>
       </tr>
            `;
            }).join('')
            $card.querySelector('tbody').innerHTML = html;
            $card.querySelector('.price').textContent = toCurrencyPrice(card.price);
          } else {
            // del tab
            $card.innerHTML = `<p>The card is empty</p>`
          }
        });
    }
  });
}
