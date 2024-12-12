import "./Jobs.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../../store/slices/jobSlice.js";
import Spinner from "../../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
   // State to manage selected city, niche, and search keyword
   const [city, setCity] = useState("");
   const [selectedCity, setSelectedCity] = useState("");
   const [niche, setNiche] = useState("");
   const [selectedNiche, setSelectedNiche] = useState("");
   const [searchKeyword, setSearchKeyword] = useState("");

   // Retrieve jobs, loading, and error from the Redux store
   const { jobs, loading, error } = useSelector((state) => state.jobs);

   // Handlers for city and niche change
   const handleCityChange = (city) => {
      setCity(city);
      setSelectedCity(city);
   };
   const handleNicheChange = (niche) => {
      setNiche(niche);
      setSelectedNiche(niche);
   };

   const dispatch = useDispatch();

   // useEffect to handle side effects for fetching jobs and displaying errors
   useEffect(() => {
      if (error) {
         toast.error(error);  // Display error toast if an error occurs
         dispatch(clearAllJobErrors());  // Clear the error in the Redux store
      }
      dispatch(fetchJobs(city, niche, searchKeyword));  // Fetch jobs based on filters
   }, [dispatch, error, city, niche, searchKeyword]);

   // Function to trigger search
   const handleSearch = () => {
      dispatch(fetchJobs(city, niche, searchKeyword));  // Fetch jobs based on search keyword
   };

   // City options for filtering jobs
   const cities = [
      "All",
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Pune",
      "Jaipur",
      "Lucknow",
      "Kanpur",
      "Nagpur",
      "Indore",
      "Bhopal",
      "Patna",
      "Ludhiana",
      "Agra",
      "Nashik",
      "Faridabad",
      "Meerut",
      "Varanasi",
   ];

   // Niche options for filtering jobs
   const nichesArray = [
      "All",
      "Software Development",
      "Web Development",
      "Cybersecurity",
      "Data Science",
      "Artificial Intelligence",
      "Cloud Computing",
      "DevOps",
      "Mobile App Development",
      "Blockchain",
      "Database Administration",
      "Network Administration",
      "UI/UX Design",
      "Game Development",
      "IoT (Internet of Things)",
      "Big Data",
      "Machine Learning",
      "IT Project Management",
      "IT Support and Helpdesk",
      "Systems Administration",
      "IT Consulting",
   ];

   return (
      <>
         {loading ? (
            // Display loading spinner if jobs are being fetched
            <Spinner />
         ) : (
            <section className="jobs">
               <div className="search-tab-wrapper">
                  {/* Input field and button for searching jobs */}
                  <input
                     type="text"
                     value={searchKeyword}
                     onChange={(e) => setSearchKeyword(e.target.value)}  // Update search keyword
                  />
                  <button onClick={handleSearch}>Find Job</button>
                  <FaSearch />
               </div>
               <div className="wrapper">
                  <div className="filter-bar">
                     {/* City filter options */}
                     <div className="cities">
                        <h2>Filter Job By City</h2>
                        {cities.map((city, index) => (
                           <div key={index}>
                              <input
                                 type="radio"
                                 id={city}
                                 name="city"
                                 value={city}
                                 checked={selectedCity === city}
                                 onChange={() => handleCityChange(city)}  // Set selected city
                              />
                              <label htmlFor={city}>{city}</label>
                           </div>
                        ))}
                     </div>
                     {/* Niche filter options */}
                     <div className="cities">
                        <h2>Filter Job By Niche</h2>
                        {nichesArray.map((niche, index) => (
                           <div key={index}>
                              <input
                                 type="radio"
                                 id={niche}
                                 name="niche"
                                 value={niche}
                                 checked={selectedNiche === niche}
                                 onChange={() => handleNicheChange(niche)}  // Set selected niche
                              />
                              <label htmlFor={niche}>{niche}</label>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="container">
                     {/* Mobile version of filter options */}
                     <div className="mobile-filter">
                        <select
                           value={city}
                           onChange={(e) => setCity(e.target.value)}  // Set city in mobile view
                        >
                           <option value="">Filter By City</option>
                           {cities.map((city, index) => (
                              <option value={city} key={index}>
                                 {city}
                              </option>
                           ))}
                        </select>
                        <select
                           value={niche}
                           onChange={(e) => setNiche(e.target.value)}  // Set niche in mobile view
                        >
                           <option value="">Filter By Niche</option>
                           {nichesArray.map((niche, index) => (
                              <option value={niche} key={index}>
                                 {niche}
                              </option>
                           ))}
                        </select>
                     </div>
                     {/* Displaying job cards */}
                     <div className="jobs_container">
                        {
                           jobs && jobs.length > 0 ? (
                              jobs.map((element) => {
                                 return (
                                    <div className="card" key={element._id}>
                                       {/* Conditional display based on hiringMultipleCandidates */}
                                       {element.hiringMultipleCandidates === "Yes" ? (
                                          <p className="hiring-multiple">
                                             Hiring Multiple Candidates
                                          </p>
                                       ) : (
                                          <p className="hiring">Hiring</p>
                                       )}
                                       {/* Display job title, company, location, salary, posted date */}
                                       <p className="title">{element.title}</p>
                                       <p className="company">
                                          {element.companyName}
                                       </p>
                                       <p className="location">
                                          {element.location}
                                       </p>
                                       <p className="salary">
                                          <span>Salary:</span> Rs.{" "}
                                          {element.salary}
                                       </p>
                                       <p className="posted">
                                          <span>Posted On:</span>{" "}
                                          {element.jobPostedOn.substring(0, 10)}
                                       </p>
                                       <div className="btn-wrapper">
                                          {/* Link to apply for the job */}
                                          <Link
                                             className="btn"
                                             to={`/post/application/${element._id}`}
                                          >
                                             Apply Now
                                          </Link>
                                       </div>
                                    </div>
                                 );
                              })
                           ) : (
                              /************************************************************/
                              /* BUG No.2 - Job not found image */
                              <img
                                 src="./notfound.png"
                                 alt="job-not-found"
                                 style={{ width: "100%" }}
                              />
                           )
                           /************************************************************/ 
                        }
                     </div>
                  </div>
               </div>
            </section>
         )}
      </>
   );
};

export default Jobs;
