const Router = require('express')
const router = new Router()
const shopRouter = require('./shopRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')


router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/shop', shopRouter)
router.use('/basket', basketRouter)

module.exports = router
