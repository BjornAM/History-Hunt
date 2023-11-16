import Config from "react-native-config";

GOOGLE_API_KEY = "AIzaSyCcUk4kmZ3dAXnx5b4QWGwWU_bnpwM8HP4"; //Config.GOOGLE_API_KEY;

export const createLocationUrl = ({ lat, lng }) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return url;
};

export const getReadableAddress = async ({ lat, lng }) => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}&enable_address_descriptor=true`
  );
  if (!resp.ok) {
    throw new Error("Could not fetch address!");
  }
  const data = await resp.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].formatted_address;
  } else {
    return "No address found for these coordinates";
  }
};
