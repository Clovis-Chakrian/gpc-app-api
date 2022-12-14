import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";
import * as bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

export default {
  async create(req: Request, res: Response) {
    await prismaClient.$connect();

    const {
      name,
      lastname,
      email,
      password
    } = req.body;

    bcrypt.hash(password, Number(process.env.SALTROUNDS)).then(hash => {
      const manager = {
        name,
        lastname,
        email,
        password: hash
      };

      return res.json(manager);
    });
  }
};