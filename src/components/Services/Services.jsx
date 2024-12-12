import "./Services.css"; // Importing the CSS file for styling the component
import React from "react"; // Importing React library

const Services = () => {
  // Defining an array of services, each with an id, service name, and description
  const services = [
    {
      id: 1, // Unique id for each service
      service: "Software Development", // Service name
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.", // Description of the service
    },
    {
      id: 2,
      service: "Web Development", 
      description:
        "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
    },
  ];

  return (
    <section className="services"> {/* Main section for services */}
      <h3>Top Niches</h3> {/* Title for the section */}
      <div className="grid"> {/* A grid container for the service cards */}
        {/* Mapping over the services array to display each service */}
        {services.map((element) => {
          return (
            <div className="card" key={element.id}> {/* Service card container */}
              <h4>{element.service}</h4> {/* Display the service name */}
              <p>{element.description}</p> {/* Display the service description */}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services; // Exporting the Services component to use in other parts of the application
