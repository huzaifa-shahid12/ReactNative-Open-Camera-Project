// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Image, Button } from "react-native";
// import Camera from "./src/component/camera";
// import { useState } from "react";

// export default function App() {
// const [openCamera, setOpenCamera] = useState();

//   return (
// {camerOpen ? (

//         {/* <Camera/> */}
// )
// :(
//     <View style={styles.container}>
//       <View>
//         <Button title="Open Camera" onPress={} />
//       </View>
//       <StatusBar style="auto" />
//     </View>

// )
// }
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   Text: {
//     fontSize: 20,
//     textAlign: "center",
//     marginTop: 50,
//   },
//   ImageContainer: {
//     marginTop: 15,
//   },
//   Image: {
//     width: 45,
//     height: 40,
//     margin: 20,
//   },
//   Camera: {
//     fontSize: 16,
//     marginStart: 10,
//     marginTop: -15,
//   },
// });
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Camera from "./src/component/camera";

export default function App() {
  const [isCameraOpen, setCameraOpen] = useState(false);

  const openCamera = () => {
    setCameraOpen(true);
  };

  return (
    <View style={styles.container}>
      {isCameraOpen ? (
        <Camera />
      ) : (
        <View>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfXjMSSnV5pEt4-wFGVnD7ITqTLKYo_lOnSQ&usqp=CAU",
            }}
            style={styles.image}
          />
          <Button title="Open Camera" onPress={openCamera} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
