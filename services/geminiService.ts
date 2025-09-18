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
  // Fix: Add check for API_KEY to prevent runtime errors.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set. Please follow the setup instructions.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = await fileToGenerativePart(referenceImage);
  const textPart = { text: prompt };

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
      // The response might contain multiple image parts. Typically, the edited or
      // generated image is the last one in the parts array. We filter for all
      // image parts and select the last one to avoid returning the input reference image.
      const imageParts = response.candidates[0].content.parts.filter(part => part.inlineData);
      const generatedImagePart = imageParts.pop(); // Gets the last element

      if (generatedImagePart && generatedImagePart.inlineData) {
        const base64ImageBytes: string = generatedImagePart.inlineData.data;
        const mimeType = generatedImagePart.inlineData.mimeType;
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