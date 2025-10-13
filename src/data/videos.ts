// src/data/videos.ts

export interface Video {
  title: string;
  link: string;
  category: string;
  thumbnail?: string;
  embed?: string;
}

export const rawVideos: Video[] = [
  // 🌱 Planting
  {
    title: "How to Grow Bell Peppers from Seed in Containers",
    link: "https://www.youtube.com/watch?v=EP8TBK3FTHo",
    category: "Planting",
  },
  {
    title: "How to Grow Tomatoes from Seed to Harvest | COMPLETE GUIDE",
    link: "https://youtu.be/OMIbtIZ2E-Q?si=dC4z-nxIFEmgwZzJ",
    category: "Planting",
  },
  {
    title: "How To Grow Chili Peppers in Containers From Seed to Harvest",
    link: "https://youtu.be/tv18Nt7i4cQ?si=HgDdyu8Pc4jB-VH7",
    category: "Planting",
  },
  {
    title: "5 Tips for Growing Cucumbers",
    link: "https://youtu.be/hSQf1i8AX1A?si=tCa-Rhhi-7ZGi2oc",
    category: "Planting",
  },

  // 🌴 Plantation
  {
    title: "Oil Palm Cultivation – Complete Step by Step Farming Guide",
    link: "https://www.youtube.com/watch?v=0qLwATBWTCg",
    category: "Plantation",
  },
  {
    title: "The Fascinating Process of Harvesting Natural Rubber from Hevea Trees.",
    link: "https://youtu.be/CfoAYh7IDXc?si=aUPIeTZtqzjZD1hL",
    category: "Plantation",
  },
  {
    title: "How Thai Farmers Harvest Millions of Tons of Fresh Coconut Every Year",
    link: "https://youtu.be/R8VOlS9rhQ0?si=a7JBfoZD0Etg3tnh",
    category: "Plantation",
  },
  {
    title: "How Millions of Banana Harvested & Processed | Banana Chips Factory🍌",
    link: "https://youtu.be/If9U6ME3ycQ?si=gbM7UoNBrP2k1Fyj",
    category: "Plantation",
  },

  // 🌾 Mixed Farming
  {
    title: "Malaysia Grows Sustainable Farming To Modernise Agriculture | CNA Correspondent",
    link: "https://youtu.be/kYry0Yi34zA?si=m1vNh_YW9_hbTZWx",
    category: "Mixed Farming",
  },
  {
    title: "What is Integrated Farming System (IFS) | Benefits of Integrated Farming System",
    link: "https://youtu.be/tIqvxD7ao74?si=xMU2oqyZJzI7rBQu",
    category: "Mixed Farming",
  },
  {
    title: "He Farms 35 Hours a Week By Himself and Makes 6 Figures",
    link: "https://youtu.be/26qTgXJKMAE?si=fGo3GSvyi0jwi8rO",
    category: "Mixed Farming",
  },
  {
    title: "Modern Integrated Farming Systems | Modern Agriculture Technologies",
    link: "https://youtu.be/l36uoyUke-s?si=HswVmul0RinxLQ_z",
    category: "Mixed Farming",
  },

  // 🍃 Organic Farming
  {
    title: "Urban Hijau Tour: The Secret of Organic Farming in Malaysia",
    link: "https://youtu.be/5mX_pIBODLk",
    category: "Organic Farming",
  },
  {
    title: "30 ESSENTIAL Organic Farming Techniques For Small Farms & Market Gardens",
    link: "https://youtu.be/mkEsLdNKlPM?si=eyCThZTBNS1Cv7SL",
    category: "Organic Farming",
  },
  {
    title: "How to Make Organic Compost at Home | Natural Fertilizer",
    link: "https://youtu.be/_K25WjjCBuw?si=VlPfGoC7XnMQqCJ6",
    category: "Organic Farming",
  },
  {
    title: "Organic Regenerative Farming is the Future of Agriculture | The Future of Food",
    link: "https://youtu.be/hWkYtZxpQUo?si=RAbIU6_VHgayee6X",
    category: "Organic Farming",
  },

  // 🤖 Smart Agriculture
  {
    title: "Kairos Agriculture — Malaysia’s Smart Vanilla Farm",
    link: "https://youtu.be/JAFmt47QWw8",
    category: "Smart Agriculture",
  },
  {
    title: "Smart Soil Sensors - How Tiny Tech is Revolutionizing Crop Yields and Farming Efficiency",
    link: "https://youtu.be/T1534lUt1XE?si=ZpSP6V2zui-RxmnD",
    category: "Smart Agriculture",
  },
  {
    title: "Revolutionizing Farming with Precision Agriculture and Drone AI Technology",
    link: "https://youtu.be/EyNLQgJopvU?si=lBSL-HOD4oOcsguR",
    category: "Smart Agriculture",
  },
  {
    title: "Artificial Intelligence (AI) in Agriculture | The Future of Modern Smart Farming with IoT",
    link: "https://youtu.be/_tijHjup-gM?si=27DWcFIyLhyJJ_52",
    category: "Smart Agriculture",
  },

  // 🐛 Pest Control
  {
    title: "Ultimate Pest Control Guide for Farmers | Types, Methods, and Strategies",
    link: "https://youtu.be/AVSs-EkYTCo",
    category: "Pest Control",
  },
  {
    title: "Plants Pests and Diseases",
    link: "https://www.youtube.com/watch?v=e4YYNf81n8A",
    category: "Pest Control",
  },
  {
    title: "Pest Control | Ecology & Environment | Biology",
    link: "https://youtu.be/g6LMw9I6rxU?si=qTkRNKxZyk86nwe1",
    category: "Pest Control",
  },
  {
    title: "Top 5 Organic Pest Control Methods You Should Know",
    link: "https://youtu.be/-K80djZC8y0?si=pubOj0ai1uwyuxCn",
    category: "Pest Control",
  },

  // 💧 Hydroponics
  {
    title: "Hydroponics 101 | Beginners Guide",
    link: "https://youtu.be/0EklopLQqyk",
    category: "Hydroponics",
  },
  {
    title: "How to grow melons easily in containers",
    link: "https://youtu.be/t3aY84XcdAo",
    category: "Hydroponics",
  },
  {
    title: "Which Method Reigns Supreme: Hydroponics or Aeroponics",
    link: "https://youtu.be/IInjYsqRXmg?si=SvdjbI_7FTT1_TS2",
    category: "Hydroponics",
  },
  {
    title: "Hydroponics 101 | A BEGINNERS GUIDE TO EVERYTHING YOU NEED AND NEED TO KNOW TO GROW PLANTS IN WATER.",
    link: "https://youtu.be/0EklopLQqyk?si=iqjh2ks-jJZWlho4",
    category: "Hydroponics",
  },
];
