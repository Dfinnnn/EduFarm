"use client";
import React, { useState, useMemo, useEffect } from "react";
import VideoCard from "./components/VideoCard";
import { rawVideos, Video } from "../data/videos";
import { articles } from "../data/learn";

// 🔹 Parser to get thumbnail + embed URL
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
  // 🔹 Stable videos array
  const videos = useMemo(
    () =>
      rawVideos.map((v) => {
        const { thumbnail, embed } = parseYouTubeLink(v.link);
        return { ...v, thumbnail, embed };
      }),
    []
  );

  // 🔹 Featured videos (randomized on client)
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  useEffect(() => {
    const shuffled = [...videos].sort(() => 0.5 - Math.random());
    setFeaturedVideos(shuffled.slice(0, 3));
  }, [videos]);

  // 🔹 Farming tips (randomized on client)
  const [randomTips, setRandomTips] = useState<typeof articles>([]);
  useEffect(() => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    setRandomTips(shuffled.slice(0, 3));
  }, []);

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
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
              textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
            }}
          >
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
      <section id="featured" style={{ padding: "50px 20px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2.2rem",
            marginBottom: "30px",
            color: "#1B5E20",
            fontWeight: "bold",
            textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
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
        <div style={{ marginTop: "20px" }}>
          <a
            href="/videos"
            style={{
              padding: "10px 25px",
              background: "#2E7D32",
              color: "white",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1B5E20")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2E7D32")}
          >
            See More Videos
          </a>
        </div>
      </section>

      {/* Farming Tips */}
      <section style={{ padding: "50px 20px", background: "#f9f9f9" }}>
        <h2
          style={{
            fontSize: "2.2rem",
            textAlign: "center",
            marginBottom: "30px",
            color: "#2E7D32",
            fontWeight: "bold",
            textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          Farming Tips
        </h2>
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {randomTips.map((tip, idx) => (
            <a
              key={idx}
              href={tip.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: "1 1 250px",
                maxWidth: "280px",
                padding: "25px",
                borderRadius: "15px",
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div>
                <h3 style={{ color: "#2E7D32", marginBottom: "12px", fontSize: "1.3rem" }}>
                  {tip.title}
                </h3>
                <p style={{ color: "#555", fontSize: "1rem", lineHeight: "1.6" }}>
                  {tip.description}
                </p>
              </div>
              <p
                style={{
                  marginTop: "15px",
                  fontSize: "0.9rem",
                  color: "#2E7D32",
                  fontWeight: "bold",
                  alignSelf: "flex-end",
                }}
              >
                👉 Read More
              </p>
            </a>
          ))}
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a
            href="/learn"
            style={{
              padding: "10px 25px",
              background: "#2E7D32",
              color: "white",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1B5E20")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2E7D32")}
          >
            See More Articles
          </a>
        </div>
      </section>
    </div>
  );
}
