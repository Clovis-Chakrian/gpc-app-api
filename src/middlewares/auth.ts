import { NextFunction, Request, Response } from "express";
import jwt from 'jwt-simple';
import { IManager } from "../@types/interfaces";
import prismaClient from "../database/prismaClient";

interface IToken {
  id: string,
  email: string
};

async function auth(req: Request, res: Response, next: NextFunction) {
  await prismaClient.$connect();
  const token = req.headers['x-access-token'];
  //

  if (!token || token == '') {
    return res.status(401).json({
      message: 'Acesso não autorizado.'
    });
  };

  try {
    const decodedToken: IToken = await jwt.decode(`${token}`, `${process.env.JWT_SECRET}`);

    prismaClient.manager.findUnique({
      where: { id: decodedToken.id }
    }).then((manager) => {
      if (manager?.email != decodedToken.email) {
        return res.status(401).json({
          message: 'Acesso não autorizado.'
        });
      };

      next();
      return;
    }).catch((err) => {
      console.log(err)
      return res.status(401).json({
        message: 'Acesso não autorizado.'
      });
    });
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: 'Acesso não autorizado.'
    });
  };
};

export default auth;