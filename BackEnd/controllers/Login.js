const express = require("express");
const router = express.Router();
const db_query = require("../dbquery");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;
        let validated = true;
        let error = {};
        if(!email||!password){
            return res.json({response:"All fields are required",status:400})
        }
        const users = await db_query(`SELECT * FROM users WHERE email =  '${email}'`);
        const user = users[0];
       
        if (!user || user.email !== email) {
            error["user"] = "User not found";
            validated = false;
        } else {
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                error["password"] = "Invalid email or password";
                validated = false;
            }
        }

            if (validated) {
                const token = jwt.sign({ userId: user.userId }, 'Practical', {
                                    expiresIn: '4h',
                                    });
                res.status(200).json({ "token":token, status: 200 });
            } else {
                res.status(400).json({ response: "Invalid email or password", status: 400 });
            }
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: error, status: 500 });
    }
});

module.exports = router;
