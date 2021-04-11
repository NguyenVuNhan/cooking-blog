import { Router } from 'express';
import passport from 'passport';
import {
  AddRecipeController,
  DeleteRecipeController,
  UpdateRecipeController,
  ViewRecipeController,
  SearchRecipeController,
} from '@api/controllers';

const router = Router();
const privateRouter = Router();
const publicRouter = Router();

privateRouter.use(passport.authenticate('jwt', { session: false }));

/**
 * @swagger
 * paths:
 *   /api/recipe:
 *      post:
 *        summary: Add recipe
 *        description: User add new recipe
 *        security:
 *          - BearerAuth: []
 *        responses:
 *          '200':
 *            description: OK
 *          '400':
 *            description: Some thing wrong with post data
 *      get:
 *        summary: Get all recipes
 *        description: Get all recipes of current user
 *        responses:
 *          '200':
 *            description: OK
 *          '404':
 *            description: No recipe found
 */
privateRouter.post('/', AddRecipeController.perform);
publicRouter.get('/', SearchRecipeController.perform);

/**
 * @swagger
 * paths:
 *   /api/recipe/{id}:
 *      get:
 *        summary: Get recipe
 *        description: Get recipe by id
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: ID of the recipe to get
 *        responses:
 *          '200':
 *            description: OK
 *          '404':
 *            description: No recipe found
 *      post:
 *        summary: Update recipe
 *        description: Update recipe with given id
 *        security:
 *          - BearerAuth: []
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: ID of the recipe to get
 *        responses:
 *          '200':
 *            description: OK
 *          '400':
 *            description: Bad input. Properly missing recipe id
 *          '401':
 *            description: Current user is not the recipe owner
 *          '404':
 *            description: No recipe found
 *      delete:
 *        summary: Delete recipe
 *        description: Delete recipe with id
 *        security:
 *          - BearerAuth: []
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: ID of the recipe to delete
 *        responses:
 *          '200':
 *            description: OK
 *          '400':
 *            description: Bad input. Properly missing recipe id
 *          '401':
 *            description: Current user is not the recipe owner
 *          '404':
 *            description: No recipe found
 */
publicRouter.get('/:id', ViewRecipeController.perform);
privateRouter.post('/:id', UpdateRecipeController.perform);
privateRouter.delete('/:id', DeleteRecipeController.perform);

router.use(publicRouter);
router.use(privateRouter);

export default router;
