const { Material, validateMaterial } = require('../models/Material')
const { Material2 } = require('../models/MaterialBD')
const { Material3 } = require('../models/MaterialHPD')

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;

module.exports.getMaterialController = async (req, res) => {

    try {
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        const allMaterial = decoded.site === 'bacodji' ? await Material2.find({})
         : decoded.site === 'hypodrome' ? await Material3.find({}) : await Material.find({})
        const { error } = allMaterial;
        if (error) {
            return res.send(error)
        }
        if (!allMaterial) {
            return res.status(401).send({ message: "Aucun materiel present dans la base de donnees"})
        }
        res.status(200).send(allMaterial)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}

module.exports.deleteMaterialController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)
    const id = req.params.id
    decoded.site === 'bacodji' ? await Material2.findByIdAndDelete(id) : 
    decoded.site === 'hypodrome' ? await Material3.findByIdAndDelete(id) : await Material.findByIdAndDelete(id)
    res.send("id removed " +id)

}

module.exports.addMaterialController = async (req, res) => {
    try {
        const { error } = validateMaterial(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, jwtSecret)
        
        const newMaterial = decoded.site === 'bacodji' ? await new Material2(
            {
                ...req.body
            }
        ).save() : decoded.site === 'hypodrome' ?

        await new Material3(
            {
                ...req.body
            }
        ).save() : await new Material(
            {
                ...req.body
            }
        ).save()

        res.status(200).send({message: "Listing du Material " + newMaterial})

    } catch (error) {
        res.status(500).send({ message: "Internal server error " + error.message })
    }


}