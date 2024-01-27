import User from '../model/User.js';
import bcrypt from 'bcryptjs';
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.error(error);
    }
    if (!users) {
        return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json({ users });
};
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'User already exists! Login instead.' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            blogs: [],
        });
        await user.save();
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.error(error);
    }
    if (!existingUser) {
        return res
            .status(404)
            .json({ message: 'User is not found with the provided email' });
    }
    const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
    );
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    return res
        .status(200)
        .json({ message: 'Logged in successfully', user: existingUser });
};
