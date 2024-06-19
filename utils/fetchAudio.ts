export const fetchAudio = async (text: string): Promise<Blob> => {
  const response = await fetch(
    // `https://talkgpt.herokuapp.com/api/tts?text=${text}`
    process.env.EXPO_PUBLIC_MY_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    }
  );
  return await response.blob();
};
