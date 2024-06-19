import { Audio } from "expo-av";
export const playFromPath = async (path: string) => {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: path });
    await sound.playAsync();
  } catch (e) {
    console.error("An error occurred:", e);
  }
};
