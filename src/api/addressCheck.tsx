export const performAddressCheck = async (token: string, nic: string, land_no:string, street_name: string, grama_division_no: string) => {
  const addressCheckApiUrl =
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1.0/addressCheck";
    //  "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1/addressCheck"
    //  https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/address-check/endpoint-3000-197/v1/addressCheck"
     
  try {
    console.log("Before calling the Address check api");
    console.log(nic, land_no, street_name, grama_division_no);
    const addressCheckResponse = await fetch(addressCheckApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({
        "grama_division_no": grama_division_no,
        "land_no": land_no,
        "nic": nic,
        "street_name": street_name
      }),
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
