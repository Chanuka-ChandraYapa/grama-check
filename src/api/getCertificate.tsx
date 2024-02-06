export const performgetCertificate = async (token: string, gramadevision: string) => {
  console.log(gramadevision);
  const getCertificateApiUrl =
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/gramadataservice/endpoint-3000-197/v1/getGramaDevisionUser";
    // "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/gich/gramadataservice/endpoint-3000-197/v1.0/getGSApplication";
      window.config.api + "/gramadataservice/endpoint-3000-197/v1.0/getGSApplication"
  try {
    const getCertificateResponse = await fetch(getCertificateApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({
        "gramadevision":"2C"
      }),
    });

    if (!getCertificateResponse.ok) {
      throw new Error(`HTTP error! Status: ${getCertificateResponse.status}`);
    }

    const getCertificateResult = await getCertificateResponse.json();
    console.log("getCertificate", getCertificateResult);
    return getCertificateResult;
  } catch (error) {
    console.error("Error in get certificate:", error);
    throw error;
  }
};
