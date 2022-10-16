const { Notification } = require('../models/Stock')
const { Notification2 } = require('../models/StockBD')
const { Notification3 } = require('../models/StockHPD')
const { User } = require('../models/User')
const jwt = require("jsonwebtoken");
// const { io} = require('../index')
const jwtSecret = process.env.MYSECRETKEY;
const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.MYSECRETKEY;

const main = async (listOfEmails,emailReceipt) => {
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <div style="width: 100%; padding: 5rem 0">
            <div style="max-width: 700px; background-color: white; margin: 0 auto">
            <div style="width: 100%; background: linear-gradient(to right, #0066eb 0%, #EF7504 68%); padding: 20px 0">
            <a href="" >
            <center  className="d-inline-block align-top navbar-brand">
            <img
                src="https://res.cloudinary.com/intec-sup/image/upload/v1663354948/logostoreSup_ggomfc.jpg"
                style="width: 100%; height: 70px; object-fit: contain"
                />storeSup</a> 
            </center>
            </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                Alerte Notification
                </p>
                <div style="font-size: .8rem; margin: 0 30px">
                <p>Message: <h1>${emailReceipt}</h1></p><br/>
                </div>
            </div>
            </div>
        </div>
            `,
            // html body
        });

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



module.exports.getNotificationController = async (req, res) => {



    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const allNotification = await Notification.find({})
            // io.emit('Nouvelle notification recue', allNotification)
        
        // const token = await req.body.token
        // const decoded = jwt.verify(token, jwtSecret)

        // const userMail =  decoded.email
        // console.log('HERE')

        // console.log(userMail)
//         io.on('connection', async (socket) => {
//     console.log('A user is connected');
    
//     socket.on('message', (message) => {
//         console.log(`message from ${socket.id} : ${message}`);
//     })
    
//     socket.on('disconnect', () => {
//         console.log(`socket ${socket.id} disconnected`);
//     })
// })
// setTimeout(emitData,1000);

//      const allNotification2 = 
//             await Notification.find({})
// if(allNotification2!=undefined){
// io.emit('nouvelles-notifications',allNotification2)

// }






            
            // io.emit('nouvelle-notification-recue', allNotification2)
       

        if (!allNotification) {
            return res.status(401).send({ message: ""})
        }
        res.status(200).send(allNotification)
        // allNotification.length > 0 && main(allUser.map((row) => row.email), allNotification.map((row) => row.Message))
        
        
    } catch (error) {
        res.status(500).send({ message: "Internal server error " + error })
    }


}
module.exports.deleteNotificationController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const deleteNotification =
            await Notification.deleteMany({},{}).then().catch((error) => {console.log(error)})


        if (!deleteNotification) {
            return res.status(401).send({ message: "Impossible de supprimer"})
        }
        res.status(200).send(deleteNotification)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}
