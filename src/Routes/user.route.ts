import express, { Express, Router } from 'express'
const router: Router = express.Router()
import * as userController from '@/Controller/userTemp.controller'

router.route('/').post(userController.createUser)
router.route('/logout').post(userController.Logout)
router.route('/me').get(userController.getUser)

export const userRoute: Router = router
