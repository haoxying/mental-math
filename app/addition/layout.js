import { Inter } from "next/font/google";
import "../section.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Addition",
  description: "Addition",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
