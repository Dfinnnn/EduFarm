"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-16">
      {/* 🌿 Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-green-700 text-center mb-6"
      >
        SmartFarm
      </motion.h1>

      <p className="text-center text-gray-700 mb-12 text-lg max-w-2xl mx-auto">
        Discover our range of smart farming hardware, designed to make agriculture
        more efficient, sustainable, and easy to manage.
      </p>

      {/* 🎥 Dashboard Demo Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-16"
      >
        <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-green-100">
          <video src="/dashboard_demo.mp4" controls className="w-full h-auto">
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* 🧠 Product Gallery */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 text-center mb-10"
      >
        Our Smart Farming Hardware Line
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* 🌡️ Smart Sensor */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
        >
          <div className="relative w-full h-56">
            <Image
              src="/products/sensor.jpg"
              alt="Smart Soil Sensor Hardware"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Smart Soil Sensor Hardware
            </h3>
            <p className="text-gray-600 text-sm">
              A compact soil monitoring device that measures real-time moisture,
              pH, and temperature — helping you optimize crop conditions instantly.
            </p>
          </div>
        </motion.div>

        {/* 💧 Watering Controller */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
        >
          <div className="relative w-full h-56">
            <Image
              src="/products/watering.jpg"
              alt="Automatic Watering Controller"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Automatic Watering Controller
            </h3>
            <p className="text-gray-600 text-sm">
              A smart irrigation controller that regulates water flow based on
              soil sensor data — ensuring your plants get exactly what they need.
            </p>
          </div>
        </motion.div>

        {/* 🐞 Pest Detection Device */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
        >
          <div className="relative w-full h-56">
            <Image
              src="/products/pest-system.jpg"
              alt="Pest Detection Hardware"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Pest Detection Device
            </h3>
            <p className="text-gray-600 text-sm">
              An AI-enabled camera module that detects pest activity early and
              alerts farmers through the EduFarm dashboard in real time.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Interest Form */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-white mt-20 p-10 rounded-2xl shadow-xl max-w-2xl mx-auto text-center border border-green-100"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-3">
          Interested in our SmartFarm Hardware?
        </h2>
        <p className="text-gray-600 mb-6">
          Join our early access waitlist or get in touch for partnership opportunities!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />
          <textarea
            placeholder="Tell us your interest"
            rows={3}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />
          <button
            type="submit"
            className="bg-green-700 text-white font-semibold py-3 rounded-full shadow-md hover:bg-green-800 transition"
          >
            {submitted ? "✅ Submitted!" : "Submit Interest"}
          </button>
        </form>
      </motion.section>

      {/* 📞 CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center mt-16"
      >
        <p className="text-gray-700 text-lg mb-4">
          Want to see our products in action?
        </p>
        <a
          href="https://wa.me/60123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition"
        >
          📩 Contact Us for Demo
        </a>
      </motion.div>
    </section>
  );
}
