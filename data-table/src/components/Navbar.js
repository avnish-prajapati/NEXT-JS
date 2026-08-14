"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-container">

        <Link href="/" className="logo">
          DataTable
        </Link>

        <div className="nav-links">

          <Link href="/">
            Add Data
          </Link>

          <Link href="/data">
            View Data
          </Link>

        </div>

      </div>

    </nav>
  );
}