const { Stock } = require('../models/Stock')
const { Order } = require('../models/Order')
const { Stock2 } = require('../models/StockBD')
const { Order2 } = require('../models/OrderDB')
const { Stock3 } = require('../models/StockHPD')
const { Order3 } = require('../models/OrderHPD')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.getStatsController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const monthNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const allStock = 
            decoded.site === 'bacodji' ? await Stock2.count({}) : 
                decoded.site === 'hypodrome' ? await Stock3.count({}) :
                    await Stock.count({});
        const allOrder = 
            decoded.site === 'bacodji' ? await Order2.count({}) : 
                decoded.site === 'hypodrome' ? await Order3.count({}) :
                    await Order.count({});

        
        const totalStock = decoded.site === 'bacodji' ? await Stock2.aggregate([
            {
                $project:
                {
                    // _id: null,
                    totalStock: { $sum: "$Amount" },
                }
            }]
        ) : decoded.site === 'hypodrome' ? await Stock3.aggregate([
            {
                $project:
                {
                    // _id: null,
                    totalStock: { $sum: "$Amount" },
                }
            }]
        ) : await Stock.aggregate([
            {
                $project:
                {
                    // _id: null,
                    totalStock: { $sum: "$Amount" },
                }
            }]
        );
        const totalInitialStocks = decoded.site === 'bacodji' ? await Stock2.aggregate([
            {
                $group:
                {
                    _id: null,
                    totalInitialStock: { $sum: "$InitialQuantity" },
        
                }
            }]
        ) : decoded.site === 'hypodrome' ? await Stock3.aggregate([
            {
                $group:
                {
                    _id: null,
                    totalInitialStock: { $sum: "$InitialQuantity" },
        
                }
            }]
        ) : await Stock.aggregate([
            {
                $group:
                {
                    _id: null,
                    totalInitialStock: { $sum: "$InitialQuantity" },
        
                }
            }]
        );
        const initialValue = 0
        const totalInitialStock = totalInitialStocks.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
        const partialStocks = decoded.site === 'bacodji' ? await Stock2.aggregate([ 
            {
                $group:
                {
                    _id: null,
                    partialStock: { $sum: "$Quantity" } ,
        
                }
            }]
        ) : decoded.site === 'hypodrome' ? await Stock3.aggregate([ 
            {
                $group:
                {
                    _id: null,
                    partialStock: { $sum: "$Quantity" } ,
        
                }
            }]
        ) : await Stock.aggregate([ 
            {
                $group:
                {
                    _id: null,
                    partialStock: { $sum: "$Quantity" } ,
        
                }
            }]
        );
        const partialStock = partialStocks.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)


        let totalPercentage = 100 * partialStocks[0].partialStock / totalInitialStocks[0].totalInitialStock
        
        const totalOrder = decoded.site === 'bacodji' ? await Order2.aggregate([
    {
        $project:
        {
            totalOrder: { $sum: "$Amount" },
        }
    }
]
        ) : decoded.site === 'hypodrome' ? await Order3.aggregate([
    {
        $project:
        {
            totalOrder: { $sum: "$Amount" },
        }
    }
]
        ) : await Order.aggregate([
    {
        $project:
        {
            totalOrder: { $sum: "$Amount" },
        }
    }
]
        )
        



        if (!allStock) {
            return res.status(401).send({ message: "Attention, nous sommes en rupture de stock"})
        }

        if (!allOrder) {
            return res.status(401).send({ message: "Attention, nous sommes en rupture de order"})
        }
        if (!totalStock) {
            return res.status(401).send({ message: "Aucun achat effectué"})
        }

        if (!totalOrder) {
            return res.status(401).send({ message: "Aucun achat effectué"})
        }
        res.status(200).send({allStock, allOrder, totalStock, totalOrder, totalPercentage})

    } catch (error) {
        res.status(500).send({ message: "Internal server error " +error })
    }


}
