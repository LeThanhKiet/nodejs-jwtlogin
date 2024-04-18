const { generateJwt } = require("../helpers/generateToken.js");
const { Account, hashPassword, comparePasswords } = require("../models/Account.model.js");

async function getAllAccount(req, res) {
    try {
        const accounts = await Account.find().exec();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function register(req, res) {
    try {
        let { name, email, password } = req.body;

        const checkEmail = (await Account.findOne({ email }).exec()) ? true : false;
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        password = await hashPassword(password);
        const account = new Account({ name, email, password });
        await account.save();
        res.status(201).json({ account, message: "Register Successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const account = await Account.findOne({ email }).exec();
        if (!account) {
            return res.status(400).json({ message: "Account not found" });
        }
        const checkPassword = await comparePasswords(password, account.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = await generateJwt(email, account._id);
        account.accessToken = token.token;
        res.status(200).json({
            account,
            type: "Bearer",
            token,
            message: "Login successful",
        });
    } catch (error) {}
}

module.exports = {
    getAllAccount,
    register,
    login,
};
