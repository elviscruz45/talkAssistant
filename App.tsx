import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useVoiceRecognition } from "./hooks/useVoiceRecognition";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { writeAudioToFile } from "./utils/writeAudioToFile";
import { playFromPath } from "./utils/playFromPath";
import { fetchAudio } from "./utils/fetchAudio";
import { Image } from "expo-image";
import Sound from "react-native-sound";
import axios from "axios";
Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: false,
});

export default function App() {
  const [borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">(
    "lightgray"
  );
  const { state, startRecognizing, stopRecognizing, destroyRecognizer } =
    useVoiceRecognition();
  const [urlPath, setUrlPath] = useState("");
  const [sourceId, setSourceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activatePDFChat, setActivatePDFChat] = useState(false);

  console.log("sourceId", sourceId);
  const listFiles = async () => {
    try {
      const result = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory!
      );
      if (result.length > 0) {
        const filename = result[0];
        const path = FileSystem.documentDirectory + filename;
        console.log("Full path to the file:", path);
        setUrlPath(path);
      }
    } catch (error) {
      console.error("An error occurred while listing the files:", error);
    }
  };
  const analizarReporte = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/sources/add-url",
        // { url: prueba },
        {
          url: "https://firebasestorage.googleapis.com/v0/b/finant-dd645.appspot.com/o/INFORME%20MANTENIMIENTO.pdf?alt=media&token=0b3302db-f630-4e52-8a6f-bedf84a15d07",
        },

        {
          headers: {
            "x-api-key": "sec_CGNMZENbOBE46FZvWlGfmGCLoqy9vgiI", // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );

      setSourceId(response.data.sourceId);
      setActivatePDFChat(true);
    } catch (error: any) {
      console.error("Error adding PDF:", error);
    }
  };
  const handleSubmit = async () => {
    if (!state.results[0]) return;
    try {
      // Fetch the audio blob from the server
      const audioBlob = await fetchAudio(sourceId, state.results[0]);

      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target && typeof e.target.result === "string") {
          // data:audio/mpeg;base64,....(actual base64 data)...
          const audioData = e.target.result.split(",")[1];

          // Write the audio data to a local file
          const path = await writeAudioToFile(audioData);

          await playFromPath(path);
          destroyRecognizer();
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.container1}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Asistente de gerencia:
        </Text>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Sr Roby Husky</Text>
        <Text style={{ fontSize: 20, marginBottom: 30 }}></Text>

        <Image
          source={require("./assets/huskyLogo.png")}
          style={{
            // marginLeft: 20,
            width: 152,
            height: 180,
            borderRadius: 20,
            // borderWidth: 0.3,
          }}
        />
        {/* <Text style={styles.instructions}>
          {JSON.stringify(state, null, 2)}
        </Text> */}
        <Text style={{ fontSize: 20, marginBottom: 10 }}></Text>

        <Text style={styles.welcome}>Tu mensaje: "{state.results[0]}"</Text>

        {/* <Pressable>
        <Text style={styles.welcome}>
          {state.isRecording ? "Release to Send" : "Hold to Speak"}
        </Text>
        <Image style={styles.button} source={require("./assets/button.png")} />
      </Pressable>*/}
        <Pressable
          onPressIn={() => {
            setBorderColor("lightgreen");
            startRecognizing();
          }}
          onPressOut={() => {
            setBorderColor("lightgray");
            stopRecognizing();
            handleSubmit();
          }}
          style={{
            width: "90%",
            padding: 30,
            gap: 10,
            borderWidth: 3,
            alignItems: "center",
            borderRadius: 10,
            borderColor: borderColor,
          }}
        >
          <Text>Manten Presionado para preguntar</Text>
        </Pressable>
        <Text style={{ fontSize: 20, marginBottom: 30 }}></Text>
        <Button
          title="Analizar Reporte"
          onPress={async () => await analizarReporte()}
        />
        <Button
          title="Repite la respuesta"
          onPress={async () => await playFromPath(urlPath)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  container1: {
    flex: 1,
    paddingTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    fontSize: 15,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
});
