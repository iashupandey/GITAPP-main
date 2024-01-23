import React, { useEffect, useState } from "react";
import RepoItem from "./RepoItem";
import { useAuth } from "../context/auth";
// created_at
// full_name
// language
// name
// html_url
// languages_url
// owner.avatar_url
// visibility
const UserDetails = () => {
  const apiUrl = "https://api.github.com/users/";
  const [auth, setAuth] = useAuth();
  const [repos, setRepos] = useState([]);
  const fetchData = async () => {
    const url = `${apiUrl}${auth.user}/repos?page=${auth.page}&per_page=${auth.itemLimit}`;

    try {
      let resp = await fetch(url);
      let data = await resp.json();
      setRepos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.user, auth.page, auth.itemLimit]);
  return (
    <>
      <div className="container">
        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
          Showing Repositories of page: {auth.page} and {auth.user}
        </div>
        <div className="row">
          {repos.map((element) => {
            return (
              <div className="col-md-4" key={element.name}>
                <RepoItem
                  created_at={element.created_at}
                  full_name={element.full_name}
                  language={element.language}
                  name={element.name}
                  html_url={element.url}
                  languages_url={element.languages_url}
                  // owner.avatar_url
                  visibility={element.visibility}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
