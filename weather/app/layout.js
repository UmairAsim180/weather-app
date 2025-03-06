import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WeatherProvider } from "@/app/context/WeatherContext";
import { BodyComponent } from "@/components/BodyComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather",
  description: "this is a weather app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <WeatherProvider>
        <body>
          <BodyComponent>
            {children}
          </BodyComponent>
        </body>
      </WeatherProvider>
    </html>
  );
}

