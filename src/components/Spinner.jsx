import React from "react"; // Importing React
import { ClipLoader } from "react-spinners"; // Importing ClipLoader spinner component from react-spinners

const Spinner = () => {
  return (
    <>
      {/* Wrapper section to center the spinner on the page */}
      <section
        style={{
          minHeight: "525px", // Ensuring the section has a minimum height of 525px
          display: "flex", // Using flexbox to center content
          justifyContent: "center", // Centering the spinner horizontally
          alignItems: "center", // Centering the spinner vertically
        }}
      >
        {/* ClipLoader spinner with a size of 150px */}
        <ClipLoader size={150} />
      </section>
    </>
  );
};

export default Spinner;
