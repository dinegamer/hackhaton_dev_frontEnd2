const { Order } = require('../models/Order')
const { Order2 } = require('../models/OrderDB')
const { Order3 } = require('../models/OrderHPD')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.getTransactionController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)
    try {

        const allTransaction = decoded.site === 'bacodji' ? 
            await Order2.find({}).sort({TransactionDate: -1}).limit(5) :
                decoded.site === 'hypodrome' ? await Order3.find({}).sort({TransactionDate: -1}).limit(5) :
                    await Order.find({}).sort({TransactionDate: -1}).limit(5)
        if (!allTransaction) {
            return res.status(401).send({ message: "Aucune transaction diponible"})
        }
        res.status(200).send(allTransaction)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}

