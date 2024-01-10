import { View, StyleSheet, Text, Image, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import LoadingOverlay from "../ui/LoadingOverlay";
import IconButton from "../ui/IconButton";
import { requestForegroundPermissionsAsync } from "expo-location";
import { Dimensions } from "react-native";

const ImagePicker = ({ imageHandler }) => {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [isCameraReady, setCameraReady] = useState(false);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
      }
    })();
  }, []);

  if (!cameraPermission) {
    return (
      <View>
        <LoadingOverlay message={"checking for camera permission ..."} />
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera.</Text>
        <Button
          onPress={requestCameraPermission}
          title="grant camera permission"
        />
      </View>
    );
  }

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      setPhoto(photo);
      imageHandler(photo.uri);
    }
  };

  let preview = <Text>No photo</Text>;
  if (photo) {
    preview = (
      <View style={styles.preview}>
        <Image style={styles.photo} source={{ uri: photo.uri }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={CameraType.back}
        onCameraReady={handleCameraReady}
      >
        <IconButton
          icon="camera"
          size={32}
          color="white"
          onPress={takePicture}
        />
      </Camera>
      {photo && <View style={styles.preview}>{preview}</View>}
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 250,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
