import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createEvent } from '../utils/googleCalendar.js';

const router = express.Router();

router.post('/calendar', authMiddleware, async (req, res) => {
  const { title, description, start, end } = req.body;
  try {
    const event = await createEvent('primary', {
      summary: title,
      description,
      start: { dateTime: start, timeZone: 'Asia/Kolkata' },
      end: { dateTime: end, timeZone: 'Asia/Kolkata' }
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
