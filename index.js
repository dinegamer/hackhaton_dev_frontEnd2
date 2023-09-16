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
const userStatusRoute = require('./routes/api/userStatusUpdtae')
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
const { Notification2 } = require('./models/StockBD')
const { Notification3 } = require('./models/StockHPD')
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
// const http = require("http");

//Database connection

// module.export = {io};
//middleWare
const server = http.createServer(app)
const io = socketIO(server, {

    cors:{
            origin: "*",
            methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
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
//     })c
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




//routes
app.use('/api/users', auth, userRoute)
app.use('/api/login', loginRoute)
app.use('/api/logout', logoutRoute)
app.use('/api/stock', auth,  stockRoute)
app.use('/api/stockBD', auth,  stockRouteBD)
app.use('/api/stockHPD', auth,  stockRouteHPD)
app.use('/api/fetchitem', auth, fetchRoute)
app.use('/api/fetchUser', auth,  userFetchRoute)
app.use('/api/userStatus', auth,  userStatusRoute)
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



const connectionParamsBacoji = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
const connection3 = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/bacodji?retryWrites=true&w=majority", connectionParamsBacoji)

connection2.once("open", () => {
  console.log("MongoDB database connected");

 
  const NotificationChangeStream = connection2.collection("notifications").watch();
console.log('***************************************')
console.log(connection2.collections)
  NotificationChangeStream.on("change", (change) => {
    // console.log(change.operationType)
    switch (change.operationType) {
      case "insert":

          console.log('Insertion Op')
          console.log('HERE')
        const notification = {
          _id: change.fullDocument._id,
          message: change.fullDocument.Message,
        };
        // console.log(notification)

        // io.of("/api/socket").emit("newThought", thought);
        io.emit("notification", allNotification2 ,notification.message);

        break;

    //   case "delete":
    //     io.of("/api/socket").emit("deletedThought", change.documentKey._id);
    //     break;
    }
  });

});


//BACODJICORONI DATABASE CONNECTIONS FOR EMITING ONLY ITS NOTIFICATIONS

connection3.once("open", () => {
  console.log("TWICE database connected");

const NotificationChangeStreamBacodjicoroni = connection3.collection("notificationbds").watch();
console.log('TEST TEST TEST***********************************')

console.log(connection3.collections)
NotificationChangeStreamBacodjicoroni.on("change", (change) => {
    // console.log(change.operationType)
    switch (change.operationType) {
      case "insert":

          console.log('Insertion OpERTATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
          console.log('HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        const notification = {
          _id: change.fullDocument._id,
          message: change.fullDocument.Message,
        };
        console.log(notification.message)

        // io.of("/api/socket").emit("newThought", thought);
        io.emit("notificationBacodji", allNotification2 ,notification.message);
        

        break;

    //   case "delete":
    //     io.of("/api/socket").emit("deletedThought", change.documentKey._id);
    //     break;
    }
  });





});















const pipeline = [
  {
      '$match': {
          'operationType': 'insert',
      },
  }
];
Notification.watch(pipeline, {fullDocument: 'updateLookup'}).
        on('change', async (data) => {
            console.log("ICIIIIIIIIIIIIIIIIIIIIIIIIIII SIEGE")
            const quantity = data.fullDocument.Quantity
            const message = data.fullDocument.Message
            const allNotification2 = 1
           
            io.emit("notification", allNotification2 , message);
            
        });
        Notification2.watch(pipeline, {fullDocument: 'updateLookup'}).
        on('change', async (data) => {
          console.log("ICIIIIIIIIIIIIIIIIIIIIIIIIIII BACODJICORONI")
          const quantity = data.fullDocument.Quantity
            const message = data.fullDocument.Message 
            const allNotification2 = 1
           
            io.emit("notificationBacodji", allNotification2 , message);
            
        });
        Notification3.watch(pipeline, {fullDocument: 'updateLookup'}).
        on('change', async (data) => {
          console.log("ICIIIIIIIIIIIIIIIIIIIIIIIIIII HIPPODROME")
          const quantity = data.fullDocument.Quantity
            const message = data.fullDocument.Message 
            const allNotification2 = 1
           
            io.emit("notificationHyppodrome", allNotification2 , message);
            
        });


