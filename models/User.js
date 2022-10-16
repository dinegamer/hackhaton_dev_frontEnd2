const mongoose = require('mongoose')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')
const myCustomJoi = joi.extend(require('joi-phone-number'))
const doc = null

const UserSchema = new mongoose.Schema({
    
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    creationDate: { type: Date, default: Date.now },
    status: { type: String, required: true }, 
    tokens: { type: Boolean, default: false }, 
    lastSeen: { type: String, default: ""},
    site: { type: String, required: true},
    fonction: {type: String, required: true}
})

UserSchema.methods.generateAuthToken = () => {
    const payload = { id: this._id, name: doc}
    
    const token = jwt.sign(payload, process.env.MYSECRETKEY, { expiresIn: '1D' })
    return token
}
const User = mongoose.model('User', UserSchema)
const validateRegister = (data) => {
    const schema = joi.object({
        userName: joi.string().required().label("Identifiant"),
        password: passwordComplexity().required().label('Mot de passe'),
        firstName: joi.string().required().label('Prenom'),
        lastName: joi.string().required().label('Nom'),
        email: joi.string().email().required().label('Email'),
        phoneNumber: joi.string().required().label('Telephone'),
        status: joi.string().required().label('Status'),
        site: joi.string().label('Site requis'),
        fonction: joi.string().label('Fonction requis'),
    }).unknown(true)
    return schema.validate(data)
}
const validateLogin = (data) => {
    const schema = joi.object({
        userName : joi.string().required().label("Identifiant"),
        password : joi.string().required().label("Mot de passe"),
    }).unknown(true)
    return schema.validate(data)
}
module.exports = {User, validateRegister, validateLogin}
