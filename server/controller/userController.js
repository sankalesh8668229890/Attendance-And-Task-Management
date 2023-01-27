const express = require('express');
const router = express.Router();
const userModel = require("../model/userSchema")
const jwt = require("jsonwebtoken");
const { response } = require('express');

const createUser = async (req, res) => {
    try {
        const data = req.body
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ status: false, message: error.message });
        }

        const result = await userModel.create(data)
        return res.status(200).send({ status: true, message: "user created successfully", data: result });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate the input data
        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and password are required' })
        };

        let user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).send({ status: false, message: "user not found" });
        }

        const token = jwt.sign({
            userId: user._id.toString()
        }, "secret", { expiresIn: "24h" });

        let data = {
            userId: user._id,
            token: token,
            name: user.name,
            email: user.email
        }
        res.status(200).send({ status: true, message: "user Logged in successfully", data: data });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { createUser,login }