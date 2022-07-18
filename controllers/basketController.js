const { BasketProduct } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {

    async create(req, res, next) {
        try {
            const {userId, productId} = req.body

            const basketProduct = await BasketProduct.create({userId, productId})

            return res.json(basketProduct)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async get(req, res) {
        const {userId} = req.query
        const basketProducts = await BasketProduct.findAll({userId})
        return res.json(basketProducts)
    }
}

module.exports = new BasketController()