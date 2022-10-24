import User from '../model/User';
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
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.error(err);
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: 'User already exists! Login instead.' });
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
        await user.save();
    } catch (err) {
        return console.error(err);
    }
    return res.status(201).json({ user });
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
