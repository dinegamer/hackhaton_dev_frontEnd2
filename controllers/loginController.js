const { User, validateLogin } = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {

    try {
        const { error } = validateLogin(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const user = await User.findOne({ userName: req.body.userName })
        if (!user) {
            return res.status(401).send({ message: "Identifiant ou mot de passe incorrect"})
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(401).send({ message: "Identifiant ou mot de passe incorrect"})
        }
        const payload = { id: user._id, status: user.status, email:user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, token: user.token, userName: user.userName, site: user.site, fonction: user.fonction}
        const token = jwt.sign(payload, process.env.MYSECRETKEY, { expiresIn: '1D' })
        const decoded = jwt.verify(token, process.env.MYSECRETKEY)
        const { exp } = decoded
        let isOnline = true
        const onLineUsers = await User.find({}, {tokens: 1})
        // exp * 1000 > Date.now() ? isOnline : !isOnline
        await User.findByIdAndUpdate(payload.id, { tokens: true, lastSeen: "" })
        
        
        // isOnline && await User.updateMany( { token: true}, { $set: { lastSeen: "" } } )
        // !isOnline && await User.updateMany( { token: false}, { $set: { lastSeen: lastSeen } } )
        
        // console.log('here')
        // console.log(user.token)
        // console.log(isOnline)
        // console.log(exp)
        // console.log(payload.userName)
        // res.status(200).send({ data: token, message: "Vous etes connecté" })
        res.header('auth-token', token).send({ data: token, message: "Vous etes connecté" })

    } catch (error) {
        res.status(500).send({ message: "Internal server error " + error})
    }


}