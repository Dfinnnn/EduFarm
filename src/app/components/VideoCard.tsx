"use client";
import React, { useState } from "react";
import { useTranslations } from "@/hooks/useTranslations"; // ⬅ Import translation hook

interface Video {
  title: string;
  link: string;
  category: string; // e.g., "Planting", "Organic Farming"
  thumbnail?: string;
  embed?: string;
}

interface Props {
  video: Video;
  style?: React.CSSProperties;
}

export default function VideoCard({ video, style }: Props) {
  const [play, setPlay] = useState(false);
  const { t } = useTranslations(); // ⬅ Use translations

  return (
    <div
      style={{
        width: "300px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        background: "#fff",
        transition: "transform 0.2s, box-shadow 0.2s",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
    >
      {play ? (
        <iframe
          src={video.embed + "?autoplay=1"}
          title={video.title}
          width="100%"
          height="180"
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setPlay(true)}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{ width: "100%", display: "block" }}
          />
          {/* Play button overlay */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60px",
              height: "60px",
              background: "rgba(0,0,0,0.6)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "18px solid white",
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
              }}
            />
          </div>
        </div>
      )}

      <div style={{ padding: "10px" }}>
        <h3 style={{ fontSize: "1rem", color: "#333", marginBottom: "6px" }}>
          {video.title}
        </h3>
        <span
          style={{
            background: "#1B5E20",
            color: "#fff",
            padding: "3px 8px",
            borderRadius: "12px",
            fontSize: "0.8rem",
          }}
        >
          {t(`videos.categories.${video.category}`)}
        </span>
      </div>
    </div>
  );
}
