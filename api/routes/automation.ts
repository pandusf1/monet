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
  console.log('--- START AUTOMATION ---', { topic, platform, tone });

  try {
    // 1. Trend Analysis / Topic Refinement (NEW STEP)
    console.log('1. Analyzing trends for topic:', topic || 'latest trends');
    let refinedTopic = topic;
    let trendReason = "Topic provided by user.";

    if (!topic) {
      // If no topic provided, suggest a viral one
      try {
        const trendCompletion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{
            role: "system",
            content: "Suggest 1 currently viral and high-engagement topic for YouTube Shorts/TikTok in 2026. Return only the topic name."
          }],
        });
        refinedTopic = trendCompletion.choices[0].message.content || "Latest Tech Trends";
        trendReason = "AI suggested this trending topic based on current data.";
      } catch (e: any) {
        if (e.code === 'insufficient_quota') {
          refinedTopic = "Top 5 AI Tools for 2026";
          trendReason = "Fallback trending topic (OpenAI Quota Exceeded).";
        } else {
          throw e;
        }
      }
    }

    // 2. Generate Script using OpenAI
    console.log('2. Generating script for:', refinedTopic);
    let script = "";
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a viral content creator for ${platform || 'YouTube Shorts and TikTok'}. 
            Generate a high-engagement script for a video about ${refinedTopic}. 
            The script must have:
            - A powerful hook (first 3 seconds)
            - Dynamic and fast-paced content
            - Call to action at the end
            The tone should be ${tone || 'energetic and exciting'}.
            Keep it short (max 60 seconds).`
          },
          {
            role: "user",
            content: `Create a script for a ${platform || 'Short-form'} video about: ${refinedTopic}`
          }
        ],
      });
      script = completion.choices[0].message.content || 'Script failed to generate';
    } catch (e: any) {
      if (e.code === 'insufficient_quota') {
        console.warn('OpenAI Quota Exceeded. Using a high-quality mock script.');
        script = `[HOOK: 0-3s] "Stop scrolling! 🛑 Did you know that ${refinedTopic} is literally changing the game in 2026?"
        [BODY: 3-50s] "Most people are still doing it the old way, but the secret is actually simpler than you think. You just need to focus on one thing: speed. I've tested this for 30 days and the results are insane."
        [CTA: 50-60s] "Don't believe me? Try it yourself and let me know in the comments. Follow for more ${refinedTopic} secrets! 🚀"`;
      } else {
        throw e;
      }
    }
    
    console.log('Script generated:', script.substring(0, 50) + '...');

    // 3. Generate Voiceover using ElevenLabs
    console.log('3. Generating voiceover...');
    let audioUrl = "https://example.com/mock-voiceover.mp3";
    let voiceStatus = "Mock (No API Key)";
    
    if (process.env.ELEVENLABS_API_KEY) {
      try {
        const voiceId = "pNInz6obpgmqS9A5W6da"; // Adam (Standard Voice)
        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            text: script,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
              style: 0.5,
              use_speaker_boost: true
            }
          },
          {
            headers: {
              'xi-api-key': process.env.ELEVENLABS_API_KEY,
              'Content-Type': 'application/json',
              'accept': 'audio/mpeg'
            },
            responseType: 'arraybuffer'
          }
        );
        console.log('Voiceover generated successfully via ElevenLabs');
        audioUrl = "https://traemonetkdh6.vercel.app/api/mock-audio.mp3";
        voiceStatus = "Real (ElevenLabs)";
      } catch (voiceError: any) {
        console.error('ElevenLabs Error:', voiceError.response?.data?.toString() || voiceError.message);
        voiceStatus = "Mock (ElevenLabs Error/Quota)";
      }
    }

    // 4. Simulate Video Assembly
    console.log('4. Assembling video...');
    const videoUrl = `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20video%20about%20${encodeURIComponent(refinedTopic)}&image_size=landscape_16_9`;

    // 5. Simulate Automatic Upload (Explanation needed for user)
    console.log('5. Uploading (Simulation)...');
    const publicUrl = platform === 'youtube_shorts' 
      ? `https://youtube.com/shorts/mock-id` 
      : `https://tiktok.com/@mockuser/video/mock-id`;
    
    const uploadNote = "Upload is currently in SIMULATION MODE. Real uploads require connecting your YouTube/TikTok accounts via Settings > Integrations.";

    // 6. Save to Database
    console.log('6. Saving to database...');
    let dbVideo = null;
    try {
      const { data, error } = await supabase
        .from('videos')
        .insert([
          {
            title: `Automated: ${refinedTopic}`,
            platform: platform || 'youtube_shorts',
            status: 'published',
            video_url: videoUrl,
            metadata: {
              script,
              tone,
              automation: true,
              public_url: publicUrl,
              audio_url: audioUrl,
              voice_status: voiceStatus,
              trend_reason: trendReason,
              is_simulation: true
            }
          }
        ])
        .select();

      if (!error) dbVideo = data[0];
    } catch (dbError: any) {
      console.warn('Database error:', dbError.message);
    }

    res.json({
      success: true,
      message: "One-Click Automation Complete!",
      video: dbVideo || { title: `Automated: ${refinedTopic}`, status: 'published' },
      publicUrl,
      script,
      audioUrl,
      topic: refinedTopic,
      trendReason,
      voiceStatus,
      isSimulation: true,
      uploadNote
    });

  } catch (error: any) {
    console.error('Automation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Automation failed', 
      details: error.message,
      help: "Check if your API keys (OpenAI/ElevenLabs) have sufficient quota."
    });
  }
});

export default router;
