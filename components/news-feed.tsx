"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight, Megaphone, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  content: string
  category: "announcement" | "event" | "alert" | "news"
  priority: "low" | "medium" | "high"
  author: string
  publishedAt: string
  imageUrl?: string
}

interface NewsFeedProps {
  limit?: number
}

export function NewsFeed({ limit = 6 }: NewsFeedProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)

        // Simulate API call with fallback data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const fallbackNews: NewsItem[] = [
          {
            id: "1",
            title: "Community Health Program: Free Medical Check-up",
            content:
              "The Barangay Health Center will conduct free medical check-ups for all residents aged 60 and above. The program includes blood pressure monitoring, diabetes screening, and general consultation.",
            category: "announcement",
            priority: "high",
            author: "Barangay Health Office",
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            imageUrl: "/placeholder.svg?height=200&width=400&text=Health+Program",
          },
          {
            id: "2",
            title: "Barangay Assembly Meeting - January 2025",
            content:
              "All residents are invited to attend the monthly barangay assembly meeting. We will discuss upcoming projects, budget allocation, and community concerns.",
            category: "event",
            priority: "medium",
            author: "Barangay Secretary",
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            imageUrl: "/placeholder.svg?height=200&width=400&text=Assembly+Meeting",
          },
          {
            id: "3",
            title: "Road Maintenance Schedule",
            content:
              "Road maintenance and repair work will be conducted on Main Street from January 15-20. Expect temporary traffic delays and plan alternate routes.",
            category: "alert",
            priority: "medium",
            author: "Infrastructure Committee",
            publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            imageUrl: "/placeholder.svg?height=200&width=400&text=Road+Maintenance",
          },
          {
            id: "4",
            title: "New Online Document Request System",
            content:
              "We're excited to announce the launch of our new online document request system. Residents can now apply for certificates and clearances through our digital portal.",
            category: "news",
            priority: "medium",
            author: "IT Department",
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            imageUrl: "/placeholder.svg?height=200&width=400&text=Online+System",
          },
          {
            id: "5",
            title: "Youth Sports Festival 2025",
            content:
              "Registration is now open for the annual Youth Sports Festival. Categories include basketball, volleyball, and track and field events for ages 12-25.",
            category: "event",
            priority: "low",
            author: "Youth Development Office",
            publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            imageUrl: "/placeholder.svg?height=200&width=400&text=Sports+Festival",
          },
          {
            id: "6",
            title: "Waste Segregation Reminder",
            content:
              "Please remember to properly segregate your waste. Biodegradable waste should be separated from non-biodegradable materials. Collection schedules remain unchanged.",
            category: "announcement",
            priority: "low",
            author: "Environmental Office",
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            imageUrl: "/placeholder.svg?height=200&width=400&text=Waste+Segregation",
          },
        ]

        setNews(fallbackNews.slice(0, limit))
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [limit])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "announcement":
        return <Megaphone className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "alert":
        return <AlertCircle className="h-4 w-4" />
      case "news":
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement":
        return "bg-blue-100 text-blue-800"
      case "event":
        return "bg-green-100 text-green-800"
      case "alert":
        return "bg-red-100 text-red-800"
      case "news":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">News & Announcements</h2>
          <p className="text-lg text-gray-600">Loading latest updates...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">News & Announcements</h2>
        <p className="text-lg text-gray-600">Stay updated with the latest community news and important announcements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow group cursor-pointer overflow-hidden">
            <div className="relative">
              <img
                src={item.imageUrl || "/placeholder.svg?height=200&width=400"}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <Badge className={getCategoryColor(item.category)}>
                  {getCategoryIcon(item.category)}
                  <span className="ml-1 capitalize">{item.category}</span>
                </Badge>
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}></div>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{item.content}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-3 w-3" />
                  <span>{item.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(item.publishedAt)}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 bg-transparent"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/portal/bulletin">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View All News & Announcements
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
