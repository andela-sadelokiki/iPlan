var jwt = require("jsonwebtoken"),
    mongoose = require("mongoose"),
    db = require("../../config/config.js");
var User = require("../models/user.model.server");

module.exports = {
    signup: function(req, res) {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save(function(err, newuser) {
            if (!req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: "Please fill required fields"
                });
            }
            console.log(req.body, "request!");
            if (err) {
                if (err.code === 11000) {
                    return res.status(401).json({
                        success: false,
                        message: "User exists"
                    });
                } else {
                    return res.status(401).send(err);
                }
            } else {
                newUser.save(function(err, user) {
                    if (err) {
                        return err;
                    }
                    user.token = jwt.sign(user, db.secret, {
                        // expiresIn: 1440
                    });
                    return res.status(200).json({
                        token: user.token,
                        user: user.username,
                        message: "Newuser created"
                    });
                });
            }
        })

    },

    login: function(req, res) {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "please fill all required fields"
            });
        }
        User.findOne({ username: req.body.username }, function(err, user) {
            if (err) {
                return res.status(400).json(err);
            }
            console.log("log user here", user, err);
            var validatePassword = user.comparePassword(req.body.password);
            if (!validatePassword) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password incorrect"
                });
            }
            user.token = jwt.sign(user, db.secret, {
                // expiresIn: 1440
            });
            return res.status(200).json({
                token: user.token,
                message: "Login successful",
                success: true
            })
        })
    },

    middleware: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers.token;
        console.log(token);
        if (token) {
            jwt.verify(token, db.secret, function(err, decoded) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to authenticate token"
                    });
                }
                console.log("decoded token", decoded)
                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "No token provided"
            })
        }
    },

    getUser: function(req, res) {
        User.findOne({ _id: req.params.id }, function(err, user) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                });
            }
            res.status(200).json({
                data: user,
                success: true,
                message: "User found"
            })
        })
    },

    updateUser: function(req, res) {
        User.update({ _id: req.params.id }, req.body, function(err, user) {
            if (err) {
                return err;
            }
            return res.status(200).json({
                success: true,
                message: "User updated"
            });
        });
    },

    deleteUser: function(req, res) {
        User.remove({ _id: req.params.id }, function(err, user) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Unable to delete profile"
                });
            }
            return res.status(200).json({
                success: true,
                message: "User deleted!"
            })
        })
    }
}
