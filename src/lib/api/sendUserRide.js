export const sendUserRide = async (pinCode, selectedRideId) => {
  const url = `${process.env.REACT_APP_FAST_RIDER_URL}/tickets`;
  const requestBody = {
    pin: pinCode,
    ride_id: selectedRideId,
    token: process.env.REACT_APP_API_RIDES_TOKEN,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error sending user ride: ${error.message}`);
  }
};
