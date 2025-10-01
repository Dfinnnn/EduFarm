"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>

        {/* Animated Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, padding: "0 20px" }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "15px",
              fontWeight: "bold",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
             About EduFarm
          </h1>
          <p
            style={{
              fontSize: "1.3rem",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Empowering farmers and enthusiasts with free, practical, and
            sustainable agricultural knowledge.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section
        style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#444",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          EduFarm is a free learning hub dedicated to helping farmers and
          enthusiasts gain practical agricultural knowledge.  
          We provide step-by-step guides, interactive videos, and expert tips to
          make farming education accessible for everyone.
        </motion.p>

        {/* Feature Cards with animation */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "25px",
            justifyContent: "center",
          }}
        >
          {[
            {
              title: "🌱 Our Mission",
              desc: "To make sustainable farming knowledge free and accessible worldwide.",
            },
            {
              title: "📚 What We Offer",
              desc: "Free tutorials, expert tips, and resources on modern farming practices.",
            },
            {
              title: "🤝 Join Us",
              desc: "Be part of a growing community that learns and shares farming knowledge.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              style={{
                flex: "1 1 280px",
                padding: "25px",
                borderRadius: "18px",
                background: "white",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h3
                style={{
                  color: "#2E7D32",
                  marginBottom: "15px",
                  fontSize: "1.4rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{ color: "#555", fontSize: "1rem", lineHeight: "1.6" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
