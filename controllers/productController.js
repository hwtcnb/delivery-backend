const uuid = require('uuid')
const path = require('path')
const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {

    async create(req, res, next) {
        try {
            const { name, price, shopId } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({ name, price, shopId, img: fileName })

            return res.json(product)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const {shopId} = req.query
        let products;

        if (!shopId) {
            products = await Product.findAll()
        }

        if(shopId) {
            products = await Product.findAll({where: {shopId}})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({where: {id}})
        return res.json(product)
    }
}

module.exports = new ProductController()