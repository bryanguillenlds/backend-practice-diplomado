import { Router } from 'express';
import CategoryController from '../controllers/category.controller.js';
import CategoryService from '../../application/use-cases/category.service.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

import CategoryMongoRepository from '../../infra/database/mongo/category.mongo.repository.js';
// import CategoryMySQLRepository from '../../infra/database/mysql/category.mysql.repository.js';

const categoryMongoRepository = new CategoryMongoRepository();
// const categoryMySQLRepository = new CategoryMySQLRepository();

const categoryService = new CategoryService(categoryMongoRepository);
const categoryController = new CategoryController(categoryService);

const router = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categorias]
 *     summary: Crear una categoria
 *     description: Requiere Bearer token.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               userId: { type: string }
 *     responses:
 *       201:
 *         description: Categoria creada
 *       400:
 *         description: Error de validacion
 *       401:
 *         description: Sin token o token invalido
 */
router.post('/', authMiddleware, roleMiddleware(['admin', 'user']), categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categorias]
 *     summary: Listar categorias de un usuario
 *     description: Requiere Bearer token. Filtra por userId en query.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *         description: Id del usuario
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       400:
 *         description: Falta userId u otro error
 *       401:
 *         description: Sin token o token invalido
 */
router.get('/', authMiddleware, roleMiddleware(['admin', 'user']), categoryController.getCategoryByUserId);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categorias]
 *     summary: Obtener una categoria por id
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       401:
 *         description: Sin token o token invalido
 */
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'user']), categoryController.getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categorias]
 *     summary: Actualizar una categoria
 *     description: Requiere Bearer token y rol admin.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               userId: { type: string }
 *     responses:
 *       200:
 *         description: Categoria actualizada
 *       401:
 *         description: Sin token o token invalido
 *       403:
 *         description: Solo administradores pueden actualizar categorias
 */
router.put('/:id', authMiddleware, roleMiddleware(['admin']), categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categorias]
 *     summary: Eliminar una categoria
 *     description: Solo administradores. Requiere Bearer token.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Eliminada (sin cuerpo)
 *       401:
 *         description: Sin token o token invalido
 *       403:
 *         description: Solo administradores pueden eliminar categorias
 */
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), categoryController.deleteCategory);

export default router;
