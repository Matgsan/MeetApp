import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parse, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const page = req.query.page || 1;
    const offset = page * 10 - 10;
    const where = {};
    if (req.query.date) {
      const date = parse(req.query.date);
      where.date = {
        [Op.between]: [startOfDay(date), endOfDay(date)],
      };
    }
    const meetups = await Meetup.findAll({
      where,
      include: [{ model: File, as: 'file' }, { model: User, as: 'user' }],
      limit: 10,
      offset,
    });
    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Titulo é obrigatório'),
      description: Yup.string().required('Descrição é obrigatória'),
      location: Yup.string().required('Localização é obrigatória'),
      date: Yup.date()
        .required('Data é obrigatória')
        .min(new Date().toISOString(), 'Data não pode ser uma data passada'),
      file_id: Yup.number().required('Arquivo é obrigatório'),
    });

    try {
      await schema.validate(req.body);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date().min(
        new Date().toISOString(),
        'Data não pode ser uma data passada'
      ),
      file_id: Yup.number(),
    });
    try {
      await schema.validate(req.body);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }

    const { id } = req.params;
    const meetup = await Meetup.findByPk(id, { include: [{ all: true }] });
    if (!meetup) {
      return res
        .status(400)
        .json({ error: 'Nenhum Meetup encontrado com esse id' });
    }
    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não é o organizador desse Meetup' });
    }
    if (meetup.past) {
      return res.status(401).json({
        error: 'Você não pode editar um Meetup que já ocorreu',
      });
    }
    await meetup.update(req.body);
    return res.json(meetup);
  }

  async delete(req, res) {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id);
    if (!meetup) {
      return res
        .status(400)
        .json({ error: 'Nenhum Meetup encontrado com esse id' });
    }
    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não é o organizador desse Meetup' });
    }
    if (meetup.past) {
      return res.status(401).json({
        error: 'Você não pode deletar um Meetup que já ocorreu',
      });
    }
    await meetup.destroy();
    return res.send();
  }
}

export default new MeetupController();
