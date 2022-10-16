const { Stock3 } = require('../models/StockHPD')

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.getStockHPDController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const allStock = await Stock3.find({});

        if (!allStock) {
            return res.status(401).send({ message: "Attention, nous sommes en rupture de stock"})
        }
        res.status(200).send(allStock)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}


module.exports.deleteStockHPDController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)
    const id = req.params.id
    await Stock3.findByIdAndDelete(id)
    res.send("id removed " +id)

}

