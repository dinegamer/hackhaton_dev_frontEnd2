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
const bacodjiDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/bacodji?retryWrites=true&w=majority", connectionParams)
const Property2 = bacodjiDB.model("PropertyBD", PropertySchema);

module.exports = {Property2, validateProperty};
