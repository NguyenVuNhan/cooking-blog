import { Router } from 'express';
import { GetIngredientsController } from '@api/controllers';

const router = Router();

router.get('/:name', GetIngredientsController.perform);

export default router;
