import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/300-italic.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "./globals.css";

export const metadata = {
  title: "EcoScope — Dashboard di monitoraggio ambientale",
  description: "Dashboard React/Next.js per il monitoraggio della qualità dell'aria urbana (progetto dimostrativo).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
