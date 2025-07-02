"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, ChevronUp, HelpCircle, FileText, Users, Heart, Shield, Phone } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  helpful: number
}

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I request a Barangay Clearance?",
      answer:
        "To request a Barangay Clearance: 1) Log into your resident portal, 2) Go to 'Document Requests', 3) Select 'Barangay Clearance', 4) Fill out the required information, 5) Upload necessary documents, 6) Pay the processing fee (₱50), 7) Submit your request. You'll receive updates via SMS and email.",
      category: "Documents",
      tags: ["clearance", "documents", "requirements"],
      helpful: 45,
    },
    {
      id: "2",
      question: "What should I do during a flood emergency?",
      answer:
        "During flood emergencies: 1) Stay calm and move to higher ground immediately, 2) Call our emergency hotline (082) 911-HELP, 3) Follow evacuation orders from barangay officials, 4) Bring essential items (documents, medicines, food), 5) Stay tuned to official announcements, 6) Do not attempt to cross flooded areas.",
      category: "Emergency",
      tags: ["flood", "emergency", "evacuation", "safety"],
      helpful: 67,
    },
    {
      id: "3",
      question: "How can I register for health programs?",
      answer:
        "To register for health programs: 1) Visit the Health Portal section, 2) Browse available programs (Senior Citizen, Maternal Care, etc.), 3) Click 'Register' on your desired program, 4) Complete the health assessment form, 5) Schedule your initial consultation, 6) Attend the orientation session.",
      category: "Health",
      tags: ["health", "programs", "registration", "consultation"],
      helpful: 32,
    },
    {
      id: "4",
      question: "How do I report a security incident?",
      answer:
        "To report security incidents: 1) For emergencies, call 911 or (082) 911-HELP immediately, 2) For non-emergencies, use the 'Report Incident' feature in your portal, 3) Provide detailed information (location, time, description), 4) Upload photos/videos if safe to do so, 5) Our NET team will respond within 15 minutes for emergencies.",
      category: "Security",
      tags: ["incident", "security", "report", "emergency"],
      helpful: 28,
    },
    {
      id: "5",
      question: "What documents do I need for resident registration?",
      answer:
        "Required documents for registration: 1) Valid government ID (driver's license, passport, etc.), 2) Proof of residence (utility bill, lease contract), 3) Birth certificate, 4) Marriage certificate (if applicable), 5) Recent 2x2 photo, 6) Barangay residency certificate from previous address (if transferring).",
      category: "Registration",
      tags: ["registration", "documents", "requirements", "ID"],
      helpful: 89,
    },
    {
      id: "6",
      question: "How can I pay for document processing fees?",
      answer:
        "Payment options available: 1) Online payment via GCash, PayMaya, or bank transfer, 2) Over-the-counter payment at the Barangay Hall, 3) Authorized payment centers (7-Eleven, SM Bills Payment), 4) Bank deposit to our official account. Payment confirmation is usually processed within 24 hours.",
      category: "Payment",
      tags: ["payment", "fees", "gcash", "bank"],
      helpful: 41,
    },
    {
      id: "7",
      question: "What are the office hours of Barangay Bucana?",
      answer:
        "Office Hours: Monday to Friday: 8:00 AM - 5:00 PM, Saturday: 8:00 AM - 12:00 PM, Sunday: Closed (except for emergencies). Emergency services are available 24/7. Online services through the portal are accessible anytime.",
      category: "General",
      tags: ["hours", "schedule", "office", "emergency"],
      helpful: 76,
    },
    {
      id: "8",
      question: "How do I update my family information?",
      answer:
        "To update family information: 1) Go to 'My Profile' in your portal, 2) Click 'Household Management', 3) Select 'Add/Edit Family Member', 4) Provide required information and documents, 5) Submit for verification. Updates are usually processed within 3-5 business days.",
      category: "Profile",
      tags: ["family", "household", "update", "profile"],
      helpful: 23,
    },
  ]

  const categories = [
    { id: "all", name: "All Categories", icon: HelpCircle },
    { id: "Documents", name: "Documents", icon: FileText },
    { id: "Emergency", name: "Emergency", icon: Shield },
    { id: "Health", name: "Health", icon: Heart },
    { id: "Security", name: "Security", icon: Shield },
    { id: "Registration", name: "Registration", icon: Users },
    { id: "General", name: "General", icon: HelpCircle },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const markHelpful = (id: string) => {
    // In a real app, this would update the database
    console.log(`Marked FAQ ${id} as helpful`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find quick answers to common questions about barangay services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-1"
                >
                  <category.icon className="h-3 w-3" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
                <Button variant="outline" className="mt-2" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <Collapsible key={faq.id} open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 h-auto text-left border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{faq.question}</span>
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{faq.helpful} people found this helpful</span>
                          <span>•</span>
                          <div className="flex gap-1">
                            {faq.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => markHelpful(faq.id)}>
                            👍 Helpful
                          </Button>
                          <Button size="sm" variant="outline">
                            📝 Need More Help?
                          </Button>
                        </div>
                        <Button size="sm" variant="ghost">
                          Share
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))
            )}
          </div>

          {/* Contact Support */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <h4 className="font-medium">Still need help?</h4>
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Support
                  </Button>
                  <Button size="sm" variant="outline">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Submit Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
