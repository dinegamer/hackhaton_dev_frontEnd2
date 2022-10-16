const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require('joi')
const MaterialSchema = new Schema({ 
Material: { type: String, unique: true },
});
const validateMaterial = (data) => {
    const schema = joi.object({
        Material: joi.string().required().label('Materiel'),
        
    }).unknown(true)
    return schema.validate(data)
}
 const connectionParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
const hpdDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/hypodrome?retryWrites=true&w=majority", connectionParams);

const Material3 = hpdDB.model("MaterialHPD", MaterialSchema);

module.exports = {Material3, validateMaterial};
