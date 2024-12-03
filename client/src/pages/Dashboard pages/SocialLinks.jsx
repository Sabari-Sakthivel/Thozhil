import React, { useState } from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaBriefcase } from "react-icons/fa";

const SocialLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, platform: "LinkedIn", url: "", icon: <FaLinkedin /> },
    { id: 2, platform: "GitHub", url: "", icon: <FaGithub /> },
    { id: 3, platform: "Portfolio", url: "", icon: <FaBriefcase /> },
    { id: 4, platform: "Twitter", url: "", icon: <FaTwitter /> },
  ]);

  const [isSaved, setIsSaved] = useState(false); // For showing feedback

  const handleInputChange = (id, value) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, url: value } : link
      )
    );
    setIsSaved(false); // Mark changes as unsaved
  };

  const addNewLink = () => {
    const newId = links.length + 1;
    setLinks([
      ...links,
      { id: newId, platform: "New Platform", url: "", icon: null },
    ]);
    setIsSaved(false); // Mark changes as unsaved
  };

  const removeLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    setIsSaved(false); // Mark changes as unsaved
  };

  const handlePlatformChange = (id, platform) => {
    const platformIcons = {
      LinkedIn: <FaLinkedin />,
      GitHub: <FaGithub />,
      Portfolio: <FaBriefcase />,
      Twitter: <FaTwitter />,
    };

    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id
          ? { ...link, platform, icon: platformIcons[platform] }
          : link
      )
    );
    setIsSaved(false); // Mark changes as unsaved
  };

  const handleSaveChanges = () => {
    setIsSaved(true); // Mark changes as saved
    // Hide the "Saved" message after 1.5 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 1500);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded">
      {links.map((link) => (
        <div
          key={link.id}
          className="flex items-center mb-4 space-x-4 border-b pb-2 flex-wrap"
        >
          <div className="text-xl">{link.icon}</div>
          <select
            value={link.platform}
            onChange={(e) => handlePlatformChange(link.id, e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto"
          >
            <option value="Select">Select</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="GitHub">GitHub</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Twitter">Twitter</option>
          </select>
          <input
            type="text"
            value={link.url}
            onChange={(e) => handleInputChange(link.id, e.target.value)}
            placeholder="Profile link/url..."
            className="flex-1 border rounded px-2 py-1 mt-2 sm:mt-0"
          />
          <button
            onClick={() => removeLink(link.id)}
            className="text-red-500 hover:text-white px-1 rounded hover:bg-red-400 text-lg mt-2 sm:mt-0"
          >
            ✖
          </button>
        </div>
      ))}

      {/* Buttons */}
      <div className="relative flex items-center justify-center gap-5 mt-4 flex-col sm:flex-row">
        <button
          onClick={addNewLink}
          className="w-fit px-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add New Social Link
        </button>
        <button
          onClick={handleSaveChanges}
          className="w-fit px-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Save Changes
        </button>
      </div>

      {/* Save Confirmation */}
      {isSaved && (
        <div className="mt-4 text-center text-green-500 font-medium">
          Changes saved successfully!
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
