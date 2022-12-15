import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";
import * as bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { managerSchema } from '../yupSchemas/schemas';
import { ValidationError } from "yup";
import { IManager } from '../@types/interfaces';

export default {
  async create(req: Request, res: Response) {
    await prismaClient.$connect();

    const {
      name,
      lastname,
      email,
      password
    } = req.body;

    const data = {
      name,
      lastname,
      email,
      password
    };

    managerSchema.validate(data, {
      abortEarly: false
    }).then(() => {
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS)).then(async (hash) => {
        const manager = {
          name,
          lastname,
          email,
          password: hash
        };

        await prismaClient.manager.create({
          data: manager
        }).then((resp: IManager) => {
          const token = jwt.encode(resp.id, `${process.env.JWT_SECRET}`)
          return res.status(201).json({token: token});
        }).catch((err) => {
          return res.status(500).json({
            message: 'Houve um erro interno do servidor.',
            error: err
          });
        })
      });
    }).catch((err: ValidationError) => {
      return res.status(400).json({
        message: 'Houve um erro na requisição.',
        errors: err.errors
      });
    });
  }
};