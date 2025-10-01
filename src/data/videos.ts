// src/data/videos.ts

export interface Video {
  title: string;
  link: string;
  category: string;
  thumbnail?: string;
  embed?: string;
}

// ✅ Raw dataset (only title, link, category)
// No need to repeat parser here
export const rawVideos: Video[] = [
  {
    title: "How to Grow Bell Peppers from Seed in Containers",
    link: "https://www.youtube.com/watch?v=EP8TBK3FTHo",
    category: "Planting",
  },
  {
    title: "Oil Palm Cultivation – Complete Step by Step Farming Guide",
    link: "https://www.youtube.com/watch?v=0qLwATBWTCg",
    category: "Plantation",
  },
  {
    title: "Malaysia Grows Sustainable Farming To Modernise",
    link: "https://youtu.be/kYry0Yi34zA",
    category: "Mixed Farming",
  },
  {
    title: "Urban Hijau Tour: The Secret of Organic Farming in Malaysia",
    link: "https://youtu.be/5mX_pIBODLk",
    category: "Organic Farming",
  },
  {
    title: "Kairos Agriculture — Malaysia’s Smart Vanilla Farm",
    link: "https://youtu.be/JAFmt47QWw8",
    category: "Smart Agriculture",
  },
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
    title: "Hydroponics 101 | Beginners Guide",
    link: "https://youtu.be/0EklopLQqyk",
    category: "Hydroponics",
  },
  {
    title: "How to grow melons easily in containers",
    link: "https://youtu.be/t3aY84XcdAo",
    category: "Hydroponics",
  },
];
