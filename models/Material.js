const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {mainDB, bacodjiDB, hpdDB} = require('../db')
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

const Material = mongoose.model("Material", MaterialSchema);
module.exports = {Material, validateMaterial};
