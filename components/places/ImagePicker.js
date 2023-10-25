import { View, StyleSheet, Text, Image, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import LoadingOverlay from "../ui/LoadingOverlay";
import IconButton from "../ui/IconButton";

const ImagePicker = () => {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

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

  // const getCameraSettings = async (camera) => {
  //   const aspectRatios = await camera.getSupportedRatiosAsync();
  //   let aspectRatio = null;
  //   if (aspectRatios?.length > 0) {
  //     aspectRatios.forEach((r) => console.log("ratio", r));
  //     aspectRatio = aspectRatios[0];
  //   }
  //   const pictureSizes = await camera.getAvailablePictureSizesAsync(
  //     aspectRatio
  //   );
  //   pictureSizes.forEach((s) => console.log("size", s));
  // };

  const takePicture = async () => {
    if (cameraRef.current) {
      await getCameraSettings(cameraRef.current);
      const takenPhoto = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        exif: false,
      });
      console.log(takenPhoto);
      setPhoto(takenPhoto);
    }
  };

  let preview = (
    <Camera style={styles.camera} ref={cameraRef} type={CameraType.back}>
      <IconButton
        icon="camera"
        size={32}
        color="white"
        pressHandler={takePicture}
      />
    </Camera>
  );

  if (photo) {
    preview = (
      <View style={styles.preview}>
        <Image style={styles.photo} source={{ uri: photo.uri }} />;
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>{preview}</View>
    </View>
  );
};

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