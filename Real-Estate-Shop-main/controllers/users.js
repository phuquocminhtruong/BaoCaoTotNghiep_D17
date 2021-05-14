import express from 'express';

import User from '../models/user.js';

const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const users = await User.find();
                
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { userName } = req.params;
    try {
        const user = await User.findOne({userName: userName});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

export const deleteUser = async (req, res) => { 
    const { userName } = req.params;
    try {
        const user = await User.findOneAndDelete({userName: userName});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const login = async (req, res) => { 
    const { userName, passWord } = req.body;

    try {
        const user = await User.findOneAndUpdate({userName: userName, passWord: passWord},{isLogin: true},{new:true});
        if (user === null) {
            res.status(404).json("Đăng nhập thất bại");
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const logout = async (req, res) => { 
    const { userName } = req.body;
    try {
        const user = await User.findOneAndUpdate({userName: userName},{isLogin: false}, {new: true});
        res.status(200).json({message:"logout!"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    const { userName, passWord, gender, fullName, email, phone_number } = req.body;
    const newUser = new User({ userName, passWord, gender, fullName, email, phone_number });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updateUser = async (req, res) => { 
    const { userName, passWord, gender, fullName, email } = req.body;
    try {
        const user = await User.findOne({userName: req.params.userName});
        const updatedUser = await User.findOneAndUpdate(
            {userName: user.userName},
            {userName, passWord, gender, fullName, email} , 
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const setNewPassword = async (req, res) => { 
    const { userName, passWord, phone_number } = req.body;
    try {
        const user = await User.findOne({userName: req.params.userName});
        if (phone_number === user.phone_number) {
            const updatedUser = await User.findOneAndUpdate(
                {userName: user.userName},
                {userName, passWord} , 
                {new: true}
            );
            res.status(200).json("update success!");
        } else {
            res.status(404).json("Incorrect Answer!");    
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;