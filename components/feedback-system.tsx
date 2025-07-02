"use client"

import type React from "react"
import { useState } from "react"
import { MessageSquare, X, Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function FeedbackSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState("")
  const [feedback, setFeedback] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mock submission
    console.log("Feedback submitted:", { rating, feedback, category })

    setIsSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setRating("")
      setFeedback("")
      setCategory("")
    }, 2000)
  }

  const categories = [
    { value: "service", label: "Service Quality" },
    { value: "website", label: "Website Experience" },
    { value: "staff", label: "Staff Assistance" },
    { value: "process", label: "Process Efficiency" },
    { value: "other", label: "Other" },
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <Button variant="outline" className="rounded-full shadow-lg bg-transparent" onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-96 z-40">
      <Card className="w-80 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg">Share Your Feedback</CardTitle>
            <CardDescription>Help us improve our services</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Category</Label>
                <RadioGroup value={category} onValueChange={setCategory} className="mt-2">
                  {categories.map((cat) => (
                    <div key={cat.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={cat.value} id={cat.value} />
                      <Label htmlFor={cat.value} className="text-sm">
                        {cat.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium">Rating</Label>
                <RadioGroup value={rating} onValueChange={setRating} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" />
                    <Label htmlFor="excellent" className="text-sm">
                      Excellent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good" className="text-sm">
                      Good
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="average" />
                    <Label htmlFor="average" className="text-sm">
                      Average
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" />
                    <Label htmlFor="poor" className="text-sm">
                      Poor
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="feedback" className="text-sm font-medium">
                  Your Feedback
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us about your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={!category || !rating || !feedback.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
