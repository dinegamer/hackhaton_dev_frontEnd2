const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require('joi')
const OrderSchema = new Schema({ 
TransactionId: { type: String},
ItemID: { type: String},
ItemName: { type: String , required: true},
Category: { type: String, required: true},
Material: { type: String, required: true},
Properties: { type: String, required: true},
Amount: { type: Number, default: 0},
Quantity: { type: Number },
TransactionDate: { type: String},
TransactionTime: { type: String },
CustomerNumber: { type: String },
StockDate: { type: String},
StockTime: { type: String },
TMonth: { type: Number},
TYear: { type: Number },
TDay: { type: Number }
});
const validateOrder = (data) => {
    const schema = joi.object({
        TransactionID: joi.string().label("Id de l'article"),
        ItemID: joi.string().label("Id de l'article"),
        ItemName: joi.string().required().label('Nom de l\'article '),
        Category: joi.string().required().label('Categorie'),
        Material: joi.string().required().label('Materiel'),
        Properties: joi.string().required().label('Caracteristiques'),
        TransactionDate: joi.date().label('TransactionDate'),
        TransactionTime: joi.string().label('TransactionTime'),
        StockDate: joi.date().label('TransactionDate'),
        StockTime: joi.string().label('TransactionTime'),
        CustomerNumber: joi.string().label('Numero du fournisseur'),
        Amount: joi.number().label('Montant'),
        Quantity: joi.number().label('Quantité'),
        TMonth: joi.number().label('Mois'),
        TYear: joi.number().label('Annee'),
        TDay: joi.number().label('Jour'),
        
    }).unknown(true)
    return schema.validate(data)
}
const connectionParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
const bacodjiDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/bacodji?retryWrites=true&w=majority", connectionParams)
const Order2 = bacodjiDB.model("OrderDB", OrderSchema);

module.exports = {Order2, validateOrder};
