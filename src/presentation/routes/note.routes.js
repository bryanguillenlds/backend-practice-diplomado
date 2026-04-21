import { Router } from 'express';
import NoteController from '../controllers/note.controller.js';
import NoteService from '../../application/use-cases/note.service.js';
import upload from '../middlewares/upload.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

import NoteMongoRepository from '../../infra/database/mongo/note.mongo.repository.js';
// import NoteMySQLRepository from '../../infra/database/mysql/note.mysql.repository.js';

const noteMongoRepository = new NoteMongoRepository();
// const noteMySQLRepository = new NoteMySQLRepository();

const noteService = new NoteService(noteMongoRepository);
const noteController = new NoteController(noteService);

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'user']), upload.single('image'), noteController.createNote);
router.get('/', authMiddleware, roleMiddleware(['admin', 'user']), noteController.getNoteByUserId);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'user']), noteController.getNoteById);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'user']), upload.single('image'), noteController.updateNote);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'user']), noteController.deleteNote);

export default router;