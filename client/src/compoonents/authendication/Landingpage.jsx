import React, { useState } from "react";
import Header from "../../UserPages/Header";
import Footer from "../../UserPages/Footer";
import { FaSearch, FaMapMarkerAlt, FaSearchPlus } from "react-icons/fa";
import Landingpage1 from "../../assets/home-img1.png";
import { IoBriefcaseOutline } from "react-icons/io5";
import { PiBuildings } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiUserAddLine } from "react-icons/ri";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import lapimg from "../../assets/lap1img.jpg";
import employerimg from "../../assets/employerimg.jpg";
import { Link } from "react-router-dom";
import profileimg1 from "../../assets/profileimg1.jpg";
import profileimg2 from "../../assets/profileimg2.jpg";
import profileimg3 from "../../assets/profileimg3.jpg";
import profileimg4 from "../../assets/profileimg4.jpg";
import profileimg5 from "../../assets/profileimg5.jpg";

const testimonials = [
  {
    id: 1,
    name: "Robert Fox",
    role: "UI/UX Designer",
    image: profileimg1,
    text: "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
    rating: 5,
  },
  {
    id: 2,
    name: "Bessie Cooper",
    role: "Creative Director",
    image: profileimg2,
    text: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jane Cooper",
    role: "Photographer",
    image: profileimg3,
    text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    rating: 4,
  },
  {
    id: 4,
    name: "John Doe",
    role: "Software Engineer",
    image: profileimg4,
    text: "Duis vestibulum bibendum dapibus. Vivamus volutpat turpis at nisi hendrerit ultrices.",
    rating: 3,
  },
  {
    id: 5,
    name: "Emily Clark",
    role: "Graphic Designer",
    image: profileimg5,
    text: "Aenean ac pharetra est. Integer ac eros eget velit tristique aliquet a at ex.",
    rating: 5,
  },
];

const vacancies = [
  { title: "Anesthesiologists", positions: "45,904 Open Positions" },
  { title: "Surgeons", positions: "50,364 Open Positions" },
  { title: "Obstetricians-Gynecologists", positions: "4,339 Open Positions" },
  { title: "Orthodontists", positions: "20,079 Open Positions" },
  { title: "Maxillofacial Surgeons", positions: "74,875 Open Positions" },
  { title: "Software Developer", positions: "43,359 Open Positions" },
  { title: "Psychiatrists", positions: "18,599 Open Positions" },
  { title: "Data Scientist", positions: "28,200 Open Positions", link: true },
  { title: "Financial Manager", positions: "61,391 Open Positions" },
  { title: "Management Analysis", positions: "93,046 Open Positions" },
  { title: "IT Manager", positions: "50,963 Open Positions" },
  { title: "Operations Research Analysis", positions: "16,627 Open Positions" },
];

const Landingpage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Total pages based on number of testimonials and items per page
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < totalPages ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };
  return (
    <div>
      {/* header Component*/}
      <Header isLandingpage={true} />

      {/* Main Content*/}
      <div className="">
        <section id="Home page" className=" h-screen w-full px-20 bg-gray-50 ">
          <div className="flex gap-6">
            <div className="mt-16">
              <h1 className="font-dmserif text-4xl">
                Find the job that suits your{" "}
              </h1>
              <h1 className="font-dmserif text-4xl mt-1">Interest & skills</h1>
              <p className="font-semibold text-gray-600 mt-4">
                Browse thousands of opportunities across multiple industries.
              </p>
              <p className="font-semibold mt-1 text-gray-600">
                Start your journey today and achieve your career goals!
              </p>

              <div className="bg-white w-full shadow-md rounded-lg p-2 mt-6">
                <div className="flex flex-wrap lg:flex-nowrap gap-4 justify-center items-center">
                  {/* Search Input */}
                  <div className="relative w-full lg:w-auto">
                    <FaSearch className="absolute top-1/2 left-3 text-blue-500 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by Job title, Position, Keyword..."
                      className="border rounded-lg p-3 pl-10 w-[300px]"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="relative w-full lg:w-auto">
                    <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
                    <input
                      type="text"
                      placeholder="City, state or zip code"
                      className="border rounded-lg p-3 pl-10 w-[200px]"
                    />
                  </div>

                  {/* Find Job Button */}
                  <div>
                    <Link
                      to={"/login"}
                      className="bg-blue-500 w-full hover:bg-blue-400 text-white rounded-lg p-2 whitespace-nowrap"
                    >
                      Find Job
                    </Link>
                  </div>
                </div>
              </div>

              <p className="font-medium pt-2 text-gray-400">
                suggestions :{" "}
                <span className="font-medium text-sm">
                  Designer, Accountant,{" "}
                  <span className="text-blue-500">Software developer</span>,
                  Digital Marketing
                </span>{" "}
              </p>
            </div>
            <div className="mt-10 ml-10">
              <img
                className="w-[500px] h-[300x]"
                src={Landingpage1}
                alt="landing page img"
              />
            </div>
          </div>
          <div className="flex gap-14 mt-5  justify-center">
            <div className="flex p-4 bg-gray-100 w-fit shadow-lg rounded-lg gap-2">
              <IoBriefcaseOutline
                size={44}
                className="bg-blue-100 p-1 text-blue-500"
              />
              <div>
                <p className="text-lg text-center">0</p>
                <p className="font-medium text-gray-400">Live Jobs</p>
              </div>
            </div>
            <div className="flex p-4 bg-gray-100 w-fit shadow-lg rounded-lg gap-2">
              <PiBuildings
                size={44}
                className="bg-blue-100 p-1 text-blue-500"
              />
              <div>
                <p className="text-lg text-center">0</p>
                <p className="font-medium text-gray-400">Companies</p>
              </div>
            </div>
            <div className="flex p-4 bg-gray-100 w-fit shadow-lg rounded-lg gap-2">
              <HiOutlineUsers
                size={44}
                className="bg-blue-100 p-1 text-blue-500"
              />
              <div>
                <p className="text-lg text-center">0</p>
                <p className="font-medium text-gray-400">Candidates</p>
              </div>
            </div>
            <div className="flex p-4 bg-gray-100 w-fit shadow-lg rounded-lg gap-2">
              <IoBriefcaseOutline
                size={44}
                className="bg-blue-100 p-1 text-blue-500"
              />
              <div>
                <p className="text-lg text-center">0</p>
                <p className="font-medium text-gray-400">New Jobs</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="most-popular-vancies"
          className=" w-full h-full py-5 px-20"
        >
          <div className="py-10 px-6 bg-white">
            <h1 className="text-2xl font-bold mb-6  ml-[400px] text-blue-500">
              Most Popular Vacancies
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vacancies.map((vacancy, index) => (
                <div key={index} className="text-gray-800">
                  <h2
                    className={`text-lg font-semibold ${
                      vacancy.link
                        ? "text-blue-500 hover:underline cursor-pointer"
                        : ""
                    }`}
                  >
                    {vacancy.title}
                  </h2>
                  <p className="text-sm text-gray-500">{vacancy.positions}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="how-Jobhire-works"
          className="  py-10 w-full h-full px-24 bg-gray-100"
        >
          <h1 className="font-bold text-2xl ml-[430px] text-blue-500">
            How JobHire Works
          </h1>
          <div className="flex gap-10 mt-10">
            <div className="group flex flex-col items-center justify-center p-10 border rounded-lg shadow-lg w-64 bg-white hover:bg-blue-100 transition-colors">
              <RiUserAddLine
                size={54}
                className="text-4xl mb-4 text-blue-500 rounded-full p-3 bg-blue-200 group-hover:bg-blue-500 group-hover:text-white transition-colors"
              />
              <h2 className="text-base font-semibold mb-2">Create Account</h2>
              <p className="text-center text-sm text-gray-700">
                Sign up quickly and easily to create your profile and start your
                job search journey.
              </p>
            </div>
            <div className="group flex flex-col items-center justify-center p-10 border rounded-lg shadow-lg w-64 bg-white hover:bg-blue-100 transition-colors">
              <IoCloudUploadOutline
                size={54}
                className="text-4xl mb-4 text-blue-500 rounded-full p-3 bg-blue-200 group-hover:bg-blue-500 group-hover:text-white transition-colors"
              />
              <h2 className="text-base font-semibold mb-2">Upload CV/Resume</h2>
              <p className="text-center text-sm text-gray-700">
                Upload your updated CV or resume to showcase your skills and
                experience to recruiters.
              </p>
            </div>
            <div className="group flex flex-col items-center justify-center p-10 border rounded-lg shadow-lg w-64 bg-white hover:bg-blue-100 transition-colors">
              <FaSearchPlus
                size={54}
                className="text-4xl mb-4 text-blue-500 rounded-full p-3 bg-blue-200 group-hover:bg-blue-500 group-hover:text-white transition-colors"
              />
              <h2 className="text-base font-semibold mb-2">
                Find Suitable Job
              </h2>
              <p className="text-center text-sm text-gray-700">
                Search and explore job opportunities that align with your skills
                and career goals.
              </p>
            </div>
            <div className="group flex flex-col items-center justify-center p-10 border rounded-lg shadow-lg w-64 bg-white hover:bg-blue-100 transition-colors">
              <MdOutlineVerified
                size={54}
                className="text-4xl mb-4 text-blue-500 rounded-full p-3 bg-blue-200 group-hover:bg-blue-500 group-hover:text-white transition-colors"
              />
              <h2 className="text-base font-semibold mb-2">Apply Job</h2>
              <p className="text-center text-sm text-gray-700">
                Submit applications directly to employers and take the next step
                in your career.
              </p>
            </div>
          </div>
        </section>

        <section
          id="Testimonial-page"
          className="py-10 w-full h-full bg-gray-50 px-24"
        >
          <div className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-500">
              Clients Testimonial
            </h2>
            <div className="relative w-full max-w-5xl">
              <div className="flex items-center justify-between">
                {/* Left Button */}
                <button
                  onClick={handlePrev}
                  className="p-2 bg-gray-200 mr-5 rounded-full"
                  disabled={currentIndex === 0}
                >
                  &lt;
                </button>

                {/* Testimonials Display */}
                <div className="flex space-x-4 overflow-hidden">
                  {testimonials
                    .slice(
                      currentIndex * itemsPerPage,
                      currentIndex * itemsPerPage + itemsPerPage
                    )
                    .map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="p-6 bg-white rounded-lg shadow-lg w-1/3 hover:animate-shake"
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="ml-4">
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-gray-600">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{testimonial.text}</p>
                        <div className="mt-4 flex">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <span key={i} className="text-yellow-500">
                                ★
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Right Button */}
                <button
                  onClick={handleNext}
                  className="p-2 ml-5 bg-gray-200 rounded-full"
                  disabled={currentIndex === totalPages - 1}
                >
                  &gt;
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentIndex === index ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="id=Register-page px-20 py-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Candidate Card */}
            <div className="relative h-[225px] flex flex-col justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${lapimg})`, // Using the imported image
                }}
              ></div>

              {/* Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gray-700 opacity-50 rounded-lg"></div>

              {/* Content Section */}
              <div className="relative z-10 flex flex-col justify-between h-full text-white">
                {/* Left-aligned Content */}
                <div className="text-left">
                  <h2 className="text-3xl font-semibold mr-5">
                    Become a Candidate
                  </h2>
                  <p className="mt-2 text-gray-100 text-base">
                    Are you looking for exciting opportunities and career
                    growth?
                    <br /> Join our platform to connect with leading employers
                    and <br />
                    find the perfect job for you.
                  </p>
                </div>

                {/* Button placed at the bottom right */}
                <div className="absolute bottom-4 right-8">
                  <Link
                    to={"/login"}
                    className="px-4 py-2 bg-white text-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded-lg shadow transition-colors"
                  >
                    Register Now
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Employer Card */}
            <div className="relative flex flex-col justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${employerimg})`, // Using the imported image
                }}
              ></div>

              {/* Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gray-950 opacity-50 rounded-lg"></div>

              {/* Content Section */}
              <div className="relative z-10 flex flex-col justify-between h-full text-white">
                {/* Left-aligned Content */}
                <div className="text-left">
                  <h2 className="text-3xl font-semibold mr-5">
                    Become a Employers
                  </h2>
                  <p className="mt-2 text-gray-200 text-base">
                    Looking for top talent? Our platform connects you with
                    skilled professionals ready to join your team.
                    <br />
                    <br />
                    Whether you need one hire or an entire team, we help you
                    find the right candidate quickly.
                  </p>
                </div>

                {/* Button placed at the bottom right */}
                <div className="absolute bottom-2  right-6">
                  <Link
                    to={"/login"}
                    className="px-4 py-2 bg-white text-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded-lg shadow  transition-colors"
                  >
                    Register Now
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Component*/}
      <Footer />
    </div>
  );
};

export default Landingpage;
