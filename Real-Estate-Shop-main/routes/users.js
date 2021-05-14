import express from 'express';

import { login, register, getUser, getUsers, logout, deleteUser, updateUser, setNewPassword } from '../controllers/users.js';

const router = express.Router();

router.post('/register', register);
router.get('/', getUsers);
router.get('/:userName', getUser);
router.post('/:userInfo', login);
router.post('/logout/:userInfo', logout);
router.delete('/:userName', deleteUser);
router.post('/updateUser/:userName', updateUser);
router.post('/setNewPassword/:userName', setNewPassword);

export default router;