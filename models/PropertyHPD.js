const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require('joi')
const PropertySchema = new Schema({ 
Property: { type: String, unique: true},
});
const validateProperty = (data) => {
    const schema = joi.object({
        Property: joi.string().required().label('Caracteristiques')
    }).unknown(true)
    return schema.validate(data)
}
const connectionParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
const hpdDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/hypodrome?retryWrites=true&w=majority", connectionParams)
const Property3 = hpdDB.model("PropertyHPD", PropertySchema);

module.exports = {Property3, validateProperty};
