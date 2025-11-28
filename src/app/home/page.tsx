// src/app/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import VideoCard from "../components/VideoCard";
import { rawVideos, Video } from "../../data/videos";
import Chatbot from "../components/chatbot";
import { useTranslations } from "@/hooks/useTranslations";

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
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  // translation
  const { t } = useTranslations();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUsername(userData.username || "User");
        } else {
          setUsername("User");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("User");
      }
    });

    return () => unsubscribe();
  }, [router]);

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

  if (!user) return null;

  return (
    <div className="relative min-h-screen bg-white">
      {/* HERO */}
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
            {t("home.hero.title").replace("{username}", username)}
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
            {t("home.hero.subtitle")}
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
            {t("home.hero.aboutButton")}
          </a>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2.3rem",
            color: "#1B5E20",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          {t("home.product.title")}
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            maxWidth: "800px",
            margin: "0 auto 40px",
            color: "#333",
          }}
        >
          {t("home.product.description")}
        </p>

        {/* product image (unchanged) */}
        <img
          src="/product_mockup.jpg"
          alt={t("home.product.imageAlt")}
          style={{
            display: "block",
            margin: "0 auto 40px",
            width: "80%",
            maxWidth: "600px",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        />

        <h3
          style={{
            fontSize: "1.8rem",
            color: "#1B5E20",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          {t("home.product.featuresTitle")}
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {[
            { icon: "🌡️", key: "soil" },
            { icon: "💧", key: "water" },
            { icon: "📱", key: "dashboard" },
            { icon: "⚙️", key: "pest" },
            { icon: "☀️", key: "weather" },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                background: "#E8F5E9",
                padding: "25px",
                borderRadius: "18px",
                width: "250px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: "140px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                {t(`home.product.features.${f.key}`)}
              </h3>
            </div>
          ))}
        </div>

        <a
          href="/product"
          style={{
            display: "inline-block",
            marginTop: "50px",
            background: "#2E7D32",
            color: "white",
            padding: "12px 25px",
            borderRadius: "25px",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {t("home.product.learnMore")}
        </a>
      </section>

      {/* FEATURED VIDEOS */}
      <section id="featured" style={{ padding: "50px 20px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2.2rem",
            marginBottom: "30px",
            color: "#1B5E20",
            fontWeight: "bold",
          }}
        >
          {t("home.videos.title")}
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#444",
            marginBottom: "35px",
          }}
        >
          {t("home.videos.subtitle")}
        </p>

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

        <a
          href="/videos"
          style={{
            display: "inline-block",
            marginTop: "40px",
            background: "#2E7D32",
            color: "white",
            padding: "12px 25px",
            borderRadius: "25px",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
          }}
        >
          {t("home.videos.exploreButton")}
        </a>
      </section>

      {/* INTEREST FORM */}
      <section
        style={{
          background: "#F1F8E9",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#2E7D32",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          {t("home.interest.title")}
        </h2>
        <p style={{ fontSize: "1rem", marginBottom: "30px", color: "#333" }}>
          {t("home.interest.subtitle")}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(t("home.interest.alertSuccess"));
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder={t("home.interest.form.name")}
            required
            style={{
              width: "100%",
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              color: "black",
              backgroundColor: "white",
              fontSize: "1rem",
            }}
          />
          <input
            type="email"
            placeholder={t("home.interest.form.email")}
            required
            style={{
              width: "100%",
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              color: "black",
              backgroundColor: "white",
              fontSize: "1rem",
            }}
          />
          <textarea
            placeholder={t("home.interest.form.message")}
            rows={3}
            style={{
              width: "100%",
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              color: "black",
              backgroundColor: "white",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#2E7D32",
              color: "white",
              padding: "12px 25px",
              borderRadius: "25px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {t("home.interest.form.submit")}
          </button>
        </form>
      </section>

      <Chatbot />
    </div>
  );
}
