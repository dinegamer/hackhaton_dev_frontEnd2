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
const bacodjiDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/bacodji?retryWrites=true&w=majority", connectionParams)
const Material2 = bacodjiDB.model("MaterialBD", MaterialSchema);

module.exports = {Material2, validateMaterial};
