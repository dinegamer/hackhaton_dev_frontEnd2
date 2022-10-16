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

const Property = mongoose.model("Property", PropertySchema);
module.exports = {Property, validateProperty};
