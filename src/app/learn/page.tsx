"use client";
import React from "react";
import { motion } from "framer-motion";
import { articles } from "../../data/learn"; // import centralized data

export default function LearnPage() {
  return (
    <section style={{ padding: "60px 20px", background: "#f9f9f9" }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          fontSize: "2.2rem",
          textAlign: "center",
          marginBottom: "40px",
          color: "#2E7D32",
          fontWeight: "bold",
          textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        Farming Articles & Tips
      </motion.h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {articles.map((article, idx) => (
          <motion.a
            key={idx}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: "1 1 250px",
              maxWidth: "280px",
              minHeight: "250px",
              padding: "25px",
              borderRadius: "15px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <div>
              <h3
                style={{
                  color: "#2E7D32",
                  marginBottom: "12px",
                  fontSize: "1.3rem",
                }}
              >
                {article.title}
              </h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                {article.description}
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
          </motion.a>
        ))}
      </div>
    </section>
  );
}
