import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parse, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';

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
      include: [User],
      limit: 10,
      offset,
    });
    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      location: Yup.string().required('Location is required'),
      date: Yup.date()
        .required('Date is required')
        .min(new Date().toISOString(), 'Date cannot be a past date'),
      file_id: Yup.number().required('File is required'),
    });

    try {
      await schema.validate(req.body);
    } catch ({ message }) {
      return res.status(400).json({ message });
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
        'Date cannot be a past date'
      ),
      file_id: Yup.number(),
    });
    try {
      await schema.validate(req.body);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }

    const { id } = req.params;
    const meetup = await Meetup.findByPk(id);
    if (!meetup) {
      return res
        .status(400)
        .json({ error: 'No Meetup found with the provided id' });
    }
    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You are not the organizer of this meetup' });
    }
    if (meetup.past) {
      return res.status(401).json({
        error: 'You cannot edit a meetup that already occured',
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
        .json({ error: 'No Meetup found with the provided id' });
    }
    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You are not the organizer of this meetup' });
    }
    if (meetup.past) {
      return res.status(401).json({
        error: 'You cannot cancel a meetup that already occured',
      });
    }
    await meetup.destroy();
    return res.send();
  }
}

export default new MeetupController();
