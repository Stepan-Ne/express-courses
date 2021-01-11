const fs = require('fs');
const path = require('path');

class CardModel {
  // ADD TO CARD
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

  // GET FROM CARD
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

  static async remove(id) {
    //get old card
    const card = await CardModel.fetch();
    const idx = card.courses.findIndex((c) => c.id === id);
    const course = card.courses[idx];
    if (course.count === 1) {
      card.courses = card.courses.filter((c) => c.id !== id);
    } else {
      card.courses[idx].count--
    }
    //  new price
    card.price -= course.price;
    // rewrite card
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'), JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          // console.log(`CARD`)
          resolve(card);
        }
      });
    });

  }
}

module.exports = CardModel;
