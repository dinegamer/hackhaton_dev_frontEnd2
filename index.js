require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')
const userRoute = require('./routes/api/users')
const loginRoute = require('./routes/api/login')
const logoutRoute = require('./routes/api/logout')
const stockRoute = require('./routes/api/stocks')
const stockRouteBD = require('./routes/api/stocksBD')
const stockRouteHPD = require('./routes/api/stocksHPD')
const orderRoute = require('./routes/api/order')
const orderRouteBD = require('./routes/api/orderBD')
const orderRouteHPD = require('./routes/api/orderHPD')
const materialRoute = require('./routes/api/material')
const propertyRoute = require('./routes/api/property')
const categoryRoute = require('./routes/api/category')
const fetchRoute = require('./routes/api/fetch')
const userFetchRoute = require('./routes/api/userFetch')
const notificationRoute = require('./routes/api/notification')
const notificationBacodjiRoute = require('./routes/api/notificationBacodji')
const notificationHypodromeRoute = require('./routes/api/notificationHypodrome')
const statsRoute = require('./routes/api/stats')
const statsTwoRoute = require('./routes/api/statsTwo')
const fetchSingleUser = require('./routes/api/singleUserFetch')
const transactionRoute = require('./routes/api/transaction')
const http = require('http')
const socketIO = require('socket.io');
const {auth} = require('./middlewares/auth')
const { Notification } = require('./models/Stock')
const mongoose = require('mongoose')

// const http = require('http').Server(app);
// const io = require('socket.io')(http);


// const http = require("http");

//Database connection

// module.export = {io};
//middleWare
const server = http.createServer(app)
const io = socketIO(server, {

    cors:{
            origin: "*"
    }
})
io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

// let interval;


// io.on('connection', (socket) => {
//     console.log('A user is connected');
    
//     socket.on('message', (message) => {
//         console.log(`message from ${socket.id} : ${message}`);
//     })
    
//     socket.on('disconnect', () => {
//         console.log(`socket ${socket.id} disconnected`);
//     })
// })

connection()


const allNotification3 = async () => {

  return await Notification.find({})
  
}
const allNotification2 = allNotification3.length
// const server = http.createServer(app)
// const io = socketIO(server, {
//   transports:['polling'],
//   cors:{
//     cors: {
//       origin: "http://localhost:3000",
//        methods: ["GET", "POST"],
//                 transports: 'polling',
//     }
//   }
// })

// let counter =0;

// io.on('connection', async (socket) => {
//         counter =   counter+1;
// console.log('New Users Connected');

// const socketIO = require('socket.io')(http, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

//Add this before the app.get() block
// socketIO.on("connection", async (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);
    
//     /*
//     The code snippet loops through the event list 
//     and checks if it's time for any event 
//     before sending a message containing 
//     the event details to the React app
//     */
//    const allNotification1 = 

//   await Notification.find({})

//   const allNotification2 = allNotification1.length
  

    
//                     socket.emit("nouvelles-notifications", allNotification2);
               
    
//     socket.on("disconnect", () => {
//         socket.disconnect();
//     });
// });

// let count = 0;
// setInterval(() => {
//   socket.volatile.emit("ping", ++count);
// }, 1000);

// const allNotification2 = 
//             await Notification.find({})
// if(allNotification2.length > 0){
// io.emit('nouvelles-notifications',allNotification2)
// console.log('LALALALALLALAL')
// } 
    // socket.on('disconnect', function(socket){        
    //      console.log(`socket ${socket.id} disconnected`);
    // });
// });




const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


//routes
app.use('/api/users', auth, userRoute)
app.use('/api/login', loginRoute)
app.use('/api/logout', logoutRoute)
app.use('/api/stock', auth,  stockRoute)
app.use('/api/stockBD', auth,  stockRouteBD)
app.use('/api/stockHPD', auth,  stockRouteHPD)
app.use('/api/fetchitem', auth, fetchRoute)
app.use('/api/fetchUser', auth,  userFetchRoute)
app.use('/api/material', auth,  materialRoute)
app.use('/api/category', auth,  categoryRoute)
app.use('/api/property', auth,  propertyRoute)
app.use('/api/order',   orderRoute)
app.use('/api/orderBD',   orderRouteBD)
app.use('/api/orderHPD',   orderRouteHPD)
app.use('/api/notification', auth,  notificationRoute)
app.use('/api/notificationBacodji', auth,  notificationBacodjiRoute)
app.use('/api/notificationHypodrome', auth,  notificationHypodromeRoute)
app.use('/api/stats', auth,  statsRoute)
app.use('/api/statsTwo', auth,  statsTwoRoute)
app.use('/api/fetchSingleUser', fetchSingleUser)
app.use('/api/transaction', auth, transactionRoute)




server.listen(PORT, ()=> console.log('listening on port '+PORT))

const connection2 = mongoose.connection;
connection2.once("open", () => {
  console.log("MongoDB database connected");

 
  const NotificationChangeStream = connection2.collection("notifications").watch();

  NotificationChangeStream.on("change", (change) => {
    console.log(change.operationType)
    switch (change.operationType) {
      case "insert":

          console.log('Insertion Op')
        const notification = {
          _id: change.fullDocument._id,
          message: change.fullDocument.Message,
        };
        console.log(notification)

        // io.of("/api/socket").emit("newThought", thought);
        io.emit("notification", allNotification2 ,notification.message);

        break;

    //   case "delete":
    //     io.of("/api/socket").emit("deletedThought", change.documentKey._id);
    //     break;
    }
  });
});



