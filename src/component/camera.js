import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView, // Add ScrollView import
} from "react-native";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [images, setImages] = useState([]);
  const [change, setChange] = useState(true);
  const camref = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We Need Your Permission To Show The Camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    try {
      console.log("Checking camref:", camref); // Log the value of camref
      if (!camref.current) {
        throw new Error("Camera reference is null");
      }
      console.log("Taking picture...");
      const photo = await camref.current.takePictureAsync();
      console.log("Photo taken:", photo); // Log the photo object
      setChange(false);
      if (!photo || !photo.uri) {
        throw new Error("Failed to capture picture");
      }
      setImages((prevImages) => [...prevImages, photo.uri]);
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  }

  return (
    <View style={styles.container}>
      {change ? (
        <Camera style={styles.camera} type={type} ref={camref}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            ))}
          </ScrollView>
          <Button
            title="Take another picture"
            onPress={() => setChange(true)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 420,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "black",
  },

  image: {
    width: 200,
    height: 200,
    margin: 1,
  },
});
