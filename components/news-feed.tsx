"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, Eye, EyeOff, AlertTriangle, Info, CheckCircle, Megaphone, RefreshCw } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  content: string
  type: "announcement" | "alert" | "event" | "news"
  priority: "low" | "medium" | "high" | "urgent"
  publishedAt: string
  author: string
  read: boolean
  category: string
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [readItems, setReadItems] = useState<string[]>([])

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sample news data
      const sampleNews: NewsItem[] = [
        {
          id: "news-1",
          title: "Barangay Assembly Meeting - December 15, 2024",
          content:
            "All residents are invited to attend the quarterly barangay assembly meeting. Important community matters will be discussed including the upcoming infrastructure projects and budget allocation.",
          type: "announcement",
          priority: "high",
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          author: "Barangay Captain",
          read: false,
          category: "Community",
        },
        {
          id: "news-2",
          title: "Free Medical Check-up Program",
          content:
            "The barangay health center will conduct free medical check-ups for senior citizens and children under 5 years old. Schedule your appointment now.",
          type: "event",
          priority: "medium",
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          author: "Health Center",
          read: false,
          category: "Health",
        },
        {
          id: "news-3",
          title: "Road Maintenance Schedule",
          content:
            "Road maintenance activities will be conducted on Main Street from December 10-12. Expect traffic delays and use alternative routes.",
          type: "alert",
          priority: "medium",
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          author: "Public Works",
          read: false,
          category: "Infrastructure",
        },
        {
          id: "news-4",
          title: "Christmas Festival 2024",
          content:
            "Join us for the annual Christmas festival on December 20th at the barangay plaza. There will be games, food stalls, and entertainment for the whole family.",
          type: "event",
          priority: "low",
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          author: "Events Committee",
          read: false,
          category: "Events",
        },
        {
          id: "news-5",
          title: "New Online Services Available",
          content:
            "Residents can now request barangay clearance and other certificates online through our digital portal. Visit the website to get started.",
          type: "news",
          priority: "medium",
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          author: "IT Department",
          read: false,
          category: "Technology",
        },
      ]

      setNews(sampleNews)
    } catch (error) {
      console.error("Error loading news:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = (newsId: string) => {
    setReadItems((prev) => [...prev, newsId])
  }

  const markAsUnread = (newsId: string) => {
    setReadItems((prev) => prev.filter((id) => id !== newsId))
  }

  const getTypeIcon = (type: NewsItem["type"]) => {
    switch (type) {
      case "announcement":
        return Megaphone
      case "alert":
        return AlertTriangle
      case "event":
        return Calendar
      case "news":
        return Info
      default:
        return Info
    }
  }

  const getPriorityColor = (priority: NewsItem["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }
  }

  const filteredNews = news.filter((item) => {
    if (filter === "all") return true
    if (filter === "unread") return !readItems.includes(item.id)
    return item.type === filter
  })

  const filterOptions = [
    { value: "all", label: "All News" },
    { value: "unread", label: "Unread" },
    { value: "announcement", label: "Announcements" },
    { value: "alert", label: "Alerts" },
    { value: "event", label: "Events" },
    { value: "news", label: "News" },
  ]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            News & Announcements
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadNews} className="flex items-center gap-1 bg-transparent">
              <RefreshCw className="h-3 w-3" />
              Refresh
            </Button>
          </div>
        </div>
        <CardDescription>Stay updated with the latest barangay news and announcements</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* News Items */}
        <div className="space-y-4">
          {filteredNews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No news items found for the selected filter.</p>
            </div>
          ) : (
            filteredNews.map((item) => {
              const Icon = getTypeIcon(item.type)
              const isRead = readItems.includes(item.id)

              return (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    isRead ? "bg-gray-50 opacity-75" : "bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-gray-600" />
                      <Badge className={getPriorityColor(item.priority)}>{item.priority.toUpperCase()}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => (isRead ? markAsUnread(item.id) : markAsRead(item.id))}
                    >
                      {isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  <h3 className={`font-semibold mb-2 ${isRead ? "text-gray-600" : "text-gray-900"}`}>{item.title}</h3>

                  <p className={`text-sm mb-3 ${isRead ? "text-gray-500" : "text-gray-700"}`}>{item.content}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.publishedAt)}
                      </span>
                      <span>By {item.author}</span>
                    </div>
                    {isRead && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        <span>Read</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredNews.length} of {news.length} items
            </span>
            <span>
              {readItems.length} read, {news.length - readItems.length} unread
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
