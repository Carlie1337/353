"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Heart,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EnhancedFooter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate newsletter signup
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about barangay news and services.",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/portal" },
    { name: "Emergency", href: "/emergency" },
    { name: "News & Updates", href: "/portal/bulletin" },
    { name: "Contact Us", href: "#contact" },
  ]

  const services = [
    { name: "Document Requests", href: "/documents", icon: FileText },
    { name: "Health Services", href: "/health-portal", icon: Heart },
    { name: "Security Services", href: "/tanod", icon: Shield },
    { name: "Resident Portal", href: "/portal", icon: Users },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Accessibility", href: "/legal/accessibility" },
    { name: "Data Protection", href: "/legal/data-protection" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/barangaybucana" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/barangaybucana" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/barangaybucana" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/barangaybucana" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected with Your Barangay</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest updates on community events, service announcements, and important notices delivered to your
              inbox.
            </p>
            <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900 border-0"
                disabled={loading}
              />
              <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100" disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">IBMS 3.5.2</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Integrated Barangay Management System - Modernizing local governance for better community service.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>24/7 Online Services</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Real-time Updates</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Secure & Reliable</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 pt-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      <service.icon className="h-4 w-4 mr-2" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-400">
                    <p>Barangay Hall, Bucana</p>
                    <p>Davao City, Philippines 8000</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <div className="text-sm text-gray-400">
                    <p>Main: (082) 123-4567</p>
                    <p>Emergency: 911</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <div className="text-sm text-gray-400">
                    <p>info@barangaybucana.gov.ph</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <div className="text-sm text-gray-400">
                    <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
                    <p>Emergency: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Barangay Bucana. All rights reserved. | IBMS v3.5.2 | Powered by modern web technologies
            </div>

            <div className="flex flex-wrap items-center space-x-6 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.name} className="flex items-center">
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && <span className="text-gray-600 ml-6">|</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              This system is designed to serve the community with transparency, efficiency, and accessibility.
              <br />
              For technical support, contact our IT department at support@barangaybucana.gov.ph
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
