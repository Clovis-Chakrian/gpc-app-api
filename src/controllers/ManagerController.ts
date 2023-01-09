import { Request, response, Response } from "express";
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
      password,
      pushToken
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
          password: hash,
          pushToken
        };

        await prismaClient.manager.create({
          data: manager
        }).then((resp: IManager) => {
          const token = jwt.encode({ id: resp.id, email: resp.email }, `${process.env.JWT_SECRET}`)
          return res.status(201).json({ token: token });
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
  },

  async login(req: Request, res: Response) {
    await prismaClient.$connect();

    const { email, password } = req.body;

    await prismaClient.manager.findFirst({
      where: { email: email }
    }).then(async manager => {
      if (manager) {
        await bcrypt.compare(password, manager?.password).then((result) => {
          if (result) {
            const token = jwt.encode({ id: manager.id, email: manager.email }, `${process.env.JWT_SECRET}`)
            return res.status(200).json({ token });
          }

          return res.status(401).json({
            message: 'Email ou senha incorretos'
          });
        }).catch(err => {
          return res.status(500).json({
            message: 'Houve um erro interno do servidor.',
            errors: err
          });
        });
      } else {
        return res.status(400).json({
          message: 'Email ou senha incorretos',
        });
      };
    });
  },
};