const { User } = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {

    try {
        const { token } = req.body
        const user = await User.findOne({ userName: req.body.userName })
        const payload = { id: user._id, status: user.status, email:user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, token: user.token, userName: user.userName}
        const decoded = jwt.verify(token, process.env.MYSECRETKEY)
        const { exp } = decoded
        await User.findByIdAndUpdate(payload.id, { tokens: false })
        const seenValue = new Date(exp * 1000).toLocaleDateString("fr")
        const hoursAndMinutes = new Date(exp * 1000).getHours() + "h:" + new Date(exp * 1000).getMinutes()
        const lastSeen = seenValue + " à " + hoursAndMinutes;

        await User.findByIdAndUpdate(payload.id, { lastSeen: lastSeen })
    
        res.status(200).send({ message: "Utilisateur déconnecté  "})
    } catch (error) {
        res.status(500).send({ message: "Internal server error " + error})
    }


}