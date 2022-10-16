require('dotenv').config()
const mongoose = require('mongoose')
const  MongoMemoryReplSet  = require('mongodb-memory-server')

// This will create an new instance of "MongoMemoryReplSet" and automatically start all Servers


// The ReplSet can be stopped again with

module.exports = async () => {
    // try {
//         const replset = await MongoMemoryReplSet.create({ replSet: { count: 4 } }); 
// // This will create an ReplSet with 4 members

//         const uri = replset.getUri();
//     } catch (error) {
//         console.log(error)
//     }

    const connectionParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
    await mongoose.connect(process.env.DB_URI, connectionParams).then((res) => {
        console.log('Connected to database ' )
    }).catch((err) => {
        console.log(err.message)
    })

    // const mainDB = mongoose.createConnection(process.env.DB_URI, connectionParams)

    // if(mainDB) {
    //     console.log('Successfully connected to database')
    // }

    // const bacodjiDB = mongoose.createConnection(process.env.BD_URI, connectionParams)

    // module.exports = {mainDB, bacodjiDB}

    
}

