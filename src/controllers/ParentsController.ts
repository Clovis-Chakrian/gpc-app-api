import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';
import * as bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { parentSchema } from '../yupSchemas/schemas';
import { ValidationError } from "yup";
import { IParent } from '../@types/interfaces';

export default {
  async create(req: Request, res: Response) {
    await prismaClient.$connect();
    const {
      name,
      lastname,
      studentFullName,
      grade,
      schoolClass,
      course,
      email,
      password
    } = req.body;

    const data = {
      name,
      lastname,
      studentFullName,
      grade,
      schoolClass,
      course,
      email,
      password
    };

    await parentSchema.validate(data, {
      abortEarly: false
    }).then(() => {
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS)).then(async (hash) => {
        const parent = {
          name,
          lastname,
          studentFullName,
          grade,
          schoolClass,
          course,
          email,
          password: hash
        };

        await prismaClient.parent.create({
          data: parent
        }).then((resp: IParent) => {
          const token = jwt.encode(resp.id, `${process.env.JWT_SECRET}`);
          return res.status(201).json({ token: token });
        }).catch((err) => {
          return res.status(500).json({
            message: 'Houve um erro interno no servidor.',
            error: err
          })
        });
      }).catch(err => {
        return res.status(500).json({
          message: 'Houve um erro iterno do servidor.',
          error: err
        });
      });
    }).catch((err: ValidationError) => {
      return res.status(400).json({
        message: 'Houve um erro na requisição.',
        error: err.errors
      });
    });
  },
};