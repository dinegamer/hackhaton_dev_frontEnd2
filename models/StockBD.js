const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require('joi')
const { Order2 } = require('./OrderDB')
const {Notification} = require('./Stock')

// const { io } = require('../index')
const { User } = require('./User')




const nodemailer = require("nodemailer");
const officegen = require('officegen')



// let docx = officegen('docx')
// let pObj = docx.createP()

// pObj.addText('Simple')
// pObj.addText(' with color', { color: '000088' })
// pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
// let out = fs.createWriteStream('bonDeCommande.docx')
// docx.generate(out)

const main = async (listOfEmails, emailReceipt) => {
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
    
    

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            pool: true,
            maxMessages: 1,
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MYEMAIL, // email
                pass: process.env.MYEMAILPASSWORD || MYEMAILPASSWORDMAC, //password
            },
        });
        

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"storeSup <teenagerdine@gmail.com>"`, // sender address
            to: listOfEmails, // list of receivers
            subject: "Notifications storeSup ✔", // Subject line
            // plain text body
            html: `
        <!doctype html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Simple Transactional Email</title>
        <style>
    @media only screen and (max-width: 620px) {
    table.body h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
    }

    table.body p,
    table.body ul,
    table.body ol,
    table.body td,
    table.body span,
    table.body a {
        font-size: 16px !important;
    }

    table.body .wrapper,
    table.body .article {
        padding: 10px !important;
    }

    table.body .content {
        padding: 0 !important;
    }

    table.body .container {
        padding: 0 !important;
        width: 100% !important;
    }

    table.body .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
    }

    table.body .btn table {
        width: 100% !important;
    }

    table.body .btn a {
        width: 100% !important;
    }

    table.body .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
    }
    }
    @media all {
    .ExternalClass {
        width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
    }

    .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
    }

    #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    .btn-primary table td:hover {
        background-color: #34495e !important;
    }

    .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
    }
    }
    </style>
    </head>
    <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Phase de texte DineGamer as geekshams.</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
        <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
            <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">

                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

                <!-- START MAIN CONTENT AREA -->
                <div style="width: 100%; height: 40px; background: linear-gradient(to right, #0066eb 0%, #EF7504 68%); padding: 20px 0">
            <center  className="d-inline-block align-top navbar-brand">
            <img
                src="https://res.cloudinary.com/intec-sup/image/upload/v1663354948/logostoreSup_ggomfc.jpg"
                style="width: 100%; height: 40px; object-fit: contain"
                
            </center>
            </div>
                <tr>
                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                        <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">SITE: Bacodjicoroni</p>

                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Bonjour chers admins,</p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
                            </table>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Alerte de notification.</p>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"><i>Message:</i> ${emailReceipt}.</p><br/>
                        </td>
                        </tr>

                    </table>
                    </td>
                </tr>
                <tr>
                                <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                    <tbody>
                                        <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #3498db;" valign="top" align="center" bgcolor="#3498db"> <a href="#" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #3498db; border-color: #3498db; color: #ffffff;">Acceder à storeSup</a> </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>

                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->

                <!-- START FOOTER -->
                <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                    <tr>
                    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                        <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">INTEC, Hamdallaye ACI 2000,</span>
                    </td>
                    </tr>
                    <tr>
                    <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                        Service <a href="#" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">logistique</a>.
                    </td>
                    </tr>
                </table>
                </div>
                <!-- END FOOTER -->

            </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        </tr>
        </table>
    </body>
    </html>
                `,
            
                // html body
            });
            // <p>Message: <h1>${emailReceipt}</h1></p><br/>
        // <div style="width: 100%; background: linear-gradient(to right, #0066eb 0%, #EF7504 68%); padding: 20px 0">
        //     <a href="" >
        //     <center  className="d-inline-block align-top navbar-brand">
        //     <img
        //         src="https://res.cloudinary.com/intec-sup/image/upload/v1663354948/logostoreSup_ggomfc.jpg"
        //         style="width: 100%; height: 70px; object-fit: contain"
        //         />storeSup</a> 
        //     </center>
        //     </div>

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error)
    }
}
//transporter.close();



const StockSchema = new Schema({ 
ItemID: { type: String, unique: true},
ItemName: { type: String , required: true},
Category: { type: String, required: true},
Material: { type: String, required: true},
Properties: { type: String, required: true},
Amount: { type: Number, default: 0},
Quantity: { type: Number, required: true},
InitialQuantity: { type: Number, required: true},
EnBonEtat: { type: Number, required: true, default: 0},
EnMauvaisEtat: { type: Number, required: true, default: 0},
StockDate: { type: String, default: Date.now().toLocaleString('fr')},
StockTime: { type: String },
TMonth: { type: Number},
TYear: { type: Number },
TDay: { type: Number }
});
const validateStock = (data) => {
    const schema = joi.object({
        ItemID: joi.string().required().label("Id de l'article"),
        ItemName: joi.string().required().label('Nom de l\'article'),
        Category: joi.string().required().label('Categorie'),
        Material: joi.string().required().label('Materiel'),
        Properties: joi.string().required().label('Caracteristiques'),
        StockDate: joi.date().label('TransactionDate'),
        StockTime: joi.string().label('TransactionTime'),
        Amount: joi.number().label('Montant'),
        Quantity: joi.number().required().label('Quantité'),
        TMonth: joi.number().label('Mois'),
        TYear: joi.number().label('Annee'),
        TDay: joi.number().label('Jour'),
        
    }).unknown(true)
    return schema.validate(data)
}

const NotificationSchema = new Schema({ 
    Message:{ type: String, required: true},
    Quantity: { type: Number, required: true},
});
const validateNotification = (data) => {
    const schema = joi.object({
        Message: joi.string().required().label('Messages'),
        Quantity: joi.number().required().label('Quantité'),
        
    }).unknown(true)
    return schema.validate(data)
}

// let pipeline = [
//             {
//                 $match: { "fullDocument.Quantity": { $lte: 2 } }
//             }
//     ];
    

// const emailReceipt = "";
const connectionParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }

const bacodjiDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/bacodji?retryWrites=true&w=majority", connectionParams)
const Stock2 = bacodjiDB.model("StockBD", StockSchema);
const Notification2 = bacodjiDB.model("NotificationBD", NotificationSchema);
const pipeline = [
            {
                '$match': {
                    'operationType': {'$in' :['update', 'insert']},
                },
            }
        ];
const pipelineTwo = [
            {
                '$match': {
                    'operationType': 'insert',
                },
            }
        ];
    Stock2.watch(pipeline, {fullDocument: 'updateLookup'}).
        on('change', async (data) => {
            console.log("next")
            const quantity = data.fullDocument.Quantity
            const initialQuantity = data.fullDocument.InitialQuantity
            const stockName = data.fullDocument.ItemName
            const stockCategory = data.fullDocument.Category
            const stockId = data.fullDocument.ItemID
            const percent = (initialQuantity * 20) / 100
            const notificationMessage = 
            " Site: BACODJICORONI.\r\n Le seuil d'alerte pour l'article " + stockName + " identifié par "
                + stockId + " et de categorie " + stockCategory + " du site BACODJICORONI est presqu en ruputre de stock, il ne reste plus que " + quantity + " .Priere de ravitailler \n";
            const extraMails = 'teenagerdine@gmail.com, fantaintecsup@gmail.com, spamateck97573388@gmail.com, gamerdine@icloud.com'
            if (quantity <= percent) {
                const allUser = await User.find({ site: 'bacodji', fonction: { $in : ["Directeur", "Scolarite", "Logistique"]}  }, { email: 1 })
                        // await User.find({"breed" : { $in : ["Pitbull", "Great Dane", "Pug"]}}) 

                console.log('Here the percentage')
                const allUser2 = []
                allUser.map((row) => allUser2.push(row.email))
                allUser2.push(extraMails)
                
                
                main(allUser2.map((row) => row), notificationMessage)
                await new Notification2(
            {
                        Message: notificationMessage, 
                        Quantity: data.fullDocument.Quantity
                        
            }
        ).save()
            }
        });
Order2.watch(pipelineTwo, {fullDocument: 'updateLookup'})
        .on('change', async (data) => {
            console.log(data.fullDocument.Category)
            const allUser = await User.find({ status: 'Admin' }, { email: 1 })
            const notificationMessage = "Vous avez recu une nouvelle commande en provenance du site BACODJICORONI. Veuillez consulter les commandes et telecharger le bon de commande ci-joint"
            // main(allUser.map((row) => row.email), notificationMessage)
                await new Notification(
            {
                        Message: notificationMessage, 
                        Quantity: 1000
            }
        ).save()
        // const allNotification = 
        //     await Notification.find({})
        //     io.emit('nouvelle-notification-recue', allNotification)
        });
        

        //Envoie d email0




//Fin d envoie
module.exports = {Stock2, Notification2, Order2, validateStock, validateNotification};
