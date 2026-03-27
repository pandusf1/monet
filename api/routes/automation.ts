import { Router, Request, Response } from 'express';
import OpenAI from 'openai';
import axios from 'axios';
import { supabase } from '../supabase/client.js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/one-click', async (req: Request, res: Response) => {
  const { topic, platform, tone } = req.body;

  if (!topic) {
    return res.status(400).json({ success: false, error: 'Topic is required' });
  }

  try {
    // 1. Generate Script using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a viral content creator for ${platform || 'YouTube Shorts and TikTok'}. 
          Generate a high-engagement script for a video about ${topic}. 
          The script must have:
          - A powerful hook (first 3 seconds)
          - Dynamic and fast-paced content
          - Call to action at the end
          The tone should be ${tone || 'energetic and exciting'}.`
        },
        {
          role: "user",
          content: `Create a script for a ${platform || 'Short-form'} video about: ${topic}`
        }
      ],
    });

    const script = completion.choices[0].message.content;

    // 2. Generate Voiceover (Placeholder for now, but integrated in logic)
    // In real scenario, call ElevenLabs API here
    const voiceoverUrl = "https://example.com/generated-voiceover.mp3"; 

    // 3. Simulate Video Assembly (Placeholder)
    // In real scenario, use FFmpeg to combine script, voiceover, and stock footage
    const videoUrl = `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20video%20about%20${encodeURIComponent(topic)}&image_size=landscape_16_9`;

    // 4. Simulate Automatic Upload
    // In real scenario, use YouTube/TikTok API
    const uploadStatus = "Success";
    const publicUrl = platform === 'youtube_shorts' 
      ? `https://youtube.com/shorts/mock-id` 
      : `https://tiktok.com/@mockuser/video/mock-id`;

    // 5. Save to Database
    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          title: `Automated Video: ${topic}`,
          platform: platform || 'youtube_shorts',
          status: 'published',
          video_url: videoUrl,
          metadata: {
            script,
            tone,
            automation: true,
            public_url: publicUrl
          }
        }
      ])
      .select();

    if (error) throw error;

    res.json({
      success: true,
      message: "Video automatically generated and uploaded successfully!",
      video: data[0],
      publicUrl,
      script
    });

  } catch (error: any) {
    console.error('Automation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Automation failed', 
      details: error.message 
    });
  }
});

export default router;
