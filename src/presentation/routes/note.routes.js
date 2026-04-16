import { Router } from 'express';
import NoteController from '../controllers/note.controller.js';
import NoteService from '../../application/use-cases/note.service.js';
import upload from '../middlewares/upload.middleware.js';

import NoteMongoRepository from '../../infra/database/mongo/note.mongo.repository.js';
// import NoteMySQLRepository from '../../infra/database/mysql/note.mysql.repository.js';

const noteMongoRepository = new NoteMongoRepository();
// const noteMySQLRepository = new NoteMySQLRepository();

const noteService = new NoteService(noteMongoRepository);
const noteController = new NoteController(noteService);

const router = Router();

router.post('/', upload.single('image'), noteController.createNote);
router.get('/', noteController.getNoteByUserId);
router.get('/:id', noteController.getNoteById);
router.put('/:id', upload.single('image'), noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export default router;