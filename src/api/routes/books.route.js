const router = require('express').Router();
const booksController = require('../controllers/books.controller');
const { body, validationResult } = require('express-validator');

router.post('/', [
  body('title').isLength({ max: 20 }),
  body('description').isLength({ max: 200 }),
  body('ownerEmail').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const savedBook = await booksController.createBook(req.body);
      res.status(201).json({ msg: 'new book was added to database',  savedBook });
    } catch (error) {
      res.status(500).json({ error: error.name,  msg: error.message });
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const Allbooks = await booksController.getAllBooks();
    res.status(200).json({ Allbooks });
  } catch (error) {
    res.status(500).json({ error: error.name,  msg: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await booksController.getBook(req.params.id);
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: error.name,  msg: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await booksController.updateBook(req.params.id, req.body);
    res.status(201).json({ msg: `book ${req.params.id} has been updated`, updatedBook });
  } catch (error) {
    res.status(500).json({ error: error.name,  msg: error.message });
  }
});

router.delete('/:id', async (req,res) => {
  try {
    await booksController.deleteBook(req.params.id, req.body);
    res.status(201).json({ msg: `book ${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).json({ error: error.name,  msg: error.message });
  }
});

module.exports = router;
