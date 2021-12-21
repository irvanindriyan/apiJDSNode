'use strict'
const express = require('express')
const auth = require('../controllers/authController')
const { check, validationResult } = require('express-validator')
const passwordHash = require('password-hash') 
const { verifyToken } = require('../middleware/verifyJwt')
const router = express.Router()

const ENUM_VAL = ['admin', 'user'];
const checkValidation = [
    check('nik').not().isEmpty().withMessage('required value').isNumeric().withMessage('value must be number').isLength({ min: 16, max:16 }).withMessage('value must be 16 digits'),
    check('role').not().isEmpty().withMessage('required value').isAlpha().withMessage('value must be alpha').isIn(ENUM_VAL).withMessage('value must be admin or user'),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric().isLength({ min: 6}).withMessage('password min 6 digits')
];

const checkValidationLogin = [
    check('nik').not().isEmpty().withMessage('required value').isNumeric().withMessage('value must be number').isLength({ min: 16, max:16 }).withMessage('value must be 16 digits'),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric()
];

const postParam = (req) => {
    const passwordToSave = passwordHash.generate(req.body.password),
    data = {
        nik: req.body.nik.trim(),
        role: req.body.role.trim(),
        password: passwordToSave
    };

    return data;
}

router.post(`/api/auth/sign_up`, [checkValidation], (req, res) =>  {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const param = errors.errors[0].param;
        const msg = errors.errors[0].msg;

        res.json({
            status: 422,
            message: param+' '+msg
        }).status(422)
    } else {
        auth.register(postParam(req), res)
    }
})
router.post(`/api/auth/sign_in`, [checkValidationLogin], (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const param = errors.errors[0].param;
        const msg = errors.errors[0].msg;

        res.json({
            status: 422,
            message: param+' '+msg
        }).status(422)
    } else {
        auth.login(req, res)
    }
})
router.get(`/api/auth/user`, verifyToken, auth.getUser)
router.get(`/api/auth/sign_out`, verifyToken, auth.logout)

module.exports = router