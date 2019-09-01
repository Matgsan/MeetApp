import { Op } from 'sequelize';
import { isSameHour, parse } from 'date-fns';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';
import User from '../models/User';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: { [Op.gt]: new Date() },
          },
          include: [
            {
              model: User,
              as: 'user',
            },
            {
              model: File,
              as: 'file',
            },
          ],
        },
      ],
      order: [[{ model: Meetup, as: 'meetup' }, 'date']],
    });
    return res.json(subscriptions);
  }

  async store(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    if (!meetup) {
      return res
        .status(400)
        .json({ error: 'Nenhum Meetup encontrado com esse id' });
    }

    if (meetup.user_id === req.userId) {
      return res.status(401).json({
        error: 'Você não pode se inscrever em um Meetup que organiza',
      });
    }

    if (meetup.past) {
      return res.status(400).json({
        error: 'Você não pode se inscrever em Meetups que já aconteceram',
      });
    }
    const check = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            [Op.or]: [
              {
                date: meetup.date,
              },
              {
                id: meetup.id,
              },
            ],
          },
        },
      ],
    });
    if (check) {
      if (check.meetup_id === meetup.id) {
        return res.status(400).json({
          error: 'Você já está inscrito nesse Meetup',
        });
      }
      const checkMeetup = check.Meetup;
      if (isSameHour(parse(checkMeetup.date), parse(meetup.date))) {
        return res.status(400).json({
          error: 'Você já está inscrito em um Meetup no mesmo horário',
        });
      }
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });
    return res.json(subscription);
  }

  async delete(req, res) {
    const { id } = req.params;
    const subscription = await Subscription.findByPk(id);
    if (!subscription) {
      return res
        .status(400)
        .json({ error: 'Nenhuma inscrição encontrada com esse id' });
    }
    if (subscription.past) {
      return res.status(401).json({
        error:
          'Você não pode cancelar uma inscricão de um Meetup que já ocorreu',
      });
    }
    await subscription.destroy();
    return res.send();
  }
}

export default new SubscriptionController();
