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

const Category = mongoose.model("Category", CategorySchema);
module.exports = {Category, validateCategory};
