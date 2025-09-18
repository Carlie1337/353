"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  content: string
  author: string
  category: string
  published_at: string
  image_url?: string
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading news data
    setTimeout(() => {
      setNews([
        {
          id: "1",
          title: "New Health Programs Launched for Senior Citizens",
          content:
            "The barangay has launched comprehensive health programs specifically designed for senior citizens, including free medical checkups and wellness activities.",
          author: "Barangay Health Office",
          category: "Health",
          published_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          image_url: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "2",
          title: "Community Clean-up Drive This Weekend",
          content:
            "Join us this Saturday for our monthly community clean-up drive. All residents are encouraged to participate in keeping our barangay clean and green.",
          author: "Environmental Committee",
          category: "Environment",
          published_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          image_url: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "3",
          title: "New Online Document Request System",
          content:
            "Residents can now request barangay documents online through our new digital platform. This service is available 24/7 for your convenience.",
          author: "IT Department",
          category: "Technology",
          published_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          image_url: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "4",
          title: "Emergency Response Training for Residents",
          content:
            "Free emergency response training will be conducted next month. Learn basic first aid, disaster preparedness, and emergency protocols.",
          author: "Emergency Response Team",
          category: "Safety",
          published_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          image_url: "/placeholder.svg?height=200&width=300",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    return date.toLocaleDateString()
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Health: "bg-green-100 text-green-800",
      Environment: "bg-blue-100 text-blue-800",
      Technology: "bg-purple-100 text-purple-800",
      Safety: "bg-red-100 text-red-800",
      General: "bg-gray-100 text-gray-800",
    }
    return colors[category] || colors["General"]
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Latest News & Announcements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News & Announcements</h2>
        <p className="text-gray-600">Stay updated with the latest happenings in our barangay</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="bg-white rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{item.title}</span>
                <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{formatDate(item.published_at)}</span>
              </div>
              <p className="text-gray-800 mb-4">{item.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">{item.author}</span>
                <Link href={`/news/${item.id}`}>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
