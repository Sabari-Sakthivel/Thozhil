import React, { useState } from "react";

const UserSettings = () => {
  const [notifications, setNotifications] = useState({
    shortlisted: true,
    savedProfile: false,
    jobsExpire: true,
    rejected: true,
    jobAlerts: true,
  });

  const [profilePrivacy, setProfilePrivacy] = useState(true);
  const [resumePrivacy, setResumePrivacy] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      {/* Contact Info */}
      <section>
        <h2 className="text-lg font-medium mb-4">Contact Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Map Location"
            className="border p-2 rounded w-full"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border p-2 rounded w-full"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Save Changes
        </button>
      </section>

      {/* Notification Settings */}
      <section className="mt-6">
        <h2 className="text-lg font-medium mb-4">Notification</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["shortlisted", "Notify me when employers shortlisted me"],
            ["savedProfile", "Notify me when employers saved my profile"],
            ["jobsExpire", "Notify me when my applied jobs expire"],
            ["rejected", "Notify me when employers rejected me"],
            ["jobAlerts", "Notify me when I have up to 5 job alerts"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className="mr-2"
                />
                {label}
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Job Alerts */}
      <section className="mt-6">
        <h2 className="text-lg font-medium mb-4">Job Alerts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your job roles"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="City, state, country name"
            className="border p-2 rounded w-full"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Save Changes
        </button>
      </section>

      {/* Profile Privacy */}
      <section className="mt-6">
        <h2 className="text-lg font-medium mb-4">Profile Privacy</h2>
        <div className="flex items-center space-x-4">
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                checked={profilePrivacy}
                onChange={() => setProfilePrivacy(true)}
                className="mr-2"
              />
              Your profile is public now
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                checked={!profilePrivacy}
                onChange={() => setProfilePrivacy(false)}
                className="mr-2"
              />
              Your profile is private now
            </label>
          </div>
        </div>
      </section>

      {/* Resume Privacy */}
      <section className="mt-6">
        <h2 className="text-lg font-medium mb-4">Resume Privacy</h2>
        <div className="flex items-center space-x-4">
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                checked={resumePrivacy}
                onChange={() => setResumePrivacy(false)}
                className="mr-2"
              />
              Your resume is private now
            </label>
          </div>
        </div>
      </section>

      {/* Change Password */}
      <section className="mt-6">
        <h2 className="text-lg font-medium mb-4">Change Password</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Current Password", "New Password", "Confirm Password"].map(
            (placeholder, index) => (
              <input
                key={index}
                type="password"
                placeholder={placeholder}
                className="border p-2 rounded w-full"
              />
            )
          )}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Save Changes
        </button>
      </section>
    </div>
  );
};

export default UserSettings;
