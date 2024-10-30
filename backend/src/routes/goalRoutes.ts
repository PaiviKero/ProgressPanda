import { Router } from 'express';
import goalController from '../controllers/goalController';

const router: Router = Router();

router.get('/', goalController.getAllGoals);
router.get('/:id', goalController.getGoalById);
router.post('/', goalController.addGoal);

export default router;
