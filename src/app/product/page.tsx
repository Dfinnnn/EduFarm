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

  const starterPrice =
    billing === "monthly"
      ? t("product.starter.monthlyPrice")
      : t("product.starter.annualPrice");

  const growthPrice =
    billing === "monthly"
      ? t("product.growth.monthlyPrice")
      : t("product.growth.annualPrice");

  const renderFeatures = (packageKey: string) => {
    let raw: any;
    try {
      raw = (t as any)(`product.${packageKey}.features`, {
        returnObjects: true,
      });
    } catch {
      raw = (t as any)(`product.${packageKey}.features`);
    }

    let features: string[] = [];

    if (Array.isArray(raw)) {
      features = raw;
    } else if (typeof raw === "string") {
      features = raw.split("\n").filter(Boolean);
    } else if (typeof raw === "object" && raw !== null) {
      features = Object.values(raw);
    }

    return features.map((f: string, i: number) => (
      <li
        key={i}
        className={`text-left text-sm ${
          packageKey === "growth" ? "text-white" : "text-gray-700"
        }`}
      >
        • {f}
      </li>
    ));
  };

  return (
    <section className="min-h-screen bg-green-50 py-16 px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-green-700 text-center mb-6"
      >
        {t("product.title")}
      </motion.h1>

      <p className="text-center text-gray-700 mb-12 text-lg max-w-2xl mx-auto">
        {t("product.intro")}
      </p>

      {/* Dashboard Demo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-16"
      >
        <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-green-100">
          <video src="/dashboard_demo.mp4" controls className="w-full h-auto" />
        </div>
      </motion.div>

      {/* Hardware Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 text-center mb-10"
      >
        {t("product.hardwareLine")}
      </motion.h2>

      {/* Image Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          {
            img: "/soilsensor_mockup.jpg",
            title: t("product.hardware.soilSensor.title"),
            desc: t("product.hardware.soilSensor.desc"),
          },
          {
            img: "/fertigation_mockup.jpg",
            title: t("product.hardware.wateringController.title"),
            desc: t("product.hardware.wateringController.desc"),
          },
          {
            img: "/pestdetection_mockup.jpg",
            title: t("product.hardware.pestDevice.title"),
            desc: t("product.hardware.pestDevice.desc"),
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <div className="relative w-full h-56">
              <Image src={item.img} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pricing Section */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 text-center mt-20 mb-6"
      >
        {t("product.pricingTitle")}
      </motion.h2>

      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-md rounded-full p-2 flex gap-2 border border-green-300">
          {["monthly", "annual"].map((type) => (
            <button
              key={type}
              onClick={() => setBilling(type as any)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                billing === type
                  ? "bg-green-700 text-white"
                  : "text-green-700 hover:bg-green-100"
              }`}
            >
              {t(`billing.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {["starter", "growth", "custom"].map((pkg) => {
          const isGrowth = pkg === "growth";

          return (
            <motion.div
              key={pkg}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl shadow-lg p-8 flex flex-col h-full ${
                isGrowth
                  ? "bg-green-700 text-white border-4 border-green-600"
                  : "bg-white text-gray-900 border border-green-200"
              }`}
            >
              <h3 className="text-2xl font-bold mb-3">
                {t(`product.${pkg}.title`)}
              </h3>
              <p className={`mb-4 text-sm ${isGrowth ? "opacity-90" : "text-gray-600"}`}>
                {t(`product.${pkg}.desc`)}
              </p>

              <p className="text-4xl font-extrabold mb-4">
                {pkg === "starter"
                  ? starterPrice
                  : pkg === "growth"
                  ? growthPrice
                  : t("product.custom.priceLabel")}
              </p>

              <p className={`mb-6 text-sm ${isGrowth ? "opacity-90" : "text-gray-500"}`}>
                {t(`product.${pkg}.note`)}
              </p>

              <ul className={`mb-6 space-y-2 ${isGrowth ? "text-white" : "text-gray-700"}`}>
                {renderFeatures(pkg)}
              </ul>

              <button
                onClick={() => {
                  setSelectedPackage(t(`product.${pkg}.title`));
                  document
                    .getElementById("interestForm")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`py-2 px-6 rounded-full text-sm font-semibold mt-auto transition ${
                  isGrowth
                    ? "bg-white text-green-700 hover:bg-green-100"
                    : "bg-green-700 text-white hover:bg-green-800"
                }`}
              >
                {t(`product.${pkg}.cta`)}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Interest Form */}
      <section
        id="interestForm"
        className="mt-24 bg-white rounded-3xl shadow-xl max-w-4xl mx-auto p-10 border border-green-300"
      >
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          {t("product.interest.title")}
        </h2>

        <p className="text-center text-gray-800 mb-10 max-w-xl mx-auto">
          {t("product.interest.desc")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedPackage && (
            <div className="bg-green-50 border border-green-400 rounded-xl p-4 text-center text-green-900 font-semibold shadow-sm">
              {t("product.interest.selectedPackage")}: {selectedPackage}
            </div>
          )}

          {/* Name */}
          <div>
            <input
              type="text"
              required
              className="w-full p-3 border border-green-500 rounded-xl focus:ring-2 focus:ring-green-600 outline-none text-gray-900"
              placeholder={t("product.interest.namePlaceholder")}
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              required
              className="w-full p-3 border border-green-500 rounded-xl focus:ring-2 focus:ring-green-600 outline-none text-gray-900"
              placeholder={t("product.interest.emailPlaceholder")}
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              rows={4}
              className="w-full p-3 border border-green-500 rounded-xl focus:ring-2 focus:ring-green-600 outline-none text-gray-900"
              placeholder={t("product.interest.messagePlaceholder")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition shadow-lg"
          >
            {t("product.interest.submit")}
          </button>

          {submitted && (
            <p className="text-center text-green-700 font-bold mt-4">
              {t("product.interest.submitted")}
            </p>
          )}
        </form>
      </section>
    </section>
  );
}
