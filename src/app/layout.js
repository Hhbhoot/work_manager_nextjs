import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/Contex/AuthContex";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Work Manager | Home",
  // description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#000" }}>
        <AuthProvider>
          <Header />
          <div className="w-full ">
            <Toaster />
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
