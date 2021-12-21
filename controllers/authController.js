const db = require("../database/models")
const Users = db.Users
const Blacklist = db.Blacklist
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
const passwordHash = require('password-hash')
require("dotenv").config()

const register = async (input, res) => {
    try {
        const save = await Users.create(input)
        const cekNik = await Users.findOne({ where: { nik: input.nik } });
        const fetchResult = cekNik.dataValues

        const userToken = {
            id: fetchResult.id,
            nik: fetchResult.nik,
            role: fetchResult.role
        }

        setJWT(userToken, function(token) {
            res.json({ 
                status: 200,
                data: {
                    msg: 'Registrasi sucessfully !',
                    token: token
                }
            }).status(200)
        });
    } catch (error) {
        res.json({
            status: 422,
            data: error
        }).status(422)
    }
}

const login = async (req, res) => {
    try {
        const nik = req.body.nik.trim();
        const password = req.body.password.trim();
        const cekNik = await Users.findOne({ where: { nik: nik } });
        const fetchResult = cekNik.dataValues
        const verify = passwordHash.verify(password, fetchResult.password);

        if (verify != true) {
            res.json({ msg: 'Password incorect !' }).status(422)
        } else {
            const userToken = {
                id: fetchResult.id,
                nik: fetchResult.nik,
                role: fetchResult.role
            }

            setJWT(userToken, function(token) {
                res.json({ 
                    status: 200,
                    data: {
                        msg: 'Login sucessfully !',
                        token: token
                    }
                }).status(200)
            });
        }
    } catch (error) {
        res.json({
            status: 422,
            data: error
        }).status(422)
    }
}

const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const dataJwt = jwt_decode(token);

        const id = dataJwt.userToken.id
        const data = await Users.findByPk(id)
        const fetchResult = data ? data : `${id} not found in db`

        const userToken = {
            id: fetchResult.id,
            nik: fetchResult.nik,
            role: fetchResult.role
        }

        setJWT(userToken, function(callback) {
            res.json({
                status: 200,
                data: {
                    nik: fetchResult.nik,
                    role: fetchResult.role,
                    jwt: callback
                }
            }).status(200);
        });
    } catch (error) {
        res.json({
            status: 422,
            data: error
        }).status(422)
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        await Blacklist.create({ token: token })
        res.json({ 
            status: 200,
            message: 'Logout sucessfully'
        }).status(200);
    } catch (error) {
        res.json({
            status: 422,
            data: error
        }).status(422)
    }
}

function setJWT(userToken, callback) {
    jwt.sign({ userToken }, process.env.JWT_KEY, {
        expiresIn: '1d'
    }, (err, token) => {
       return callback(token); 
    });
}

module.exports = {
    register, login, getUser, logout
}
