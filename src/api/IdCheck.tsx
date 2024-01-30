export const performIdCheck = async (
  token: string,
  nic: string,
  name: string
) => {
  const idCheckApiUrl =
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/gramacheckidentitycheck/endpoint-7070-070/v1.1/nicCheck";
  //https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/gramacheckidentitycheck/endpoint-7070-070/v1.1
  try {
    const idCheckResponse = await fetch(idCheckApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({ name, nic }),
    });

    if (!idCheckResponse.ok) {
      throw new Error(`HTTP error! Status: ${idCheckResponse.status}`);
    }

    const idCheckData = await idCheckResponse.json();
    console.log("decoupledidapi", idCheckData);
    return idCheckData;
  } catch (error) {
    console.error("Error in id check:", error);
    throw error;
  }
};
