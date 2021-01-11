const fs = require('fs');
const path = require('path');

class CardModel {
  static async add(course) {
    // get the cart content
    const card = await CardModel.fetch();

    // if we have course, we may ++ its count
    const idx = card.courses.findIndex((c) => c.id === course.id);
    // попробуем записать что-то под этим index
    const courseInCard = card.courses[idx];
    // lets check it
    if (courseInCard) {
      // we have the course
      courseInCard.count++;
      card.courses[idx] = courseInCard;
    } else {
      // haven`t the course
      course.count = 1;
      card.courses.push(course);
    }
    // price
    card.price += +course.price;
    // at the end lets write

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'), JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          // console.log(`CARD`)
          resolve();
        }
      });
    });
  }

  static async fetch() {
    // read card (in Promise)
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'card.json'), 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = CardModel;
