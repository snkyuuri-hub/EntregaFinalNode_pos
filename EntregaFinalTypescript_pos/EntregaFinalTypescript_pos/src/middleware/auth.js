import { Request, Response, NextFunction } from "express";
import User from "../model/user/user"; 

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const headers = req.headers;
  const xApiKey = headers["x-api-key"] as string | undefined;

  if (!xApiKey) {
    res.status(401).json({
      message: "Você precisa passar o x-api-key",
    });
    return;
  }

  try {
    const user = await User.findOne({
      where: { token: xApiKey },
    });

    if (!user) {
      res.status(401).json({
        message: "Você não está autorizado",
      });
      return;
    }

    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Erro interno no servidor",
    });
  }
};

export default auth;