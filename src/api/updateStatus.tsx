export const performUpdateStatus = async (
  token: string,
  addressCheckStatus: number,
  idCheckStatus: number,
  policeCheckStatus: number,
  id: number
) => {
  const UpdateStatusApiUrl =
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1.0/updateStatus"
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/gramadataservice/endpoint-3000-197/v1.0/updateStatusEntry";

  try {
    const UpdateStatusResponse = await fetch(UpdateStatusApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({
        addressCheckStatus,
        idCheckStatus,
        policeCheckStatus,
        id
      }),
    });

    if (!UpdateStatusResponse.ok) {
      throw new Error(`HTTP error! Status: ${UpdateStatusResponse.status}`);
    }

    const UpdateStatusResult = await UpdateStatusResponse.json();
    console.log("UpdateStatus", UpdateStatusResult);
    return UpdateStatusResult;
  } catch (error) {
    console.error("Error in Update status:", error);
    throw error;
  }
};
