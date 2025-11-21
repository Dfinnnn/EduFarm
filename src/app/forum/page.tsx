"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { addPost, deletePost, addReply, deleteReply } from "../../../utils/firestoreUtils";
import { useTranslations } from "@/hooks/useTranslations";

const getSafeClientId = () => {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("clientId");
  if (!id) {
    id = crypto?.randomUUID?.() || "client-" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("clientId", id);
  }
  return id;
};

export default function ForumPage() {
  const { t } = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [username, setUsername] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    setMounted(true);
    const id = getSafeClientId();
    setClientId(id);
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    await addPost(newPost, username || generateAnonName());
    setNewPost("");
  };

  const generateAnonName = () => {
    const names = ["GreenFarmer", "RiceLover", "TomatoBoss", "NatureFan"];
    return names[Math.floor(Math.random() * names.length)];
  };

  if (!mounted) return null; // Avoid SSR mismatch

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f3f4f6", minHeight: "100vh" }}>
      {/* Hero */}
      <header style={{ backgroundImage: "url('/forum.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "80px 20px", textAlign: "center", color: "white", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "10px", fontWeight: "bold" }}>{t("forum.heroTitle")}</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>{t("forum.heroSubtitle")}</p>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
        {/* Create Post */}
        <section style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: "30px" }}>
          <h2 style={{ marginTop: 0, fontSize: "1.5rem", color: "#2E7D32" }}>{t("forum.startDiscussion")}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
            <input
              type="text"
              placeholder={t("forum.enterName")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1rem", background: "#fafafa", color: "#222" }}
            />
            <textarea
              placeholder={t("forum.writeSomething")}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={3}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handlePost(); } }}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1rem", resize: "none", background: "#fafafa", color: "#222" }}
            />
            <button
              onClick={handlePost}
              style={{ padding: "12px", background: "#2E7D32", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
            >
              {t("forum.post")}
            </button>
          </div>
        </section>

        {/* Posts Feed */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#111" }}>{t("forum.recentPosts")}</h2>
          {posts.length === 0 && <p style={{ color: "#555" }}>{t("forum.noPosts")}</p>}
          {posts.map((post) => (
            <div key={post.id} style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
              <strong style={{ color: "#2E7D32", fontSize: "1.1rem" }}>{post.user}</strong>
              <p style={{ margin: "8px 0", fontSize: "1rem", color: "#222" }}>{post.text}</p>
              <small style={{ color: "#666" }}>
                {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleString() : t("forum.justNow")}
              </small>
              {clientId && post.clientId === clientId && (
                <button onClick={() => deletePost(post.id, post.clientId)} style={{ marginTop: "8px", padding: "6px 12px", background: "transparent", color: "#c00", border: "none", cursor: "pointer", fontSize: "1rem" }}>
                  🗑️
                </button>
              )}
              {clientId && <Replies postId={post.id} clientId={clientId} />}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

// Replies
function Replies({ postId, clientId }: { postId: string; clientId: string }) {
  const { t } = useTranslations();
  const [replies, setReplies] = useState<any[]>([]);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "posts", postId, "replies"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => setReplies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));
    return () => unsubscribe();
  }, [postId]);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    await addReply(postId, replyText);
    setReplyText("");
  };

  return (
    <div style={{ marginTop: "15px", paddingLeft: "15px", borderLeft: "3px solid #eee" }}>
      {replies.map((reply) => (
        <div key={reply.id} style={{ marginBottom: "10px", padding: "12px", borderRadius: "8px", background: "#f4f6f8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: "1rem", color: "#222" }}>{reply.text}</p>
          {reply.clientId === clientId && (
            <button onClick={() => deleteReply(postId, reply.id, reply.clientId)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#c00" }}>🗑️</button>
          )}
        </div>
      ))}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder={t("forum.writeReply")}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReply(); } }}
          style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "0.95rem", background: "#fff", color: "#222" }}
        />
        <button onClick={handleReply} style={{ padding: "10px 16px", background: "#66BB6A", border: "none", color: "white", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          {t("forum.reply")}
        </button>
      </div>
    </div>
  );
}
