import type { Metadata } from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import { Toaster } from "sonner";
import QueryClientProviderWrapper from "@/providers/QueryClientProvider";

const inter = Inter({
  subsets: ['latin'],
  weight: ["200", "400", "700", "900"]
})

export const metadata: Metadata = {
  title: "Bookly - Easy Online Booking for Service Providers",
  description: "Bookly makes online booking simple and efficient for service providers. Manage appointments, availability, and client bookings with ease. Perfect for freelancers, small businesses, and professionals.",
  keywords: "online booking, appointment scheduler, service provider booking, booking app, appointment manager, schedule appointments, online reservations, small business booking",
  openGraph: {
    title: "Bookly - Online Booking for Service Providers",
    description: "Bookly helps you manage your appointments, availability, and client bookings in one easy-to-use platform. Start managing your bookings today.",
    url: "https://yourdomain.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@codewithkin",
    title: "Bookly - Streamline Your Booking Process",
    description: "Simplify the way you manage appointments and bookings with Bookly. Start scheduling online today.",
  },
  robots: "index, follow",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <QueryClientProviderWrapper>
        {children}
        </QueryClientProviderWrapper>
        <Toaster richColors expand  />
      </body>
    </html>
  );
}
