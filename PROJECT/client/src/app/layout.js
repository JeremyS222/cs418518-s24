import { Inter } from "next/font/google";  
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer"; 


const inter = Inter({ subsets: ["latin"] });   

export const metadata = {
  title: "Advising Portal",
  description: "Main Advising Portal Connecting Advisors and Students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar/>
          <main className = "relative overflow-hidden">
            {children} 
          </main>
          <Footer/> 
        </body>
    </html>
  );
}
 