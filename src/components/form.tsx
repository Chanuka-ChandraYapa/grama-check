import React, { useState } from "react";
import { useStatusItems } from "../utils/statusContext";
import { performPoliceCheck } from "../api/policeCheck";
import { performIdCheck } from "../api/IdCheck";
import { performAddressCheck } from "../api/addressCheck";
import { performSaveStatus } from "../api/savestatus";
import { performSendTwilio } from "../api/sendTwilio";

const Form: React.FC = () => {
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [processing, setProcessing] = useState(false);
  const [serror, setSerror] = useState(false);
  const [policeCheckStatus, setPoliceCheckStatus] = useState<string | null>(
    null
  );
  const [idCheckResult, setIdCheckResult] = useState<boolean | null>(null);
  const [addressCheckResult, setAddressCheckResult] = useState<number | null>(
    null
  );
  const { token, decodedToken } = useStatusItems();

  const handleSubmit = async () => {
    try {
      setProcessing(true);
      setSerror(false);
      console.log("Access Token:", token);
      setPoliceCheckStatus(null);
      setIdCheckResult(null);
      setAddressCheckResult(null);

      let policeCheckData;
      let idCheckApiData;
      let addressCheckApiData;
      let saveStatusResponse;
      let sendTwilio;

      try {
        if (token !== null) {
          policeCheckData = await performPoliceCheck(token, nic, name, address);
          console.log("Police Check API Response:", policeCheckData);
          idCheckApiData = await performIdCheck(token, nic);
          console.log("ID Check API Response:", idCheckApiData);
          addressCheckApiData = await performAddressCheck(token, nic, address);
          console.log("Address Check API Response:", addressCheckApiData);

          saveStatusResponse = await performSaveStatus(
            token,
            nic,
            decodedToken?.nic,
            addressCheckApiData.status,
            idCheckApiData.status,
            policeCheckData.status
          );
          console.log("save status response: ", saveStatusResponse);
          if (
            addressCheckApiData.status == 2 &&
            idCheckApiData.status == 2 &&
            policeCheckData.status == 2
          ) {
            sendTwilio = await performSendTwilio(
              token,
              "0704141251",
              "Your Certificate has been generated successfully. We'll send the relavant documents to the provided address",
              phonenumber
            );
            console.log("twilio response: ", sendTwilio);
          } else {
            console.log("one of the status is pending")
          }
        } else {
          console.error("Token is null");
          setSerror(true);
        }
      } catch (error) {
        console.error("Error in component:", error);
        setSerror(true);
      }

      // try {
      //   if (token !== null) {
      //     idCheckApiData = await performIdCheck(token, nic);
      //     console.log("ID Check API Response:", idCheckApiData);
      //   } else {
      //     console.error("Token is null");
      //   }
      //   // Do something with the result
      // } catch (error) {
      //   console.error("Error in component:", error);
      //   // Handle the error as needed
      // }

      // try {
      //   if (token !== null) {
      //     addressCheckApiData = await performAddressCheck(token, nic, address);
      //     console.log("Address Check API Response:", addressCheckApiData);
      //   } else {
      //     console.error("Token is null");
      //   }
      //   // Do something with the result
      // } catch (error) {
      //   console.error("Error in component:", error);
      //   // Handle the error as needed
      // }
      const newStatusItem = {
        certificateNumber: "Certificate #" + new Date().getTime(), // Generate a unique certificate number
        idCheckStatus:
          idCheckApiData.status === 0
            ? "Declined"
            : idCheckApiData.status === 1
            ? "Pending"
            : idCheckApiData.status === 2
            ? "Validated"
            : "Paused",
        addressCheckStatus:
          addressCheckApiData.status === 0
            ? "Declined"
            : addressCheckApiData.status === 1
            ? "Pending"
            : addressCheckApiData.status === 2
            ? "Validated"
            : "Paused",
        policeCheckStatus:
          policeCheckData.status === 0
            ? "Declined"
            : policeCheckData.status === 1
            ? "Pending"
            : policeCheckData.status === 2
            ? "Validated"
            : "Paused",
      };

      console.log("Status Gamma: ", newStatusItem);

      // updateStatusItems([newStatusItem]);
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <form
        className="max-w-md mx-auto shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out p-4 rounded-3xl"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="p-8">
          <h1 className="my-4 text-xl font-semibold leading-tight">
            Please fill out all the fields
          </h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_id"
              id="floating_id"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <label
              htmlFor="floating_id"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ID Number
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_address"
              id="floating_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label
              htmlFor="floating_address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="floating_number"
              id="floating_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <label
              htmlFor="floating_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
          </div>

          <button
            type="submit"
            className="mt-16 mx-auto block bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
      {/* Processing message */}
      {processing && (
        <h1 className="my-4 text-green-400 text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-medium leading-tight text-center">
          Your request is being processed. We'll get back to you soon.
        </h1>
      )}

      {/* Results display */}
      {policeCheckStatus &&
        idCheckResult !== null &&
        addressCheckResult !== null &&
        !processing && (
          <div>
            <h1
              className={
                policeCheckStatus === "You have been validated" && idCheckResult
                  ? "text-green-400"
                  : "text-red-500"
              }
            >
              {policeCheckStatus}
              <br />
              {idCheckResult
                ? "ID Check Result: true"
                : "ID Check Result: false"}
              <br />
              {`Address Check Result: ${addressCheckResult}`}
            </h1>
          </div>
        )}
      {serror && (
        <h1 className="my-4 text-red-400 text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-medium leading-tight text-center">
          Oops! Something Went Wrong. Try Again
        </h1>
      )}
    </>
  );
};

export default Form;
