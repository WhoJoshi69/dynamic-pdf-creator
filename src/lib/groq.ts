import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export interface ContentGenerationRequest {
  topic: string;
  slideCount?: number;
  tone?: 'professional' | 'casual' | 'technical' | 'marketing';
  industry?: string;
}

export interface GeneratedContent {
  coverTitle: string;
  coverSubtitle: string;
  slides: Array<{
    heading: string;
    description: string;
  }>;
  ctaHeading: string;
  ctaText1: string;
  ctaText2: string;
  ctaText3: string;
}

export async function generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
  const { topic, slideCount = 3, tone = 'professional', industry = 'technology' } = request;

  const prompt = `Create a presentation about "${topic}" with the following requirements:

- Industry: ${industry}
- Tone: ${tone}
- Number of content slides: ${slideCount}
- Target audience: Business professionals

Please generate content in the following JSON format:
{
  "coverTitle": "Main title for the cover page (should be impactful and attention-grabbing)",
  "coverSubtitle": "Subtitle that complements the main title",
  "slides": [
    {
      "heading": "Slide heading",
      "description": "Detailed description for the slide content. Use line breaks (\\n\\n) to separate paragraphs for better readability."
    }
  ],
  "ctaHeading": "Call-to-action heading",
  "ctaText1": "First line of CTA text",
  "ctaText2": "Second line of CTA text", 
  "ctaText3": "Third line of CTA text"
}

Make sure the content is engaging, informative, and follows a logical flow. Each slide should build upon the previous one. The CTA should encourage engagement or next steps.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert content creator and presentation designer. Generate high-quality, engaging presentation content that follows best practices for business presentations. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Groq API');
    }

    // Parse the JSON response
    const generatedContent = JSON.parse(response) as GeneratedContent;
    
    // Validate the response structure
    if (!generatedContent.coverTitle || !generatedContent.slides || !Array.isArray(generatedContent.slides)) {
      throw new Error('Invalid response structure from AI');
    }

    return generatedContent;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
}