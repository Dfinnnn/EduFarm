"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/videos", label: "Videos" },
    { href: "/learn", label: "Learn" },
    { href: "/forum", label: "Forum" },
  ];

  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #ddd", padding: "10px 20px" }}>
      <nav style={{ display: "flex", gap: "20px" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              textDecoration: "none",
              fontWeight: "bold",
              background: pathname === link.href ? "#2E7D32" : "transparent",
              color: pathname === link.href ? "white" : "#333",
              transition: "0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
