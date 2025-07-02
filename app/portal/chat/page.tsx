import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Users, Hash, Pin, Search } from "lucide-react"

export default function CommunityChat() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Community Chat & Forum</h2>
          <p className="text-muted-foreground">Connect and communicate with your neighbors</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Topic
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Hash className="mr-2 h-4 w-4" />
                General Discussion
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Hash className="mr-2 h-4 w-4" />
                Announcements
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Hash className="mr-2 h-4 w-4" />
                Buy & Sell
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Hash className="mr-2 h-4 w-4" />
                Lost & Found
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Hash className="mr-2 h-4 w-4" />
                Community Events
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Online Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <span className="text-sm">Juan Dela Cruz</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <span className="text-sm">Maria Santos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>PR</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <span className="text-sm">Pedro Reyes</span>
              </div>
              <div className="text-xs text-muted-foreground">+12 more online</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General Discussion</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="marketplace">Buy & Sell</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-5 w-5" />
                    <CardTitle className="text-lg">General Discussion</CardTitle>
                    <Badge variant="outline">
                      <Users className="mr-1 h-3 w-3" />
                      45 online
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pinned Message */}
                  <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-r-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Pin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Pinned Message</span>
                    </div>
                    <p className="text-sm">
                      Welcome to the Barangay Mabuhay community chat! Please be respectful and follow community
                      guidelines.
                    </p>
                  </div>

                  {/* Chat Messages */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">Maria Santos</span>
                          <span className="text-xs text-muted-foreground">2 minutes ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Good morning everyone! Has anyone seen the street sweeper today? I noticed some areas in Purok
                          3 haven't been cleaned yet.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>PR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">Pedro Reyes</span>
                          <span className="text-xs text-muted-foreground">5 minutes ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          @Maria Santos I think they're starting from Purok 1 today. Should reach Purok 3 by afternoon.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">Ana Garcia</span>
                          <span className="text-xs text-muted-foreground">10 minutes ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Thank you to everyone who participated in yesterday's cleanup drive! We collected over 50 bags
                          of trash. 🎉
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">Juan Dela Cruz</span>
                          <span className="text-xs text-muted-foreground">15 minutes ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Reminder: Basketball court will be closed tomorrow for maintenance. Alternative court
                          available at the elementary school.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex items-center space-x-2 pt-4 border-t">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Hash className="h-5 w-5" />
                    <CardTitle className="text-lg">Official Announcements</CardTitle>
                    <Badge variant="outline">Read Only</Badge>
                  </div>
                  <CardDescription>Official announcements from barangay officials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">BC</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">Barangay Captain</span>
                        <Badge className="bg-blue-600">Official</Badge>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm">
                        📢 COVID-19 Vaccination Drive scheduled for May 25-27, 2025 at the Barangay Health Center. Free
                        booster shots available for all residents. Please bring valid ID and vaccination card.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">BC</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">Barangay Captain</span>
                        <Badge className="bg-blue-600">Official</Badge>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm">
                        🗓️ Quarterly Barangay Assembly on May 28, 2025 at 2:00 PM. All residents are encouraged to
                        attend. Agenda includes budget presentation and community projects update.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marketplace" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Hash className="h-5 w-5" />
                    <CardTitle className="text-lg">Buy & Sell</CardTitle>
                    <Badge variant="outline">
                      <Users className="mr-1 h-3 w-3" />
                      23 online
                    </Badge>
                  </div>
                  <CardDescription>Community marketplace for buying and selling items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">LM</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">Lisa Martinez</span>
                        <Badge variant="outline">Selling</Badge>
                        <span className="text-xs text-muted-foreground">30 minutes ago</span>
                      </div>
                      <p className="text-sm mb-2">
                        🏠 <strong>For Sale:</strong> Slightly used refrigerator, 2 years old, excellent condition.
                        ₱15,000 negotiable. Contact me at 09123456789.
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Message Seller
                        </Button>
                        <Button size="sm" variant="outline">
                          ❤️ 3
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">RT</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">Roberto Torres</span>
                        <Badge variant="outline">Looking For</Badge>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="text-sm mb-2">
                        🔍 <strong>Looking for:</strong> Bicycle for my 10-year-old son. Preferably mountain bike type.
                        Budget: ₱3,000-5,000. Please message me if you have one available.
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          💬 2 replies
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">CL</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">Carmen Lopez</span>
                        <Badge variant="outline">Service</Badge>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm mb-2">
                        ✂️ <strong>Service Offered:</strong> Hair cutting and styling at home. ₱100 for basic cut, ₱200
                        for styling. Available weekends. Call 09987654321.
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Book Service
                        </Button>
                        <Button size="sm" variant="outline">
                          ⭐ 4.8 (12 reviews)
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex items-center space-x-2 pt-4 border-t">
                    <Input placeholder="Post an item for sale or service..." className="flex-1" />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
