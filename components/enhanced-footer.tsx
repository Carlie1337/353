"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Heart,
  Users,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Send,
} from "lucide-react"

export function EnhancedFooter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const quickLinks = [
    { href: "/portal", label: "Resident Portal", icon: Users },
    { href: "/documents", label: "Document Requests", icon: FileText },
    { href: "/health-portal", label: "Health Services", icon: Heart },
    { href: "/emergency", label: "Emergency Services", icon: Shield },
    { href: "/portal/bulletin", label: "Events & News", icon: Calendar },
    { href: "/ResQNet", label: "ResQNet", icon: AlertTriangle },
  ]

  const adminPortals = [
    { href: "/admin", label: "Admin Portal" },
    { href: "/bms", label: "BMS Portal" },
    { href: "/tanod", label: "Tanod Portal" },
    { href: "/health-portal", label: "Health Portal" },
    { href: "/net", label: "NET Portal" },
    { href: "/Bofficial", label: "Official Portal" },
  ]

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/accessibility", label: "Accessibility" },
    { href: "/data-protection", label: "Data Protection" },
  ]

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Barangay Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-4">Barangay Bucana</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your comprehensive digital platform for barangay services, emergency response, health management, and
                community engagement.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-blue-400 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">Barangay Hall</div>
                  <div className="text-gray-300">
                    123 Main Street, Bucana
                    <br />
                    Davao City, Philippines 8000
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400" />
                <div className="text-sm">
                  <div className="font-medium">+63 82 123 4567</div>
                  <div className="text-gray-300">Office Hours</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-red-400" />
                <div className="text-sm">
                  <div className="font-medium">info@barangaybucana.gov.ph</div>
                  <div className="text-gray-300">Official Email</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-400" />
                <div className="text-sm">
                  <div className="font-medium">Mon - Fri: 8:00 AM - 5:00 PM</div>
                  <div className="text-gray-300">Sat: 8:00 AM - 12:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon className="h-3 w-3" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* System Portals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">System Access</h3>
            <div className="space-y-2">
              {adminPortals.map((portal) => (
                <Link
                  key={portal.href}
                  href={portal.href}
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {portal.label}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Emergency Contacts</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Emergency:</span>
                  <span className="text-red-400 font-medium">911</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Police:</span>
                  <span className="text-blue-400 font-medium">117</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Fire:</span>
                  <span className="text-orange-400 font-medium">116</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Medical:</span>
                  <span className="text-green-400 font-medium">143</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-3">
                Subscribe to receive updates on barangay news and announcements.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Successfully subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSignup} className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    required
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="h-3 w-3 mr-2" />
                    Subscribe
                  </Button>
                </form>
              )}
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">System Status</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-300">All Systems Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs text-gray-300">Last Updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Barangay Bucana Management System. All rights reserved.</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Version Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-gray-400 border-gray-600">
              v3.5.2
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-600">
              Online
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  )
}
