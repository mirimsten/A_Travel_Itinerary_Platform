import { getAllUsers, getUserById, getUserByEmail, createUser, updateUserById, deleteUserById } from '../models/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getPasswordByUserId, createPassword } from '../models/passwordModel.js';
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

// Controller function to get all users
export const getUsers_ = async (req, res) => {
    // const { id } = req.query;
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a user by ID
export const getUserById_ = async (req, res) => {
    const { id } = req.params;
    try {
        let user;
        if (!mongoose.Types.ObjectId.isValid(id)) {//במקרה שהמזהה לא תקין הוא גם לא ימצא אותו, נחזיר פלט שיכניס אותו לקונטרולר לאופציה שלא מצאו כזה משתמש.
            user = [];
        } else {
            user = await getUserById(id);
        }
        if (user.length) {
            res.status(200).json(user);
        } else {
            // res.status(404).json({ message: `User with ID ${id} not found` });
            res.status(404).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email ,password} = req.body;
    console.log(email);
    console.log(password)
    try {
        let users = await getUserByEmail(email);
        console.log(users)
        if (!users.length) {
           
            res.status(403).json("Login failed. Please check your username and password and try again.");
        }
        let user = users[0];
        const passwordDb = await getPasswordByUserId(user._id);
        console.log(passwordDb)
        if (!passwordDb.length) {
           
            res.status(403).json("Login failed. Please check your username and password and try again.");
        }
        if (passwordDb[0].password == password) {
            const token = generateAccessToken({ id: user._id,username: user.email });
            let user1 = {
                _id : user._id,
                token : token,
                email:user.email,
                addres:user.address,
                phone:user.phone
            }
           user.token = token;
           console.log(token + " "+user.token);
           console.log(user);
            res.status(200).json(user1);
        } else {
            // res.status(404).json({ message: `Password for user with ID ${id} not found` });
            res.status(403).json("Login failed. Please check your username and password and try again.");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a user by ID
export const getUserByEmail_ = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await getUserByEmail(email);
        if (user.length) {
            res.status(200).json(user);
        } else {
            // res.status(404).json({ message: `User with email ${email} not found` });
            res.status(404).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Controller function to create a new user
// export const createUser_ = async (req, res) => {
//     const userData = req.body;
//     try {
//         const newUser = await createUser(userData);
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

export const createUser_ = async (req, res) => {

    const { userName, email, address, phone } = req.body;
    const adminEmail1 = process.env.ADMIN_EMAIL;
    const adminEmail2 = process.env.ADMIN_EMAIL_;

    
      const userData = { userName, email, address, phone};
  
      if (email === adminEmail1 || email===adminEmail2 ) {
        userData.isAdmin = true;
      }

    try {
        const newUser = await createUser(userData);
        const token = generateAccessToken({ id: newUser._id, username: newUser.email });
        res.status(201).json(newUser, token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a user by ID
export const updateUser_ = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await updateUserById(id, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a user by ID
export const deleteUser_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteUserById(id);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: `User with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// const users = getUsers_();
// console.log(users);