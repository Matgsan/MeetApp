import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email('Deve utilizar um e-mail válido')
        .required('Email é obrigatório'),
      password: Yup.string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve conter no mínimo 6 caracteres'),
    });

    try {
      await schema.validate(req.body);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Deve utilizar um e-mail válido'),
      oldPassword: Yup.string().min(
        6,
        'Senha deve conter no mínimo 6 caracteres'
      ),
      password: Yup.string()
        .min(6, 'Senha deve conter no mínimo 6 caracteres')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('Nova senha deve ser preenchida') : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    try {
      await schema.validate(req.body);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
