export const performAddressCheck = async (token: string, nic: string, land_no:string, street_name: string, grama_division_no: string) => {
  const addressCheckApiUrl =
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1.0/addressCheck";
     "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1.0/addressCheck"
  try {
    const addressCheckResponse = await fetch(addressCheckApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({ nic, land_no, street_name, grama_division_no }),
    });

    if (!addressCheckResponse.ok) {
      throw new Error(`HTTP error! Status: ${addressCheckResponse.status}`);
    }

    const addressCheckData = await addressCheckResponse.json();
    console.log("decoupledaddressapi", addressCheckData);
    return addressCheckData;
  } catch (error) {
    console.error("Error in address check:", error);
    throw error;
  }
};
