import "@/styles/globals.scss";

export const metadata = {
  title: "Load more Sample",
  description: "Alex Lee's Load more Sample",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
