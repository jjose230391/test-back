const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Register User to Database
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Error! username is already in use!"
            });
        }else{
            User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8)
            })
                .then(user => {
                    if(user){
                        res.send({message: "User registered successfully!", status: 200});
                    }
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }
    });
};

//User autentication
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(400).send({message: "User Not found.", status: 400});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({username: user.username}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                username: user.username,
                token: token
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};