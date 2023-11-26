import { Request, Response } from 'express'
import { db, cookieConfig } from '..'
const nanoid = require('nanoid')

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const id = nanoid()
    db.query(
      'INSERT INTO `user`(`id`, `email`, `thai_id`, `phone`, `firstname`, `lastname`, `gender`, `birthday`, `address`, `subdistrist`, `district`, `province`, `postcode`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        req.body.email,
        req.body.thai_id,
        req.body.phone,
        req.body.firstname,
        req.body.lastname,
        'Male',
        req.body.birthday,
        req.body.address,
        req.body.subdistrist,
        req.body.district,
        req.body.province,
        req.body.postcode,
      ],
      (err: any, results: any) => {
        if (err) {
          console.log(err)
          return res.status(400).send(err)
        }
        res.cookie('id', id, cookieConfig)
        return res.status(201).send({
          message: 'Insert Success',
          data: results,
          status: true,
        })
      },
    )
  } catch (error) {
    res.status(400).send({
      message: error,
      status: false,
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    res.status(200).send({
      message: 'Update Success',
      status: true,
    })
  } catch (error) {
    res.status(400).send({
      message: 'Update Fail',
      status: false,
    })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id || ''
    if (id === '') {
      throw new Error('No Cookie')
    }

    await db.query('SELECT * FROM user WHERE id = ? LIMIT 1'[id], (err: any, results: any) => {
      if (err) {
        console.log(err)
        res.status(403).clearCookie('id')
        return res.end()
      }
      res.status(200).send({
        message: 'Get Success',
        data: results,
        status: true,
      })
    })
  } catch (error: any) {
    res.status(403).send({
      message: error,
      status: false,
    })
  }
}

export const Logout = async (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie('id')
    return res.end()
  } catch (error) {
    res.status(400).send({
      message: 'Logout Fail',
      status: false,
    })
  }
}
