"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" }, // ✅ Added About page link
    { href: "/videos", label: "Videos" },
    { href: "/forum", label: "Forum" },
  ];

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "2px solid #e0e0e0",
        padding: "20px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: "10px 22px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.2rem",
              background: pathname === link.href ? "#2E7D32" : "transparent",
              color: pathname === link.href ? "white" : "#2E7D32",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (pathname !== link.href)
                e.currentTarget.style.background = "#E8F5E9";
            }}
            onMouseLeave={(e) => {
              if (pathname !== link.href)
                e.currentTarget.style.background = "transparent";
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
