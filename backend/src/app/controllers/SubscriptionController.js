import { Op } from 'sequelize';
import { isSameHour, parse } from 'date-fns';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: { [Op.gt]: new Date() },
          },
        },
      ],
      order: [[Meetup, 'date']],
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
        },
      ],
    });
    if (!meetup) {
      return res
        .status(400)
        .json({ error: 'No Meetup found with the provided id' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'You cannot subscribe to a meetup that you organize' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'You cannot subscribe to past meetups' });
    }
    const check = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
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
          error: 'You are already subscribed to this Meetup',
        });
      }
      const checkMeetup = check.Meetup;
      if (isSameHour(parse(checkMeetup.date), parse(meetup.date))) {
        return res.status(400).json({
          error:
            'You are already subscribed to another Meetup in the same hour',
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
}

export default new SubscriptionController();
