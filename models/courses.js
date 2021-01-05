const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.id = uuidv4();
  }
  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id,
    };
  }

  async save() {
    const data = await Course.getData();
    data.push(this.toJSON());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(data), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      ;
    });
  }
  static getData() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Course;