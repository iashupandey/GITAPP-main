import React, { useState, useEffect } from "react";

const RepoItem = (props) => {
  const {
    created_at,
    full_name,
    language,
    name,
    html_url,
    languages_url,
    visibility,
  } = props;

  const [mostUsedLanguages, setMostUsedLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(languages_url);
        const data = await response.json();
        const languagesArray = Object.keys(data).map((name) => ({
          name,
          size: data[name],
        }));
        const sortedLanguages = languagesArray.sort((a, b) => b.size - a.size);
        setMostUsedLanguages(sortedLanguages.slice(0, 3));
      } catch (error) {
        console.error("Error fetching language data:", error);
      }
    };

    fetchLanguages();
  }, [languages_url]);

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {visibility} </span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{name} </h5>
          <p className="card-text">{full_name}</p>
          <h6>Most Used Languages:</h6>
          <div>
            {mostUsedLanguages.map((lang) => (
              <span
                key={lang.name}
                className="badge bg-secondary text-light me-2"
              >
                {lang.name}
              </span>
            ))}
          </div>
          <button type="button" className="btn btn-light">
            {"Created at : "}
            {new Date(created_at).toGMTString()}
          </button>
          <a
            rel="noreferrer"
            href={html_url}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Get Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
