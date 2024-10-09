// EmailResponder.tsx
import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

interface EmailResponderProps {
  context: string;
  tone: string;
  length: string;
  triggerGenerate: boolean; // Update prop to trigger email generation
}

const EmailResponder: React.FC<EmailResponderProps> = ({ context, tone, length, triggerGenerate }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateProfessionalEmail = async () => {
    setLoading(true);
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // Only for development or browser extensions
    });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4", // Ensure access to this model
        messages: [
          { role: "system", content: "You are an assistant that generates professional email responses." },
          {
            role: "user",
            content: `Context: ${context}\n\nTone: ${tone}\n\nLength: ${length}\n\nPlease generate an email response based on this context.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.5,
      });

      setResponse(completion.choices[0].message.content || '');
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('Error generating the response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate email when triggerGenerate state changes
  useEffect(() => {
    if (triggerGenerate) {
      generateProfessionalEmail();
    }
  }, [triggerGenerate]); // Only runs when triggerGenerate changes

  return (
    <div className="mt-2">
      {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="text-center text-white">
          <div className="border-4 border-white border-opacity-30 border-t-4 border-t-white rounded-full w-10 h-10 animate-spin"></div>
        </div>
      </div>}
      {response && (
        <div className="text-[#222] mt-3 p-4 mb-1 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Generated Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default EmailResponder;
