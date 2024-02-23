const express = require('express');
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser= require('../middleware/fetchuser');
const JWT_SECERET = 'thisissecret';
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password too short').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'user with this email already exists' })
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        });
        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECERET);
        res.json({ authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("some errror occured");
    }
});

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'pasword cannot be blank').exists()
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: "login with correct email" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ errors: "login with correct pass" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECERET);
            res.json({ authtoken });
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("internal server error occured");
        }
    })

//geting loggedin user's details
router.post('/getuser',fetchuser
    , async (req, res) => {
        try {
            let userId = req.user.id;
            const user = await User.findById(userId)
                .select("-password");
            res.send(user);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("internal server error occured");
        }
    });

module.exports = router;