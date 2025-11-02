// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Daily Options Tracker",
  description: "Frontend for CSP checklist + dashboards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
