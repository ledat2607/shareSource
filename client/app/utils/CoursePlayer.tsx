"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios";
type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideosData] = useState({ otp: "", playbackInfo: "" });
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/v1/getVdocipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideosData(res.data);
      });
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=EDX8lxh6ac1vuH4Y`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;