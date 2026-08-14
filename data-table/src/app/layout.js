import "./globals.css";

export const metadata = {
  title: "Data Table App",
  description: "Simple Next.js CRUD Data Table",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}