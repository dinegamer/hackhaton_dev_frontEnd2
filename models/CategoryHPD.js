const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require('joi')
const CategorySchema = new Schema({ 
Category: { type: String, unique: true},
});
const validateCategory = (data) => {
    const schema = joi.object({
        Category: joi.string().required().label('Categorie'),  
    }).unknown(true)
    return schema.validate(data)
}
const connectionParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }

const hpdDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/hypodrome?retryWrites=true&w=majority", connectionParams);
const Category3 = hpdDB.model("CategoryHPD", CategorySchema);
module.exports = {Category3, validateCategory};
