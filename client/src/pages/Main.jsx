import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
const Main = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [success, setSuccess] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const convertMp3 = async (e) => {
    e.preventDefault();
    const videoId = url.slice(url.indexOf("=") + 1);
    try {
      const response = await axios.post("http://localhost:8000/convert-mp3", {
        videoId: videoId,
      });
      if (response.status === 200) {
        setLink(response.data.link);
        setTitle(response.data.title);
      }
      setSuccess(response.status);
    } catch (error) {
      setSuccess(error.response.status);
      setMessage(error.response.data);
    }
  };
  return (
    <>
      <div className="main-container">
        <form onSubmit={convertMp3}>
          <h1>Converter</h1>
          <h4>Enter the video url</h4>
          <div>
            <input
              type="text"
              name="url"
              placeholder="Video URL here"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
            <button type="submit">Convert</button>
          </div>
        </form>
      </div>
      <div className="bottom-container">
        {success === 200 && (
          <>
            <p>Title: {title}</p>
            <a href={link}>
              <button>Download</button>
            </a>
          </>
        )}
        {success === 400 && <p>{message}</p>}
      </div>
    </>
  );
};

export default Main;
