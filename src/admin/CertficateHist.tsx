import React, { useEffect, useState } from "react";
import StatusTable from "../components/table";
import BodyLayout from "../layouts/bodyLayout";
import Navbar from "../components/navbar";
import FadeInTransition from "../components/fadeInTrans";
import { useStatusItems } from "../utils/statusContext";
import { performgetCertificate } from "../api/getCertificate";

interface ApiResponseItem {
  name: string;
  address: string;
  nicNumber: string;
  certificateNo: string;
  police_check_status: number;
  id_check_status: number;
  address_check_status: number;
}

interface ApiResult {
  result: ApiResponseItem[];
}
interface StatusItem {
  name: string;
  address: string;
  nicNumber: string;
  certificateNo: string;
  status: string;
}

interface StatusItem2 {
  name: string;
  address: string;
  nicNumber: string;
  certificateNo: string;
  police_check_status: string;
  id_check_status: string;
  address_check_status: string;
}

// let overallStatus: StatusItem[];
const Certificate: React.FC = () => {
  const [overallStatus, setOverallStatus] = useState<StatusItem[] | null>(null);
  // const entries = {
  //   result: [
  //     {
  //       name: "John Doe",
  //       address: "123 Main St",
  //       nicNumber: "123456789",
  //       certificateNo: "ABC123",
  //       police_check_status: 1,
  //       id_check_status: 2,
  //       address_check_status: 2,
  //     },
  //     // {
  //     //   name: "Jane Doe",
  //     //   address: "456 Oak St",
  //     //   nicNumber: "987654321",
  //     //   certificateNo: "XYZ789",
  //     //   status: "Inactive",
  //     //   police_check_status: 2,
  //     //   id_check_status: 2,
  //     //   address_check_status: 2,
  //     // },
  //     // {
  //     //   name: "Bob Smith",
  //     //   address: "789 Pine St",
  //     //   nicNumber: "456789123",
  //     //   certificateNo: "PQR456",
  //     //   status: "Pending",
  //     //   police_check_status: 2,
  //     //   id_check_status: 1,
  //     //   address_check_status: 3,
  //     // },
  //   ],
  // };
  const { token, decodedToken, updateStatusItems } = useStatusItems();
  const [serror, setSerror] = useState(false);
  const getStatus = async () => {
    (async (): Promise<void> => {
      let getStatusResponse;
      try {
        if (token !== null) {
          getStatusResponse = await performgetCertificate(
            token,
            decodedToken?.grama_division
          );
          console.log("get status response: ", getStatusResponse);
          updateStatusItems(mapApiToStatusItems2(getStatusResponse));
          setOverallStatus(mapApiToStatusItems(getStatusResponse));
          setSerror(false);
          console.log("grama division", decodedToken?.grama_division);
          console.log("response", overallStatus);
          console.log("overall Status", overallStatus);
        } else {
          console.error("Token is null");
          setSerror(true);
        }
      } catch (error) {
        console.error("Error in component:", error);
        setSerror(true);
      }
    })();
  };
  useEffect(() => {
    getStatus();
  }, []);
  const mapApiToStatusItems = (apiResponse: ApiResult): StatusItem[] => {
    return apiResponse.result.map((apiItem) => ({
      name: apiItem.name,
      address: apiItem.address,
      nicNumber: apiItem.nicNumber,
      certificateNo: `Certificate #${apiItem.certificateNo}`,
      status: updateOverallStatus(
        mapStatus(apiItem.id_check_status),
        mapStatus(apiItem.address_check_status),
        mapStatus(apiItem.police_check_status)
      ),
    }));
  };

  const mapApiToStatusItems2 = (apiResponse: ApiResult): StatusItem2[] => {
    return apiResponse.result.map((apiItem) => ({
      name: apiItem.name,
      address: apiItem.address,
      nicNumber: apiItem.nicNumber,
      certificateNo: `Certificate #${apiItem.certificateNo}`,
      police_check_status: mapStatus(apiItem.police_check_status),
      id_check_status: mapStatus(apiItem.id_check_status),
      address_check_status: mapStatus(apiItem.address_check_status),
    }));
  };

  const mapStatus = (statusCode: number): string => {
    switch (statusCode) {
      case 0:
        return "Declined";
      case 1:
        return "Pending";
      case 2:
        return "Validated";
      case 3:
        return "Paused";
      default:
        return "Unknown";
    }
  };
  const updateOverallStatus = (
    idCheckStatus: string,
    addressCheckStatus: string,
    policeCheckStatus: string
  ) => {
    if (
      idCheckStatus === "Validated" &&
      addressCheckStatus === "Validated" &&
      policeCheckStatus === "Validated"
    ) {
      // setCertificateStatus("Approved");
      return "Approved";
    } else if (
      idCheckStatus === "Declined" ||
      addressCheckStatus === "Declined" ||
      policeCheckStatus === "Declined"
    ) {
      // setCertificateStatus("Declined");
      return "Declined";
    } else if (
      idCheckStatus === "Paused" ||
      addressCheckStatus === "Paused" ||
      policeCheckStatus === "Paused"
    ) {
      // setCertificateStatus("More Info required");
      return "More Info required";
    } else {
      // setCertificateStatus("Pending");
      return "Pending";
    }
  };
  // overallStatus = mapApiToStatusItems(
  //   // getStatusResponse
  //   // apiresp
  //   entries
  // );
  // // setSerror(false);
  // console.log(overallStatus);
  // updateStatusItems(mapApiToStatusItems2(entries));
  return (
    <div>
      <BodyLayout>
        <Navbar />
        <FadeInTransition>
          <div className="p-4">
            <div className=" py-8 px-16 w-full content-center items-start text-center md:text-left">
              <h1 className="my-4 text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold leading-tight text-center">
                Access all the requested Certificates Here
              </h1>
            </div>
          </div>
        </FadeInTransition>
      </BodyLayout>
      <FadeInTransition>
        {overallStatus ? (
          <StatusTable entries={overallStatus} />
        ) : (
          <>
          <h1 className="my-4 text-gray-500 text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-medium leading-tight text-center">
            No Certificates in the database.
          </h1>
          {serror && (
            <h1 className="my-4 text-red-400 text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-medium leading-tight text-center">
              Oops! Something Went Wrong. Try Again
            </h1>
          )}
          </>
        )}
      </FadeInTransition>
    </div>
  );
};

export default Certificate;
