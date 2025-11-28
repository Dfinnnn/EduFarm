"use client";
import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { rawVideos } from "../../data/videos";
import { useTranslations } from "@/hooks/useTranslations";

// 🔹 Parse YouTube link into embed + thumbnail
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

export default function VideosPage() {
  const { t, lang } = useTranslations();

  // 🔹 Use translation KEY for selected category (not text)
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 🔹 Category keys (consistent in all languages)
  const categoryKeys = [
    "all",
    "planting",
    "plantation",
    "mixed",
    "organic",
    "smart",
    "pest",
    "hydroponics",
  ];

  // 🔹 Build category list using translation keys
  const categories = categoryKeys.map((key) => ({
    key,
    label: t(`videos.categories.${key}`)
  }));

  // 🔹 Add parser data
  const videos = rawVideos.map((v) => {
    const { thumbnail, embed } = parseYouTubeLink(v.link);
    return { ...v, thumbnail, embed };
  });

  // 🔹 Filter videos by KEY (not translated text)
  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  return (
    <section style={{ padding: "50px 20px" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "30px",
          color: "#1b5e20",
          textAlign: "center",
        }}
      >
        {t("videos.title")}
      </h1>

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              background: selectedCategory === key ? "#2E7D32" : "#e0e0e0",
              color: selectedCategory === key ? "white" : "#333",
              fontWeight: "bold",
              boxShadow:
                selectedCategory === key
                  ? "0 4px 12px rgba(0,0,0,0.2)"
                  : "none",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredVideos.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </section>
  );
}
