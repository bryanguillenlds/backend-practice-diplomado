import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthService from '../../application/use-cases/auth.service.js';
import UserMongoRepository from '../../infra/database/mongo/user.mongo.repository.js';

const userMongoRepository = new UserMongoRepository();
const authService = new AuthService(userMongoRepository);
const authController = new AuthController(authService);

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;