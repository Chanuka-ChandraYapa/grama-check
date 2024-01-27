import React, { useState } from "react";
import FadeInTransition from "../components/fadeInTrans";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";
import FooterLayout from "../layouts/footerLayout";
import { Element } from "react-scroll";
import { useStatusItems } from "../utils/statusContext";
import { performSendSlack } from "../api/sendSlack";



const Help: React.FC = () => {
  const [message, setMessage] = useState("");
  const { token, decodedToken } = useStatusItems();
  const [serror, setSerror] = useState(false);


  const handleSubmit = async () => {
    try {

      let sendSlack;

      try {
        if (token !== null) {
          sendSlack = await performSendSlack(token, decodedToken?.nic, message);
          console.log("Slack Service Response:", sendSlack);        
        } else {
          console.error("Token is null");
          setSerror(true);
        }
      } catch (error) {
        console.error("Error in component:", error);
        setSerror(true);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }
  return (
    <>
      {/* <BodyLayout> */}
      {/* <Navbar /> */}

      {/* </BodyLayout> */}
      <Element name="section1" className="element">
        <FadeInTransition>
          <div className="p-16">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
              {/* Left Col */}
              <div className="w-full md:w-3/5 py-6 text-center">
                <img
                  className="w-full md:w-4/5 z-50"
                  src="/images/help.gif"
                  alt="Hero"
                />
              </div>
              {/* Right Col */}
              <div className="text-gray-600 flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                <h1 className="my-4 text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold leading-tight mx-auto">
                  How This Works
                </h1>
                <div className="w-full mb-4">
                  <div className="h-1 mx-auto bg-gray-600 w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="leading-normal text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl mb-4 mx-auto">
                  Register to our System By Clicking Get Started
                </p>
                <p className="leading-normal text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl mb-4 mx-auto">
                  Fill the Form in the Apply Tab
                </p>
                <p className="leading-normal text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl mb-4 mx-auto">
                  Check the Status of Your Request on the Status Tab
                </p>
              </div>
            </div>
          </div>
        </FadeInTransition>
      </Element>
      <Element name="section2" className="element">
        <FadeInTransition>
          <div className="p-16">
            <div className=" py-8 px-4 w-full content-center items-start text-center md:text-left">
              <h1 className=" text-gray-600 my-4 text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold leading-tight text-center">
                Get the Support from One of Our Officers Through our Chat
              </h1>
            </div>
            <form
              className="max-w-md mx-auto shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out p-4 rounded-3xl"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="p-2 lg:p-8 xl:p-8">
                <div className="relative z-0 w-full mb-5 group">
                  <textarea
                    rows={3} // Specifies the number of visible text lines
                    // cols={150} // Specifies the width of the textarea in characters
                    value={message} // Specifies the initial value of the textarea
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" // Specifies a short hint that describes the expected value of the textarea
                    wrap="soft" // Specifies how the text in the textarea should be wrapped
                    name="name" // Specifies the name of the textarea, which can be used when submitting a form
                    minLength={150} // Specifies the minimum number of characters required in the textarea
                    maxLength={200} // Specifies the maximum number of characters allowed in the textarea
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <label
                    htmlFor="floating_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                   Tell Us What You Want
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
            {serror && (
              <h1 className="my-4 text-red-400 text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-medium leading-tight text-center">
                Oops! Something Went Wrong. Try Again
              </h1>
            )}
          </div>
        </FadeInTransition>
      </Element>
      <div>
        {/* Your other component code here */}
        <Helmet>
          {/* <script
            src="https://www.socialintents.com/api/socialintents.1.3.js#2c9fab358c55c793018c570acc490100"
            async={true}
          ></script> */}
          <script src="https://api.chatspell.co/widget/bbcf654d-5208-4369-847c-4cae9518cdcb"></script>
        </Helmet>
      </div>
      <FooterLayout>
        <section className="container mx-auto text-center py-6 mb-12">
          {/* <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
            Call to Action
          </h2> */}

          <h3 className="my-4 text-3xl leading-tight">Still have Problems ?</h3>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <button className="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Contact Us
          </button>
        </section>
        <Footer />
      </FooterLayout>
    </>
  );
};

export default Help;
