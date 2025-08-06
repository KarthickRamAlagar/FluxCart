export const metadata = {
  title: "Sanity Studio",
  description: "Content Management",
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
