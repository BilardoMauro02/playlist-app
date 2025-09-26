import ClientSidebar from "@/components/client/ClientSidebar";

import "../components/styles/ClientHome.css"
export const metadata = {
  title: 'playlist archive',
  description: 'archivio di playlist musciali',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="layout">
        {children}
      </body>
    </html>
  );
}