const { Order } = require('../models/Order')
const { Order2 } = require('../models/OrderDB')
const { Order3 } = require('../models/OrderHPD')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.getStatsTwoController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const monthNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const monthlyOrder = decoded.site === 'bacodji' ?
        await Order2.aggregate([

          {
            /* Filter out users who have not yet subscribed */
            $match: {
              /* "joined" is an ISODate field */
              'TMonth': { $in: monthNames }
            }
          },
          { 
              $project: { "TMonth": 1, "Amount": 1}
      },
          
            /* group by year and month of the subscription event */
            {
              $group: {
                  _id: "$TMonth",
                  TMonth: { "$first": "$TMonth"},
                  Amount: { "$sum": "$Amount"},
                 
               
         },
      },
  //    { 
  //     $project: { "TMonth": 1, "Amount": 1}
  // },
           
          {
            /* sort descending (latest subscriptions first) */
            $sort: {
              TMonth: 1
            }
          },
          {
            $limit: 100,
          },
          
        ])
            : decoded.site === 'hypodrome' ?
            await Order3.aggregate([

              {
                /* Filter out users who have not yet subscribed */
                $match: {
                  /* "joined" is an ISODate field */
                  'TMonth': { $in: monthNames }
                }
              },
              { 
                  $project: { "TMonth": 1, "Amount": 1}
          },
              
                /* group by year and month of the subscription event */
                {
                  $group: {
                      _id: "$TMonth",
                      TMonth: { "$first": "$TMonth"},
                      Amount: { "$sum": "$Amount"},
                     
                   
             },
          },
      //    { 
      //     $project: { "TMonth": 1, "Amount": 1}
      // },
               
              {
                /* sort descending (latest subscriptions first) */
                $sort: {
                  TMonth: 1
                }
              },
              {
                $limit: 100,
              },
              
            ]) :
             await Order.aggregate([

                {
                  /* Filter out users who have not yet subscribed */
                  $match: {
                    /* "joined" is an ISODate field */
                    'TMonth': { $in: monthNames }
                  }
                },
                { 
                    $project: { "TMonth": 1, "Amount": 1}
            },
                
                  /* group by year and month of the subscription event */
                  {
                    $group: {
                        _id: "$TMonth",
                        TMonth: { "$first": "$TMonth"},
                        Amount: { "$sum": "$Amount"},
                       
                     
               },
            },
        //    { 
        //     $project: { "TMonth": 1, "Amount": 1}
        // },
                 
                {
                  /* sort descending (latest subscriptions first) */
                  $sort: {
                    TMonth: 1
                  }
                },
                {
                  $limit: 100,
                },
                
              ])
            



        if (!monthlyOrder) {
            return res.status(401).send({ message: "Attention, nous sommes en rupture de stock"})
        }
        res.status(200).send(monthlyOrder)

    } catch (error) {
        res.status(500).send({ message: "Internal server error " +error })
    }


}
