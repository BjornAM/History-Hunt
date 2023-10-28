const GOOGLE_API_KEY = "AIzaSyCcUk4kmZ3dAXnx5b4QWGwWU_bnpwM8HP4";

export const createLocationUrl = ({ lat, lng }) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
};

export const getHumanReadableAddress = async ({ lat, lng }) => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );
  if (!resp.ok) {
    throw new Error("Could not fetch adress!");
  }
  const data = await resp.json();
  return data.results.formatted_address;
};
