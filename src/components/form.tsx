import React, { useState } from "react";

import { useAuthContext } from "@asgardeo/auth-react";

const Form: React.FC = () => {
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const { getAccessToken } = useAuthContext();

  const handleSubmit = () => {
    // Call getAccessToken, which returns a Promise
    getAccessToken()
      .then((token) => {
        // Token is the resolved value of the promise
        console.log("Access Token:", token);
        const apiUrl = `https://7902e7c7-f73b-401f-a1db-07c524deb30a-prod.e1-us-east-azure.choreoapis.dev/rkjj/id-check/endpoint-9090-803/v1/checkNic/${id}`;

        // Make the API request with the obtained access token
        return fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });
      })
      .then((response) => {
        // Check if the API request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        // Handle the data from the API response
        console.log("API Response:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error.message);
      });
  };
  return (
    <form
      className="max-w-md mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_id"
          id="floating_id"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
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

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
