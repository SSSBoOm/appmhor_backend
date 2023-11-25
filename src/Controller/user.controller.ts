import { User } from '@/lib/prisma'
import { Request, Response } from 'express'
import { cookieConfig } from '..'

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await User.create({
      data: {
        email: req.body.email,
        thai_id: req.body.thai_id,
        phone: req.body.phone,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender || 'Male',
        birthday: req.body.birthday,
        address: req.body.address,
        subdistrist: req.body.subdistrist,
        district: req.body.district,
        province: req.body.province,
        postcode: req.body.postcode,
      },
    })

    res.cookie('id', result.id, cookieConfig)

    res.status(201).send({
      data: result,
      message: 'Insert Success',
      status: true,
    })
  } catch (error) {
    console.log(error)

    res.status(400).send({
      message: 'Insert Fail',
      status: false,
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id || ''
    if (id === '') {
      throw new Error('No Cookie')
    }
    const result = await User.update({
      where: {
        id: req.cookies.id,
      },
      data: {
        address: req.body.address,
        subdistrist: req.body.subdistrist,
        district: req.body.district,
        province: req.body.province,
        postcode: req.body.postcode,
      },
    })

    res.status(200).send({
      message: 'Update Success',
      status: true,
    })
  } catch (error) {
    res.status(400).send({
      message: 'Insert Fail',
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
    const result = await User.findUnique({
      where: {
        id: id,
      },
    })

    if (result === null) {
      res.status(403).clearCookie('id')
      return res.end()
    }

    res.status(200).send({
      message: 'Get Success',
      data: result,
      status: true,
    })
  } catch (error: any) {
    res.status(403).send({
      message: error?.message,
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
      message: 'Insert Fail',
      status: false,
    })
  }
}
