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

const bacodjiDB = mongoose.createConnection("mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/bacodji?retryWrites=true&w=majority", connectionParams)
const Category2 = bacodjiDB.model("CategoryBD", CategorySchema);
module.exports = {Category2, validateCategory};
