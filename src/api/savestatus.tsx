export const performSaveStatus = async (
  token: string,
  nic: string,
  accountOwner : string,
  addressCheckStatus: number,
  idCheckStatus:number,
  policeCheckStatus:number
) => {
  const saveStatusApiUrl =
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1.0/updateStatus"
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/gramadataservice/endpoint-3000-197/v1.0/updateStatus"

  try {
    const saveStatusResponse = await fetch(saveStatusApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({accountOwner, addressCheckStatus, idCheckStatus, nic, policeCheckStatus }),
    });

    if (!saveStatusResponse.ok) {
      throw new Error(`HTTP error! Status: ${saveStatusResponse.status}`);
    }

    const saveStatusResult = await saveStatusResponse.json();
    console.log("saveStatus", saveStatusResult);
    return saveStatusResult;
  } catch (error) {
    console.error("Error in save status:", error);
    throw error;
  }
};
