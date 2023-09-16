const { User } = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {

    try {
        const  token = req.body.token
        const user = await User.findOne({ userName: req.body.userName })
        const payload = { id: user._id, status: user.status, email:user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, token: user.token, userName: user.userName}
        const decoded = jwt.verify(token, process.env.MYSECRETKEY)
        const { exp } = decoded
        await User.findByIdAndUpdate(payload.id, { tokens: false })
        const seenValue = new Date(exp * 1000).toLocaleDateString("fr")
        // let seenValueDate = new Date(seenValue)
        // seenValueDate.setDate(seenValueDate.getDay())
        let arrayOfSeenValue = seenValue.split('/')
        arrayOfSeenValue.forEach((element, index) => {
            if(index === 0) 
                arrayOfSeenValue[index] = element - 1;
          });
        let seenValueText = arrayOfSeenValue.join('/')
        const hoursAndMinutes = new Date(exp * 1000).getHours() + "heure(s)" 
        const lastSeen = seenValueText + " vers " + hoursAndMinutes;

        await User.findByIdAndUpdate(payload.id, { lastSeen: lastSeen })
    
        res.status(200).send({ message: "Utilisateur déconnecté  " + req.body.userName + " " + req.body.token})
    } catch (error) {
        res.status(500).send({ message: "Route appele " + error})
    }


}