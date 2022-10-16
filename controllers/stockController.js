const { Stock, validateStock } = require('../models/Stock')
const { Stock2 } = require('../models/StockBD')
const { Stock3 } = require('../models/StockHPD')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.getStockController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const allStock = decoded.site === 'bacodji' ? await Stock2.find({}) : 
            decoded.site === 'hypodrome' ? await Stock3.find({}) : await Stock.find({});

        if (!allStock) {
            return res.status(401).send({ message: "Attention, nous sommes en rupture de stock"})
        }
        res.status(200).send(allStock)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}
module.exports.updateStockController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)
    // const stock = await Stock.find({})
    const { ItemID, NewQuantity } = req.body;
    const stocks = decoded.site === 'bacodji' ? await Stock2.findOne({ItemID: ItemID}, {
            Quantity: 1
        }) : decoded.site === 'hypodrome' ? await Stock3.findOne({ItemID: ItemID}, { Quantity: 1}) :
        await Stock.findOne({ItemID: ItemID}, { Quantity: 1})

    if (NewQuantity <= 0 || NewQuantity > stocks.Quantity) {
        return res.status(401).send({
                message: "La quantité à déstocker est superieure au stock disponible",
                error: "La quantité à déstocker est superieure au stock disponible"
            })  

    }
    const calculatedStock =  stocks.Quantity - NewQuantity;
    const filter = { ItemID: ItemID };
    const update = { Quantity: calculatedStock };

    
    

    

    try {
        const updatedStock = decoded.site === 'bacodji' ? await Stock2.findOneAndUpdate(filter, update, {
            new: true
}) : decoded.site === 'hypodrome' ? await Stock3.findOneAndUpdate(filter, update, { new: true }) :
    await await Stock.findOneAndUpdate(filter, update, { new: true });

        if (!updatedStock) {
            return res.status(401).send({ message: "Mise à jour impossible"})
        }
        res.status(200).send(updatedStock)

    } catch (error) {
        res.status(500).send({ message: "Internal server error " + error + " " + req.body.NewQuantity + " " + calculatedStock + " " + stocks.Quantity})
    }


}
module.exports.getStockControllerById = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const ItemID = req.body.ItemID
        const allStock = decoded.site === 'bacodji' ? await Stock2.findOne({ItemID: ItemID}, {
            TMonth: 0,
            TYear: 0,
            TDay: 0,
        }).catch(err => {process.exit(1)}) : decoded.site === 'hypodrome' ? await Stock3.findOne({ItemID: ItemID}, {
            TMonth: 0,
            TYear: 0,
            TDay: 0,
        }).catch(err => {process.exit(1)}) : await Stock.findOne({ItemID: ItemID}, {
            TMonth: 0,
            TYear: 0,
            TDay: 0,
        }).catch(err => {process.exit(1)})
        // var response = {
        // status  : 'success',
        // success : 'Updated Successfully'}

        if (!allStock) {
            return res.status(401).send({
                message: "Attention, nous sommes en rupture de stock",
                data: req.body.data
            })
        }
        // res.status(200).send(allStock)
        res.json({success : "Updated Successfully", status : 200, rows:allStock});

    }
    catch (error) {
        res.status(500).send({ message: "Internal server error " + error })
        process.exit(1)
    }


}
module.exports.deleteStockController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)
    const id = req.params.id
    decoded.site === 'bacodji' ? await Stock2.findByIdAndDelete(id) : 
        decoded.site === 'hypodrome' ? await Stock3.findByIdAndDelete(id) : await Stock.findByIdAndDelete(id)
    res.send("id removed " +id)

}

module.exports.addStockController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)

    const date_format = new Date();
    
    const transaction_time = date_format.getHours() + ':' + date_format.getMinutes() + ':' + date_format.getSeconds()

    try {
        const { error } = validateStock(req.body.data)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const month =  date_format.getMonth() + 1;
        const day = date_format.getDay();
        const year = date_format.getFullYear();
        const newStock = decoded.site === 'bacodji' ? await new Stock2(
            {
                ...req.body.data, InitialQuantity: req.body.InitialQuantity, StockTime: transaction_time, TMonth: month, TDay:day, TYear:year, StockDate: date_format.toLocaleDateString("fr")
            }
        ).save() : decoded.site === 'hypodrome' ? await new Stock3(
            {
                ...req.body.data, InitialQuantity: req.body.InitialQuantity, StockTime: transaction_time, TMonth: month, TDay:day, TYear:year, StockDate: date_format.toLocaleDateString("fr")
            }
        ).save() : await new Stock(
            {
                ...req.body.data, InitialQuantity: req.body.InitialQuantity, StockTime: transaction_time, TMonth: month, TDay:day, TYear:year, StockDate: date_format.toLocaleDateString("fr")
            }
        ).save()
        res.status(200).send({newStock})

    } catch (error) {
        res.status(500).send({ message: "Internal server error " + req.body.InitialQuantity })
    }


}