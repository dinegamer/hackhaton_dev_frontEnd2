const { Property, validateProperty } = require('../models/Property')
const { Property2 } = require('../models/PropertyBD')
const { Property3 } = require('../models/PropertyHPD')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.getPropertyController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const allProperty = decoded.site === 'bacodji' ? await Property2.find() : 
            decoded.site === 'hypodrome' ? await Property3.find() : await Property.find()

        if (!allProperty) {
            return res.status(401).send({ message: "Aucune caracteristique d'article present dans ma base"})
        }
        res.status(200).send(allProperty)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}

module.exports.addPropertyController = async (req, res) => {
    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const { error } = validateProperty(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const newProperty = decoded.site === 'bacodji' ? await new Property2(
            {
                ...req.body
            }
        ).save() : decoded.site === 'hypodrome' ? await new Property3(
            {
                ...req.body
            }
        ).save() : await new Property(
            {
                ...req.body
            }
        ).save()
        res.status(200).send(newProperty)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}