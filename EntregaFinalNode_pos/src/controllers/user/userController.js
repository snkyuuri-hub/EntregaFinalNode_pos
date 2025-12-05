import create from '../../services/user/createUser.js';
import login from '../../services/user/auth.js';

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      res.json({
        message: "Os campos nome, email e senha são obrigatórios",
      });
      return;
    }

    const user = await create(req.body);

    if (!user) {
      res.status(400);
      res.json({
        message: "Erro ao criar usuário",
      });
      return;
    }

    res.status(201);
    res.json({
      message: "Usuário criado com sucesso",
      token: user.token,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message: "Ocorreu um erro ao criar usuário",
    });
  }
};

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      res.json({
        message: "Email e senha são obrigatórios",
      });
      return;
    }

    const user = await login(email, password);

    if (!user) {
      res.status(401);
      res.json({
        message: "Email ou senha inválidos",
      });
      return;
    }

    res.status(200);
    res.json({
      message: "Login realizado com sucesso",
      token: user.token,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      message: "Ocorreu um erro ao autenticar usuário",
    });
  }
};

export default {
  createUser,
  auth,
};