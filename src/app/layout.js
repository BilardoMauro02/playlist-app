export const metadata = {
  title: 'playlist archive',
  description: 'archivio di playlist musciali',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}