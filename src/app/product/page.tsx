"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "../../hooks/useTranslations";

export default function ProductPage() {
  const { t } = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const starterPrice = billing === "monthly" ? t("product.starter.monthlyPrice") : t("product.starter.annualPrice");
  const growthPrice = billing === "monthly" ? t("product.growth.monthlyPrice") : t("product.growth.annualPrice");

  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-16">
      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-green-700 text-center mb-6">
        {t("product.title")}
      </motion.h1>

      <p className="text-center text-gray-700 mb-12 text-lg max-w-2xl mx-auto">
        {t("product.intro")}
      </p>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        className="flex justify-center mb-16">
        <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-green-100">
          <video src="/dashboard_demo.mp4" controls className="w-full h-auto">
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 text-center mb-10">
        {t("product.hardwareLine")}
      </motion.h2>

      {/* gallery (kept as-is, you can t() the inner text if desired) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Smart Sensor */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <div className="relative w-full h-56">
            <Image src="/soilsensor_mockup.jpg" alt={t("product.starter.title")} fill className="object-cover" priority />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">{t("product.starter.title")}</h3>
            <p className="text-gray-600 text-sm">{t("product.starter.desc")}</p>
          </div>
        </motion.div>

        {/* Watering Controller */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <div className="relative w-full h-56">
            <Image src="/fertigation_mockup.jpg" alt="Automatic Watering Controller" fill className="object-cover" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Automatic Watering Controller</h3>
            <p className="text-gray-600 text-sm">A smart irrigation controller that regulates water flow based on soil sensor data — ensuring your plants get exactly what they need.</p>
          </div>
        </motion.div>

        {/* Pest Detection */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <div className="relative w-full h-56">
            <Image src="/pestdetection_mockup.jpg" alt="Pest Detection Hardware" fill className="object-cover" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Pest Detection Device</h3>
            <p className="text-gray-600 text-sm">An AI-enabled camera module that detects pest activity early and alerts farmers through the EduFarm dashboard in real time.</p>
          </div>
        </motion.div>
      </div>

      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 text-center mt-20 mb-6">
        {t("product.pricingTitle")}
      </motion.h2>

      {/* billing toggle */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex justify-center mb-8">
        <div className="bg-white shadow-md rounded-full p-2 flex gap-2 border border-green-300">
          <button onClick={() => setBilling("monthly")} className={`px-4 py-2 rounded-full text-sm font-semibold ${billing === "monthly" ? "bg-green-700 text-white" : "text-green-700 hover:bg-green-100"}`}>
            {t("billing.monthly")}
          </button>
          <button onClick={() => setBilling("annual")} className={`px-4 py-2 rounded-full text-sm font-semibold ${billing === "annual" ? "bg-green-700 text-white" : "text-green-700 hover:bg-green-100"}`}>
            {t("billing.annual")}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Starter */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 text-center flex flex-col h-full">
          <h3 className="text-2xl font-bold text-green-700 mb-3">{t("product.starter.title")}</h3>
          <p className="text-gray-600 mb-4 text-sm">{t("product.starter.desc")}</p>

          <p className="text-4xl font-extrabold text-green-700 mb-4">{starterPrice}</p>
          <p className="text-gray-500 text-sm mb-6">{t("product.starter.note")}</p>

          <ul className="text-left text-gray-700 text-sm space-y-2 mb-6">
            <li>• First-time installation by ACRE</li>
            <li>• 1x Fertigation Complete Set</li>
            <li>• Pest Detection Device</li>
            <li>• Smart Sensor Automation</li>
            <li>• 5-month consultation & training</li>
            <li>• 10 on-site visits</li>
            <li>• Dashboard Access (12 months)</li>
          </ul>

          <button onClick={() => { setSelectedPackage(t("product.starter.title")); document.getElementById("interestForm")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-green-700 text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-green-800 transition mt-auto">
            {t("product.starter.cta")}
          </button>
        </motion.div>

        {/* Growth */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-green-700 text-white rounded-2xl shadow-lg p-8 text-center border-4 border-green-600 flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-3">{t("product.growth.title")}</h3>
          <p className="opacity-90 mb-4 text-sm">{t("product.growth.desc")}</p>

          <p className="text-4xl font-extrabold mb-4">{growthPrice}</p>
          <p className="opacity-90 text-sm mb-6">{t("product.growth.note")}</p>

          <ul className="text-left text-sm space-y-2 mb-6 opacity-90">
            <li>• Everything in Starter Package</li>
            <li>• Extended 24-month system support</li>
            <li>• Priority troubleshooting</li>
            <li>• Annual optimization review</li>
            <li>• Discount for bulk fertigation bags</li>
            <li>• Optional manpower training</li>
          </ul>

          <button onClick={() => { setSelectedPackage(t("product.growth.title")); document.getElementById("interestForm")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-white text-green-700 py-2 px-6 rounded-full text-sm font-semibold hover:bg-green-100 transition mt-auto">
            {t("product.growth.cta")}
          </button>
        </motion.div>

        {/* Custom */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 text-center flex flex-col h-full">
          <h3 className="text-2xl font-bold text-green-700 mb-3">{t("product.custom.title")}</h3>
          <p className="text-gray-600 mb-4 text-sm">{t("product.custom.desc")}</p>

          <p className="text-4xl font-extrabold text-green-700 mb-4">{t("product.custom.priceLabel")}</p>
          <p className="text-gray-500 text-sm mb-6">{t("product.custom.note")}</p>

          <ul className="text-left text-gray-700 text-sm space-y-2 mb-6">
            <li>• Fertigation Module (RM20/bag × qty)</li>
            <li>• Pest Detection System</li>
            <li>• Smart Sensor Automation</li>
            <li>• On-site trips (RM150/trip)</li>
            <li>• Manpower training (quotation based)</li>
            <li>• 12m or 24m subscription options</li>
          </ul>

          <button onClick={() => { setSelectedPackage(t("product.custom.title")); document.getElementById("interestForm")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-green-700 text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-green-800 transition mt-auto">
            {t("product.custom.cta")}
          </button>
        </motion.div>
      </div>

      <motion.section id="interestForm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="bg-white mt-20 p-10 rounded-2xl shadow-xl max-w-2xl mx-auto text-center border border-green-100">
        <h2 className="text-2xl font-bold text-green-700 mb-3">{t("product.interest.title")}</h2>
        <p className="text-gray-600 mb-6">{t("product.interest.desc")}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" value={selectedPackage} />
          <input type="text" placeholder={t("product.interest.namePlaceholder")} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black" />
          <input type="email" placeholder={t("product.interest.emailPlaceholder")} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black" />
          <textarea placeholder={`${t("product.interest.messagePlaceholder")} ${selectedPackage ? `(${selectedPackage})` : ""}`} rows={3} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black" />

          <button type="submit" className="bg-green-700 text-white font-semibold py-3 rounded-full shadow-md hover:bg-green-800 transition">
            {submitted ? t("product.interest.submitted") : t("product.interest.submit")}
          </button>
        </form>
      </motion.section>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-center mt-16">
        <p className="text-gray-700 text-lg mb-4">Want to see our products in action?</p>
        <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition">
          📩 {t("product.contactCta")}
        </a>
      </motion.div>
    </section>
  );
}
