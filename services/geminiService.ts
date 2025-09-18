import { GoogleGenAI, Modality, Part } from "@google/genai";

// Helper function to convert File to a Gemini Part
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

export const generateIconFromReference = async (prompt: string, referenceImage: File): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = await fileToGenerativePart(referenceImage);
  const textPart = { text: `Using the provided image as a style reference, create a new icon based on this task: "${prompt}". The final generated image must be perfectly square (1:1 aspect ratio).` };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);
      if (imagePart && imagePart.inlineData) {
        const base64ImageBytes: string = imagePart.inlineData.data;
        const mimeType = imagePart.inlineData.mimeType;
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    // Fallback if no image is found in the response
    throw new Error("The AI did not return a valid image. It might have refused the request.");

  } catch (error) {
    console.error("Error generating icon with Gemini:", error);
    throw new Error("Failed to communicate with the AI model. Please check the console for more details.");
  }
};