import { Router } from 'express';
import authRoute from './api/auth';
import recipeRoute from './api/recipe';
import ingredientRoute from './api/ingredient';

const router = Router();

router.use('/recipe', recipeRoute);
router.use('/auth', authRoute);
router.use('/ingredients', ingredientRoute);

export default router;
