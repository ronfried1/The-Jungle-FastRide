export const getRidesData = async () => {
  const url = `${process.env.REACT_APP_FAST_RIDER_URL}/rides?token=${process.env.REACT_APP_API_RIDES_TOKEN}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
