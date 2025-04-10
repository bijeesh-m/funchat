const User = require("../models/User");
const bcrypt = require("bcrypt");

////////////////// REGISTER //////////////////

module.exports.Register = async (req, res) => {
    try {
        //generate new password

        const isExist = await User.findOne({ email: req.body.email });

        if (!isExist) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            //create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            //save user and respond
            const user = await newUser.save();
            res.status(200).json(user);
        } else {
            res.status(409).json("User already exist");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

////////////////// LOGIN //////////////////

module.exports.Login = async (req, res) => {
    console.log("hello");
    
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            !validPassword ? res.status(400).json("wrong password") : res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
