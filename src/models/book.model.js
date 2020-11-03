const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: String,
  description: String,
  ownerEmail: String
});

const Book = model('Book', bookSchema);

module.exports = Book;
