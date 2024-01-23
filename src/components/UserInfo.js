import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [auth, setAuth] = useAuth();
  const fetchUserData = async () => {
    const apiUrl = `https://api.github.com/users/${auth.user}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [auth.user]);

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 my-5">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={userData.avatar_url}
                  className="img-fluid rounded-start object-fit-cover"
                  alt={`Avatar of ${userData.login}`}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {userData.name || userData.login}
                  </h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Name:</strong> {userData.name || "N/A"}
                    </li>
                    <li className="list-group-item">
                      <strong>Company:</strong> {userData.company || "N/A"}
                    </li>
                    <li className="list-group-item">
                      <strong>Bio:</strong> {userData.bio || "N/A"}
                    </li>
                  </ul>
                  <a
                    href={userData.html_url}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 my-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Additional Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Location:</strong> {userData.location || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {userData.email || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Hireable:</strong>{" "}
                  {userData.hireable ? "Yes" : "No" || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
