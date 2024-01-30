export const performSendSlack = async (token: string, nic: string, message: string) => {
    const SendSlackApiUrl =
      "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/gich/slackservice/endpoint-7070-070/v1.0/sendNotifications";
    try {
      const SendSlackResponse = await fetch(SendSlackApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        body: JSON.stringify({ message, nic }),
      });
  
      if (!SendSlackResponse.ok) {
        throw new Error(`HTTP error! Status: ${SendSlackResponse.status}`);
      }
  
      const responseData = await SendSlackResponse.text();
      if (responseData) {
        const SendSlackData = JSON.parse(responseData);
        console.log("decoupledSlackapi", SendSlackData);
        return SendSlackData;
      } else { /* empty */ }
    } catch (error) {
      console.error("Error in Slack check:", error);
      throw error;
    }
  };

//   export const performSendSlackWithoutToken = async (message: string) => {
//   };
  