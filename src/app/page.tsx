"use client";

import { useEffect, useState, useMemo } from "react";
import VideoCard from "./components/VideoCard";
import { rawVideos, Video } from "../data/videos";

function parseYouTubeLink(link: string) {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);
  if (!match) return { thumbnail: "", embed: "" };
  const videoId = match[1];
  return {
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    embed: `https://www.youtube.com/embed/${videoId}`,
  };
}

export default function Home() {
  const videos = useMemo(
    () =>
      rawVideos.map((v) => {
        const { thumbnail, embed } = parseYouTubeLink(v.link);
        return { ...v, thumbnail, embed };
      }),
    []
  );

  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);

  useEffect(() => {
    const shuffled = [...videos].sort(() => 0.5 - Math.random());
    setFeaturedVideos(shuffled.slice(0, 3));
  }, [videos]);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          color: "white",
          textAlign: "center",
          padding: "80px 20px",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          backgroundImage: "url('/bg_image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
            Welcome to EduFarm
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
            Free farming education for everyone. Learn, grow, and succeed!
          </p>
          <a
            href="/about"
            style={{
              background: "white",
              color: "#2E7D32",
              padding: "12px 25px",
              borderRadius: "25px",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            About Us
          </a>
        </div>
      </section>

      {/* Featured Videos */}
      <section
        id="featured"
        style={{ padding: "50px 20px", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            marginBottom: "30px",
            color: "#1B5E20",
            fontWeight: "bold",
          }}
        >
          Featured Videos
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {featuredVideos.map((video, idx) => (
            <VideoCard key={idx} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
