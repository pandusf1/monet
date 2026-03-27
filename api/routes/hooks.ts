import { Router, Request, Response } from 'express';
import { supabase } from '../supabase/client.js';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
  const { topic, platform, target_audience } = req.body;

  if (!topic) {
    return res.status(400).json({ success: false, error: 'Topic is required' });
  }

  try {
    // In a real application, we would call OpenAI here.
    // For now, we'll return some high-quality mock hooks.
    const mockHooks = [
      { text: `The secret to 10x your ${topic} that nobody is telling you...`, score: 98 },
      { text: `I tried every ${topic} tool for a week, and this one changed everything.`, score: 95 },
      { text: `Stop doing this if you want to grow your ${platform || 'channel'} in 2026.`, score: 92 },
      { text: `Why most people fail at ${topic} (and how to avoid it).`, score: 89 },
    ];

    res.json({
      success: true,
      hooks: mockHooks
    });
  } catch (error) {
    console.error('Error generating hooks:', error);
    res.status(500).json({ success: false, error: 'Failed to generate hooks' });
  }
});

export default router;
