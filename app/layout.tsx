import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UnifiedAuthProvider } from "@/components/unified-auth-provider"
import { RealTimeProvider } from "@/components/real-time-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IBMS 3.5.2 - Integrated Barangay Management System",
  description:
    "Comprehensive digital platform for barangay services, emergency response, and administrative solutions.",
  keywords: "barangay, management, system, emergency, health, documents, services",
  authors: [{ name: "Barangay Bucana" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UnifiedAuthProvider>
            <RealTimeProvider>
              {children}
              <Toaster />
            </RealTimeProvider>
          </UnifiedAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
