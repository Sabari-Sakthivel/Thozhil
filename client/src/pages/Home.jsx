import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Find a job that suits your interest & skills.
        </h1>
        <p className="text-gray-500 mt-3">
          Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in
          scelerisque leo, eget sollicitudin velit vestibulum.
        </p>
      </header>

      {/* Search Section */}
      <section className="flex justify-center mt-6 px-4">
        <div className="bg-white shadow-md rounded-md flex p-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Job title, Keyword..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your Location"
            className="flex-1 px-4 py-2 border border-gray-200 focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700">
            Find Job
          </button>
        </div>
      </section>

      {/* Suggestions */}
      <section className="text-center mt-3">
        <p className="text-gray-600">
          Suggestion:{" "}
          <span className="text-blue-600 cursor-pointer">Designer</span>,{" "}
          <span className="text-blue-600 cursor-pointer">Programming</span>,{" "}
          <span className="text-blue-600 cursor-pointer">Digital Marketing</span>
          ,{" "}
          <span className="text-blue-600 cursor-pointer">Video</span>,{" "}
          <span className="text-blue-600 cursor-pointer">Animation</span>.
        </p>
      </section>

      {/* Stats Section */}
      <section className="flex justify-center gap-6 mt-12 px-4 flex-wrap">
        {[
          { label: "Live Job", count: "1,75,324", icon: "📘" },
          { label: "Companies", count: "97,354", icon: "🏢" },
          { label: "Candidates", count: "38,47,154", icon: "👨‍💻" },
          { label: "New Jobs", count: "7,532", icon: "✨" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center bg-white p-4 rounded-md shadow-md text-center w-40"
          >
            <div className="text-2xl">{stat.icon}</div>
            <div className="ml-3">
              <p className="text-lg font-bold text-gray-800">{stat.count}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Illustration */}
      <section className="flex justify-center mt-8">
        <img
          src="https://via.placeholder.com/400" // Replace with your image path
          alt="Illustration"
          className="max-w-xs"
        />
      </section>
    </div>
  );
};

export default App;
