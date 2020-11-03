const Book = require('../../models/book.model');

module.exports = {
  createBook: async (book) => {
    const { title, description, ownerEmail } = book;
    const newBook = new Book({title, description, ownerEmail});
    
    try {
      return await newBook.save()
    } catch (error) {
      throw error
    }
  },

  getAllBooks: async () => {
    return Book.find({})
    .select('-__v')
    .exec();
  },

  getBook: async (id) => {
    return Book.findById(id)
    .select('-__v')
    .exec();
  },

  updateBook: async (id, book) => {
    const updatedBook = await Book.findById(id);
    const { title, description, ownerEmail } = book;
    updatedBook.title = title;
    updatedBook.description = description;
    updatedBook.ownerEmail = ownerEmail;

    try {
      return await updatedBook.save()
    } catch (error) {
      throw error
    }
  },

  deleteBook: async (id) => {
    return await Book.deleteOne({_id: id});
  }
}
