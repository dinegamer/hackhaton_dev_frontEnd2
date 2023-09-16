const { User, validateRegister } = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.addUserController = async (req, res) => {

    try { 
        const { error } = validateRegister(req.body)
        if (error) 
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ email: req.body.email })
        if (user)
            return res.status(409).send({ message: "Un utilisateur avec cet email existe déjà"})
        const salt = await bcrypt.genSalt(Number(process.env.SALT)) 
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new User({ ...req.body, password: hashPassword }).save()
        
        res.status(201).send({ message: 'Utilisateur créé avec succès'})

    } catch (error) {
        res.status(500).send({ message: "Internal server error " + error.message })
    }

}
module.exports.getUserController = async (req, res) => {

    try {
        const allUser = await User.find({}, {
    userName: 0,
    password: 0,
    creationDate: 0,
        })

        if (!allUser) {
            return res.status(401).send({ message: "Attention, nous sommes en rupture de stock"})
        }
        res.status(200).send(allUser)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}

module.exports.getUserControllerById = async (req, res) => {

    try {
        const userId = await req.body.userId
        const anUser = await User.findOne({"_id": userId}, {
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
            status: 1,
        }).catch(err => console.log(err))

        if (!anUser) {
            return res.status(401).send({
                message: "Aucun utilisateur quelconque n'existe  ",
                

            })
        }
        res.status(200).send(anUser)

    } catch (error) {
        res.status(500).send({ message: "Internal server error " +error })
    }


}

module.exports.updateUserRoleController = async (req, res) => {

    try {
        const userId = await req.body.userId
        const userStatus = await req.body.userStatus
        const filter = {_id: userId}
        const update = {status: userStatus}
        const anUser = await User.findOneAndUpdate(filter, update ).catch(err => console.log(err))

        if (!anUser) {
            return res.status(401).send({
                message: "Aucun utilisateur quelconque n'existe  ",
                
            })
        }
        res.status(200).send(anUser)

    } catch (error) {
        res.status(500).send({ message: "Internal server error " +error })
    }

}



module.exports.getSingleUserController = async (req, res) => {

    try {
        const token = await req.body.token
        const decoded = jwt.verify(token, jwtSecret)

        const userId =  decoded.id
        const anUser = await User.findOne({"_id": userId}, {
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
            status: 1,
        }).catch(err => console.log(err))

        if (!anUser) {
            console.log(decoded)
            return res.status(401).send({
                message: " in  " ._id
                

            })
        }
        res.status(200).send(anUser)

    } catch (error) {
        res.status(500).send({ message: "Internal server error " +error })
    }


}

module.exports.deleteUserController = async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.send("id removed " +id)

}