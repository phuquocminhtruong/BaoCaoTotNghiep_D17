import express from 'express';
import { getSchedules, createSchedule, deleteSchedule, markSchedule,rejectSchedule, removeSchedule } from '../controllers/schedules.js';

const router = express.Router();

router.get('/', getSchedules);
router.post('/', createSchedule);
router.delete('/:id', deleteSchedule);
router.delete('/removeSchedule/:id', removeSchedule);
router.post('/markSchedule/:id', markSchedule);
router.post('/rejectSchedule/:id', rejectSchedule);

export default router;