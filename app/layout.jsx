// app/layout.jsx
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
    
export const metadata = {
  title: "Daily Options Tracker",
  description: "Frontend for CSP checklist + dashboards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><ClerkProvider>{children}</ClerkProvider></body>
    </html>
  );
}
