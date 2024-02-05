export const performGetProfile = async (
    token: string,
    nic: string,
  ) => {
    const getProfileApiUrl =
      // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/gramadataservice/endpoint-3000-197/v1.0/getUser";
    //https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/gramadataservice/endpoint-3000-197/v1.0
      window.config.api + "/gich/gramadataservice/endpoint-3000-197/v1.0/getUser"
    try {
      const getProfileResponse = await fetch(getProfileApiUrl, {
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

      if (!getProfileResponse.ok) {
        throw new Error(`HTTP error! Status: ${getProfileResponse.status}`);
      }

      const getProfileResult = await getProfileResponse.json();
      console.log("getStatus", getProfileResult);
      return getProfileResult;
    } catch (error) {
      console.error("Error in get status:", error);
      throw error;
    }
  };
  