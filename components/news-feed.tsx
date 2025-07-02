"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ArrowRight, Megaphone, FileText, AlertCircle, Info } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  category: "announcement" | "news" | "event" | "alert"
  priority: "low" | "medium" | "high" | "urgent"
  author_name: string
  author_avatar?: string
  published_at: string
  image_url?: string
  read_count: number
}

export function NewsFeed({ limit = 6 }: { limit?: number }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNews()

    // Subscribe to real-time updates
    const channel = supabase
      .channel("news_updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "news_articles" }, () => loadNews())
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .select(`
          *,
          author:users(name, avatar_url)
        `)
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(limit)

      if (!error && data) {
        const formattedNews = data.map((item) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          excerpt: item.excerpt || item.content.substring(0, 150) + "...",
          category: item.category || "news",
          priority: item.priority || "medium",
          author_name: item.author?.name || "Barangay Office",
          author_avatar: item.author?.avatar_url,
          published_at: item.published_at,
          image_url: item.image_url,
          read_count: item.read_count || 0,
        }))
        setNews(formattedNews)
      }
    } catch (error) {
      console.error("Error loading news:", error)
      // Fallback news data
      setNews([
        {
          id: "1",
          title: "New Online Services Now Available",
          content: "Residents can now access document requests, appointment booking, and other services online 24/7.",
          excerpt: "Residents can now access document requests, appointment booking, and other services online 24/7.",
          category: "announcement",
          priority: "high",
          author_name: "Barangay Captain",
          published_at: new Date().toISOString(),
          read_count: 245,
        },
        {
          id: "2",
          title: "Community Health Program Launch",
          content: "Free health checkups and vaccination programs are now available at the barangay health center.",
          excerpt: "Free health checkups and vaccination programs are now available at the barangay health center.",
          category: "news",
          priority: "medium",
          author_name: "Health Officer",
          published_at: new Date(Date.now() - 86400000).toISOString(),
          read_count: 189,
        },
        {
          id: "3",
          title: "Monthly Community Meeting",
          content: "Join us for our monthly community meeting to discuss local issues and upcoming projects.",
          excerpt: "Join us for our monthly community meeting to discuss local issues and upcoming projects.",
          category: "event",
          priority: "medium",
          author_name: "Secretary",
          published_at: new Date(Date.now() - 172800000).toISOString(),
          read_count: 156,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "announcement":
        return <Megaphone className="h-4 w-4" />
      case "news":
        return <FileText className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "alert":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement":
        return "bg-blue-100 text-blue-800"
      case "news":
        return "bg-green-100 text-green-800"
      case "event":
        return "bg-purple-100 text-purple-800"
      case "alert":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-4 border-red-500"
      case "high":
        return "border-l-4 border-orange-500"
      case "medium":
        return "border-l-4 border-blue-500"
      case "low":
        return "border-l-4 border-gray-300"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Latest News & Updates</h2>
        <Link href="/portal/bulletin">
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card
            key={item.id}
            className={`hover:shadow-lg transition-shadow cursor-pointer ${getPriorityBorder(item.priority)}`}
          >
            {item.image_url && (
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(item.category)}>
                  {getCategoryIcon(item.category)}
                  <span className="ml-1 capitalize">{item.category}</span>
                </Badge>
                <div className="text-xs text-gray-500">{item.read_count} reads</div>
              </div>
              <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">{item.excerpt}</CardDescription>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.author_avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{item.author_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-500">{item.author_name}</span>
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(item.published_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No news available</h3>
          <p className="text-gray-500">Check back later for updates and announcements.</p>
        </div>
      )}
    </div>
  )
}
