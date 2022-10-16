const { Order2 } = require('../models/OrderDB')


const { User } = require('../models/User')
const easyinvoice = require('easyinvoice');
const path = require('path');
const { PdfReader } = require("pdfreader");
var html_to_pdf = require('html-pdf-node');

let options = { format: 'A4' };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

let buffer2 = ''





// const Word = require('pdf-officegen')
// const p = new Word([options])

const nodemailer = require("nodemailer");
const officegen = require('officegen')
const fs = require('fs')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
// let docx = officegen('docx')
// let pObj = docx.createP()

// pObj.addText('Simple')
// pObj.addText(' with color', { color: '000088' })
// pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
// let out = fs.createWriteStream('bonDeCommande.pdf')
// docx.generate(out)
const btoa = (text) => {
    return Buffer.from(text, 'binary').toString('base64');
};

let textes = []
const main = async (listOfEmails,emailReceipt, facture) => {
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        var data = {
            customize: {
            
                "template": btoa(facture)  // Must be base64 encoded html. This example contains 'Hello World!' in base64
            },
        };
const result1 = await easyinvoice.createInvoice(data);
// or //
fs.writeFileSync(path.join(__dirname, "invoice.pdf"), result1.pdf, 'base64');



const buffer = fs.readFileSync(path.join(__dirname, "invoice.pdf"));

        new PdfReader().parseBuffer(buffer, (err, item) => {
    if (err) console.error("error:", err);
    else if (!item) console.warn("end of buffer");
    else if (item.text) textes.push(item.text);
});

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            pool: true,
            maxMessages: 1,
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MYEMAIL, // email
                pass: process.env.MYEMAILPASSWORD || MYEMAILPASSWORDMAC //password
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
            attachments: [{
            filename: 'bon.pdf',
            content: buffer,
            contentType: 'application/pdf'
  }],
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
console.log(textes[0])


module.exports.getOrderBDController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const allOrder = await Order2.find({})

        if (!allOrder) {
            return res.status(401).send({ message: "Attention, nous sommes en rupture de order"})
        }
        res.status(200).send(allOrder)

    } catch (error) {
        res.status(500).send({ message: "Internal server error " + error  })
    }


}
module.exports.getOrderBDControllerById = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)
    const ItemID = req.body.ItemID
    console.log(ItemID)

    try {
        const allOrder = await Order2.findOne({ItemID: ItemID}, {
            TMonth: 0,
            TYear: 0,
            TDay: 0,
        }).then().catch(err => console.log(err)) 
        var response = {
    status  : 'success',
    success : 'Updated Successfully'
}

        if (!allOrder) {
            return res.status(401).send({
                message: "Attention, nous sommes en rupture de order",
                data: req.body.data
            })
        }
        res.json({success : "Updated Successfully", status : 200, rows:allOrder});
        res.send(ItemID)
        res.status(200).send(allOrder)

    } catch (error) {
        res.status(500).send({ message: "Internal server error " +error })
    }


}


