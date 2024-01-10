// GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
GOOGLE_API_KEY = "AIzaSyCcUk4kmZ3dAXnx5b4QWGwWU_bnpwM8HP4";

export const createLocationUrl = ({ lat, lng }) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return url;
};

export const getReadableAddress = async ({ lat, lng }) => {
  try {
    console.log(lat, lng);
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCcUk4kmZ3dAXnx5b4QWGwWU_bnpwM8HP4`
    );

    if (!resp.ok) {
      throw new Error("Could not fetch address!");
    }

    const data = await resp.json();
    return data.results[0].formatted_address;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
