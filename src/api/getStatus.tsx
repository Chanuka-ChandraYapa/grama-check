export const performGetStatus = async (
  token: string,
  nic: string,
) => {
  const getStatusApiUrl =
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1.0/getStatus";
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/gramadataservice/endpoint-3000-197/v1.0/getStatus";
    window.config.api + "/gramadataservice/endpoint-3000-197/v1.0/getStatus"
  try {
    const getStatusResponse = await fetch(getStatusApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({
        nic,
      }),
    });

    if (!getStatusResponse.ok) {
      throw new Error(`HTTP error! Status: ${getStatusResponse.status}`);
    }

    const getStatusResult = await getStatusResponse.json();
    console.log("getStatus", getStatusResult);
    return getStatusResult;
  } catch (error) {
    console.error("Error in get status:", error);
    throw error;
  }
};
