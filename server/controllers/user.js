import User from '../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmedPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });
        if (password !== confirmedPassword) return res.status(404).json({ message: "Passwords do not match!" });
        const hashedPassword = await bcrypt.hash(password, 12); //salt: difficulty level => 12
        const user = { name: `${firstName} ${lastName}`, email, password: hashedPassword };
        const token = jwt.sign({ email: user.email, id: user._id }, "test", { expiresIn: "1h" } );
        const newUser = User(user);
        await newUser.save();
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (!existingUser) return res.status(404).json({ message: "User not found!" });        
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        console.log(passwordMatch);
        if (!passwordMatch) return res.status(400).json({ message: "Password provided is incorrect!" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" } ); //params: information to provide, secret key string, token options object => sign in duration
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
        console.log(error.message);
    }
}

export const findAll = async (req, res) => {    
    try {
        const existingUsers = await User.find();
        console.log(existingUsers);
        res.status(200).json(existingUsers);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
        console.log(error.message);
    }
}