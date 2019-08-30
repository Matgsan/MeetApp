import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizerController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      include: [{ model: File, as: 'file' }],
    });
    return res.json(meetups);
  }
}

export default new OrganizerController();
