export const fetchAudio = async (
  sourceId: string,
  text: string
): Promise<Blob> => {
  console.log("fetchAudio", text);
  console.log("ENVfetchAudio", process.env.EXPO_PUBLIC_MY_ENDPOINT);

  const response = await fetch(
    // `https://talkgpt.herokuapp.com/api/tts?text=${text}`
    process.env.EXPO_PUBLIC_MY_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, sourceId: sourceId }),
    }
  );
  //   return await response.blob();
  console.log("responseasfdsfasd", response);
  return await response.blob();
};
