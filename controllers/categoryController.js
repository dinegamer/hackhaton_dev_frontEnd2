const { Category, validateCategory } = require('../models/Category')
const { Category2 } = require('../models/CategoryBD')
const { Category3 } = require('../models/CategoryHPD')
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;
module.exports.getCategoryController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)

    try {
        const allCategory = decoded.site === 'bacodji' ? await Category2.find() : decoded.site === 'hypodrome' ? await Category3.find() : await Category.find()

        if (!allCategory) {
            return res.status(401).send({ message: "Aucune categorie presente dans la base"})
        }
        res.status(200).send(allCategory)

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}

module.exports.addCategoryController = async (req, res) => {
    const token = req.headers["auth-token"];
    const decoded = jwt.verify(token, jwtSecret)
    try {
        const { error } = validateCategory(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const newCategory = decoded.site === 'bacodji' ? await new Category2(
            {
                ...req.body
            }
        ).save() : decoded.site === 'hypodrome' ? await new Category3(
            {
                ...req.body
            }
        ).save() : await new Category(
            {
                ...req.body
            }
        ).save()
        
        res.status(200).send({message: "Listing du Category"})

    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }


}