// StatusBox.tsx
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useStatusItems } from "../utils/statusContext";
import { useParams } from "react-router-dom";
import { performSendTwilio } from "../api/sendTwilio";
import { performUpdateStatus } from "../api/updateStatus";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../api/generatePDF";
import { performGetProfile } from "../api/getProfile";

interface StatusBoxProps {
  certificateNumber: string;
  userId: string;
  idCheckStatus: string;
  addressCheckStatus: string;
  policeCheckStatus: string;
  serror: boolean;
}
const initialProfileData = {
  fullName: "",
  phoneNumber:"",
  nicNumber: "",
  gramaDivision: "",
  address: "",
};

const StatusBox: React.FC<StatusBoxProps> = ({
  certificateNumber,
  userId,
  idCheckStatus,
  addressCheckStatus,
  policeCheckStatus,
  serror,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [certificateStatus, setCertificateStatus] = useState("Declined");
  const { token, decodedToken, statusItems } = useStatusItems();
  const { certificateNo } = useParams<{ certificateNo: string }>();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(initialProfileData);
  const [gramaName, setGramaName] = useState("Joel")

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // Define the click handler
  const handleDownloadClick = async () => {
    // Logic to download the certificate goes here
    await getProfileData();
    console.log("this is the profile data", profileData)
    await generatePDF({"user_name": profileData.fullName, "user_address": profileData.address, "grama_sevaka": profileData.gramaDivision, "grama_niladhari_name": gramaName});
    console.log("After setting the data", profileData)
  }

  const getProfileData = async () => {
    console.log("Getting profile data");
    let getProfileDataResponse;
    let getGramaProfileDataResponse;
    try {
      if (token != null) {
        getProfileDataResponse = await performGetProfile(token, userId);
        console.log("get profile data response: ", getProfileDataResponse);
        setProfileData({
          fullName: getProfileDataResponse.result.name,
          phoneNumber: getProfileDataResponse.result.phone_no,
          address: getProfileDataResponse.result.address,
          gramaDivision: getProfileDataResponse.result.gramadevision,
          nicNumber: getProfileDataResponse.result.id
        })

        getGramaProfileDataResponse = await performGetProfile(token, decodedToken?.nic);
        console.log("get grama profile data response: ", getGramaProfileDataResponse);
        setGramaName(getGramaProfileDataResponse.result.name)
      }
    } catch (error) {
      console.log("Error in getting profile data: ", error)
      alert("error generating the pdf")
    }
  }
  const handleApprove = async () => {
    try {
      if (token !== null) {
        const result = statusItems.find(
          (item) => item.certificateNo === `${certificateNo}`
        );
        let id = certificateNo?.match(/(\d+)/);
        if (result && id) {
          const saveStatusResponse = await performUpdateStatus(
            token,
            2,
            2,
            2,
            +id[0]
          );
          console.log("save status response: ", saveStatusResponse);
          navigate("/adminstatus");
          const sendTwilio = await performSendTwilio(
            token,
            "0704141251",
            "Your Certificate has been generated successfully. We'll send the relavant documents to the provided address Thanks for your Patience",
            "0704215369"
          );
          console.log("twilio response: ", sendTwilio);
        } else {
          console.log("Result is null");
        }
      } else {
        console.error("Token is null");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };
  const handleDecline = async () => {
    try {
      if (token !== null) {
        const result = statusItems.find(
          (item) => item.certificateNo === `${certificateNo}`
        );
        let id = certificateNo?.match(/(\d+)/);

        if (result && id) {
          const saveStatusResponse = await performUpdateStatus(
            token,
            0,
            0,
            0,
            +id[0]
          );
          console.log(+id[0]);
          console.log("save status response: ", saveStatusResponse);
          navigate("/adminstatus");
          const sendTwilio = await performSendTwilio(
            token,
            "0704141251",
            "Your Certificate has been declined by the Grama Niladhari. Contact +9474256369 for further information",
            "0704215369"
          );
          console.log("twilio response: ", sendTwilio);
        } else {
          console.log("Result is null");
        }
      } else {
        console.error("Token is null");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const updateOverallStatus = () => {
      if (
        idCheckStatus === "Validated" &&
        addressCheckStatus === "Validated" &&
        policeCheckStatus === "Validated"
      ) {
        setCertificateStatus("Approved");
      } else if (
        idCheckStatus === "Declined" ||
        addressCheckStatus === "Declined" ||
        policeCheckStatus === "Declined"
      ) {
        setCertificateStatus("Declined");
      } else if (
        idCheckStatus === "Paused" ||
        addressCheckStatus === "Paused" ||
        policeCheckStatus === "Paused"
      ) {
        setCertificateStatus("More Info required");
      } else {
        setCertificateStatus("Pending");
      }
    };

    updateOverallStatus();
  }, [idCheckStatus, addressCheckStatus, policeCheckStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "-green-500";
      case "Declined":
        return "-red-500";
      case "More Info required":
        return "-yellow-500";
      default:
        return "-blue-500";
    }
  };

  const getOverallCertificateStatus = () => {
    if (
      idCheckStatus === "Validated" &&
      addressCheckStatus === "Validated" &&
      policeCheckStatus === "Validated"
    ) {
      return "Your Certificate is Ready. We've sent it to your address.";
    } else if (
      idCheckStatus === "Declined" ||
      addressCheckStatus === "Declined" ||
      policeCheckStatus === "Declined"
    ) {
      return "One of the checks is declined. Please contact us immediately at +94 77 255 2557.";
    } else if (
      idCheckStatus === "Paused" ||
      addressCheckStatus === "Paused" ||
      policeCheckStatus === "Paused"
    ) {
      return "More Information is required to complete the validation. An officer will contact you soon.";
    } else {
      return "Your Certificate is being Processed. We'll notify you whenever it's ready.";
    }
  };

  return (
    <div
      className={`bg-white shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out mx-4 sm:mx-4 md:mx- lg:mx-16 xl:mx-16 p-6 rounded-3xl ${
        isExpanded ? "max-h-full" : "max-h-32"
      } mb-8`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-600">
          {certificateNumber}
        </h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full bg${getStatusColor(
                  certificateStatus
                )} opacity-75`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 bg${getStatusColor(
                  certificateStatus
                )}`}
              ></span>
            </span>
            <span
              className={`text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl font-bold text${getStatusColor(
                certificateStatus
              )}`}
            >
              {certificateStatus}
            </span>
          </div>
          <div className="rounded-full overflow-hidden bg-gray-100 hover:bg-gray-200">
            <button
              className="focus:outline-none p-2"
              onClick={handleToggleExpand}
            >
              <FaAngleDown
                className={`text-gray-600 ${
                  isExpanded ? "rotate-180" : ""
                } transition-transform duration-300 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>
      <div className ="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-gray-600">
        ID No : {userId}
      </div>

      {/* Additional content */}
      {isExpanded && (
        <>
          {!serror ? (
            <div className="text-gray-500 mt-4 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="lg:col-span-1 md:col-span-1 sm:col-span-1">
                <h2 className="text-lg font-bold mb-2">ID Check</h2>
                <p>Status: {idCheckStatus}</p>
              </div>
              <div className="lg:col-span-1 md:col-span-1 sm:col-span-1">
                <h2 className="text-lg font-bold mb-2">Address Check</h2>
                <p>Status: {addressCheckStatus}</p>
              </div>
              <div className="lg:col-span-1 md:col-span-1 sm:col-span-1">
                <h2 className="text-lg font-bold mb-2">Police Check</h2>
                <p>Status: {policeCheckStatus}</p>
              </div>
              {decodedToken?.app_role_gdki != "GramaNiladhari" && (
                <div className="col-span-2 flex justify-between items-center">
                  <p className="text-lg font-bold mb-2">
                    {getOverallCertificateStatus()}
                  </p>
                  {certificateStatus === "Approved" && (
                    <button
                      onClick={handleDownloadClick}
                      className="download-button"
                      title="Download the certificate"
                    >
                      <svg
                        fill="#000000"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="25"
                        height="25"
                        viewBox="0 0 20 20"
                        enable-background="new 0 0 20 20"
                        xmlSpace="preserve"
                      >
                        <path d="M19,19H1c-0.6,0-1-0.4-1-1v-5h2v4h16v-4h2v5C20,18.6,19.6,19,19,19z" />
                        <path d="M15.7,7.3c-0.4-0.4-1-0.4-1.4,0L11,10.6V2c0-0.6-0.4-1-1-1S9,1.4,9,2v8.6L5.7,7.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5,5c0.4,0.4,1,0.4,1.4,0l5-5C16.1,8.3,16.1,7.7,15.7,7.3z" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              {decodedToken?.app_role_gdki == "GramaNiladhari" && (
                <div className="grid grid-cols-2 gap-4 mx-auto">
                  <p className="text-lg font-bold mb-2">
                    <button
                      type="button"
                      className="text-gray-800 bg-green-300 hover:bg-green-300 focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out font-medium rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      // className="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-2 px-4 sm:py-3 sm:px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                  </p>
                  <p className="text-lg font-bold mb-2">
                    <button
                      type="button"
                      className="text-gray-800 bg-red-400 hover:bg-red-400 focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out font-medium rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleDecline}
                      // className="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-2 px-4 sm:py-3 sm:px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                      Decline
                    </button>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <h1 className="my-4 text-red-400 text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-medium leading-tight text-center">
              Oops! Something Went Wrong. Try Again
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default StatusBox;
