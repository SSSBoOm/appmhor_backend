import express, { Express, Router } from 'express'
const router: Router = express.Router()
import * as userController from '@/Controller/user.controller'

router.route('/').post(userController.createUser).patch(userController.updateUser)
router.route('/me').get(userController.getUser)

export const userRoute: Router = router
