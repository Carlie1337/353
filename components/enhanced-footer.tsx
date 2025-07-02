"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock, Send, ExternalLink } from "lucide-react"

export function EnhancedFooter() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Officials", href: "#officials" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" },
  ]

  const services = [
    { name: "Document Services", href: "/documents" },
    { name: "Business Permits", href: "/portal/services" },
    { name: "Health Services", href: "/health-portal" },
    { name: "Emergency Services", href: "/emergency" },
    { name: "Resident Portal", href: "/portal" },
  ]

  const government = [
    { name: "Barangay Officials", href: "#officials" },
    { name: "Transparency", href: "/transparency" },
    { name: "Public Records", href: "/records" },
    { name: "Ordinances", href: "/ordinances" },
    { name: "Budget & Finance", href: "/finance" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/dashboard-section.png"
                alt="Barangay Bucana Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg">Barangay Bucana</h3>
                <p className="text-sm text-gray-400">Management System</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Serving our community with dedication, transparency, and innovation. Your digital gateway to efficient
              government services and community engagement.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span>{service.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Barangay Bucana Hall</p>
                  <p>123 Main Street, Bucana</p>
                  <p>Davao City, Philippines 8000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>(082) 123-4567</p>
                  <p className="text-red-400">Emergency: 911</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300">info@barangaybucana.gov.ph</p>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300">Mon-Fri: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Newsletter Subscription */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-semibold text-lg mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest announcements, events, and community updates.
              </p>
            </div>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Government Links */}
        <div className="mb-8">
          <h4 className="font-semibold text-lg mb-4">Government & Transparency</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {government.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-sm text-center p-3 border border-gray-700 rounded-lg hover:border-gray-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} Barangay Bucana Management System. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">Developed with ❤️ for the community | Version 3.5.0</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
