"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Radio,
  MessageSquare,
  Phone,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle,
  Circle,
  Zap,
  Signal,
} from "lucide-react"

interface RadioChannel {
  id: string
  name: string
  frequency: string
  status: "active" | "inactive" | "emergency"
  users: number
  description: string
}

interface Message {
  id: string
  sender: string
  recipient: string
  content: string
  timestamp: string
  type: "text" | "voice" | "emergency"
  status: "sent" | "delivered" | "read"
  priority: "low" | "normal" | "high" | "emergency"
}

interface Contact {
  id: string
  name: string
  callSign: string
  unit: string
  status: "online" | "offline" | "busy" | "emergency"
  lastSeen: string
}

export default function CommunicationPage() {
  const [selectedChannel, setSelectedChannel] = useState<string>("CH001")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isMicOn, setIsMicOn] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [activeTab, setActiveTab] = useState("radio")

  const radioChannels: RadioChannel[] = [
    {
      id: "CH001",
      name: "Main Dispatch",
      frequency: "462.550 MHz",
      status: "active",
      users: 8,
      description: "Primary communication channel for all units",
    },
    {
      id: "CH002",
      name: "Emergency Response",
      frequency: "462.575 MHz",
      status: "emergency",
      users: 3,
      description: "Emergency situations and urgent communications",
    },
    {
      id: "CH003",
      name: "Patrol Units",
      frequency: "462.600 MHz",
      status: "active",
      users: 5,
      description: "Patrol coordination and routine communications",
    },
    {
      id: "CH004",
      name: "Command Center",
      frequency: "462.625 MHz",
      status: "active",
      users: 2,
      description: "Command staff and supervisory communications",
    },
  ]

  const contacts: Contact[] = [
    {
      id: "CONT001",
      name: "Officer Santos",
      callSign: "Alpha-1",
      unit: "Patrol Unit 1",
      status: "online",
      lastSeen: "now",
    },
    {
      id: "CONT002",
      name: "Officer Cruz",
      callSign: "Bravo-2",
      unit: "Patrol Unit 2",
      status: "online",
      lastSeen: "2 minutes ago",
    },
    {
      id: "CONT003",
      name: "Officer Reyes",
      callSign: "Charlie-3",
      unit: "Emergency Response",
      status: "emergency",
      lastSeen: "now",
    },
    {
      id: "CONT004",
      name: "Dispatcher Garcia",
      callSign: "Base-1",
      unit: "Command Center",
      status: "online",
      lastSeen: "1 minute ago",
    },
    {
      id: "CONT005",
      name: "Officer Dela Cruz",
      callSign: "Delta-4",
      unit: "Patrol Unit 4",
      status: "offline",
      lastSeen: "30 minutes ago",
    },
  ]

  const messages: Message[] = [
    {
      id: "MSG001",
      sender: "Alpha-1",
      recipient: "Base-1",
      content: "Patrol complete for Sector 1, all clear",
      timestamp: "10:30 AM",
      type: "text",
      status: "read",
      priority: "normal",
    },
    {
      id: "MSG002",
      sender: "Charlie-3",
      recipient: "All Units",
      content: "Emergency response needed at Market Area - possible disturbance",
      timestamp: "10:25 AM",
      type: "text",
      status: "delivered",
      priority: "emergency",
    },
    {
      id: "MSG003",
      sender: "Base-1",
      recipient: "All Units",
      content: "Weather alert: Heavy rain expected this afternoon, exercise caution",
      timestamp: "10:20 AM",
      type: "text",
      status: "read",
      priority: "high",
    },
    {
      id: "MSG004",
      sender: "Bravo-2",
      recipient: "Base-1",
      content: "Requesting backup at School Zone - crowd control needed",
      timestamp: "10:15 AM",
      type: "text",
      status: "read",
      priority: "high",
    },
  ]

  const getChannelStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "emergency":
        return "destructive"
      case "inactive":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getContactStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-600"
      case "emergency":
        return "text-red-600"
      case "busy":
        return "text-yellow-600"
      case "offline":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const getContactStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Circle className="h-3 w-3 fill-current" />
      case "emergency":
        return <AlertTriangle className="h-3 w-3" />
      case "busy":
        return <Circle className="h-3 w-3 fill-current" />
      case "offline":
        return <Circle className="h-3 w-3" />
      default:
        return <Circle className="h-3 w-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "border-l-red-500 bg-red-50"
      case "high":
        return "border-l-orange-500 bg-orange-50"
      case "normal":
        return "border-l-blue-500 bg-blue-50"
      case "low":
        return "border-l-gray-500 bg-gray-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
  }

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Communication Hub</h1>
          <p className="text-gray-600 mt-1">Radio communication and messaging system</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 justify-center">
            <Radio className="h-3 w-3 mr-1" />
            Radio Online
          </Badge>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergency Alert
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Channels</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">3</p>
              </div>
              <Radio className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online Users</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">18</p>
              </div>
              <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Today</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">47</p>
              </div>
              <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Signal Strength</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">95%</p>
              </div>
              <Signal className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Communication Area */}
        <div className="lg:col-span-3 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="radio">Radio</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="radio" className="space-y-4">
              {/* Radio Controls */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Radio className="h-5 w-5" />
                        Radio Communication
                      </CardTitle>
                      <CardDescription>Select channel and communicate with units</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={isMicOn ? "default" : "outline"}
                        size="sm"
                        onClick={toggleMic}
                        className={isMicOn ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        {isMicOn ? "ON AIR" : "PTT"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={toggleSpeaker}>
                        {isSpeakerOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Channel Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {radioChannels.map((channel) => (
                        <div
                          key={channel.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedChannel === channel.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedChannel(channel.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={getChannelStatusColor(channel.status)} className="text-xs">
                              {channel.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{channel.users} users</span>
                          </div>
                          <h3 className="font-medium text-sm">{channel.name}</h3>
                          <p className="text-xs text-gray-500">{channel.frequency}</p>
                        </div>
                      ))}
                    </div>

                    {/* Active Channel Info */}
                    {selectedChannel && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{radioChannels.find((ch) => ch.id === selectedChannel)?.name}</h3>
                          <Badge variant="default" className="bg-green-600">
                            <Circle className="h-3 w-3 mr-1 fill-current" />
                            ACTIVE
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {radioChannels.find((ch) => ch.id === selectedChannel)?.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>
                            <strong>Frequency:</strong>{" "}
                            {radioChannels.find((ch) => ch.id === selectedChannel)?.frequency}
                          </span>
                          <span>
                            <strong>Users:</strong> {radioChannels.find((ch) => ch.id === selectedChannel)?.users}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Push-to-Talk */}
                    <div className="text-center">
                      <Button
                        size="lg"
                        className={`w-32 h-32 rounded-full text-lg font-bold ${
                          isMicOn ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        onMouseDown={toggleMic}
                        onMouseUp={toggleMic}
                        onTouchStart={toggleMic}
                        onTouchEnd={toggleMic}
                      >
                        {isMicOn ? (
                          <>
                            <Mic className="h-8 w-8 mb-2" />
                            ON AIR
                          </>
                        ) : (
                          <>
                            <Radio className="h-8 w-8 mb-2" />
                            PUSH TO TALK
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        {isMicOn ? "Release to stop transmitting" : "Hold to transmit"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Text Messages
                  </CardTitle>
                  <CardDescription>Send and receive text messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Message Composition */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Units</SelectItem>
                            {contacts
                              .filter((c) => c.status !== "offline")
                              .map((contact) => (
                                <SelectItem key={contact.id} value={contact.callSign}>
                                  {contact.callSign} - {contact.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                          rows={3}
                        />
                        <Button onClick={handleSendMessage} className="self-end">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="space-y-3">
                      <h3 className="font-medium">Recent Messages</h3>
                      <ScrollArea className="h-64 w-full">
                        <div className="space-y-3">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`p-3 border-l-4 rounded-r-lg ${getPriorityColor(message.priority)}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{message.sender}</span>
                                  <span className="text-xs text-gray-500">→ {message.recipient}</span>
                                  {message.priority === "emergency" && (
                                    <Badge variant="destructive" className="text-xs">
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      EMERGENCY
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  {message.timestamp}
                                </div>
                              </div>
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {message.type}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  {message.status === "read" && <CheckCircle className="h-3 w-3 text-green-600" />}
                                  {message.status === "delivered" && <CheckCircle className="h-3 w-3 text-blue-600" />}
                                  {message.status === "sent" && <Circle className="h-3 w-3" />}
                                  {message.status}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Emergency Communications
                  </CardTitle>
                  <CardDescription>Emergency alerts and priority communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Emergency Alert Button */}
                    <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
                      <Button size="lg" variant="destructive" className="w-48 h-16 text-lg font-bold">
                        <Zap className="h-6 w-6 mr-2" />
                        EMERGENCY ALERT
                      </Button>
                      <p className="text-sm text-red-600 mt-2">
                        Press to send emergency alert to all units and command center
                      </p>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h3 className="font-medium">Emergency Contacts</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Phone className="h-4 w-4 mr-2" />
                            Command Center: 911
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Phone className="h-4 w-4 mr-2" />
                            Police Station: (082) 123-4567
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Phone className="h-4 w-4 mr-2" />
                            Fire Department: (082) 234-5678
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Phone className="h-4 w-4 mr-2" />
                            Medical Emergency: (082) 345-6789
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-medium">Quick Actions</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start text-red-600 bg-transparent">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Report Incident
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-orange-600 bg-transparent">
                            <Users className="h-4 w-4 mr-2" />
                            Request Backup
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-blue-600 bg-transparent">
                            <Radio className="h-4 w-4 mr-2" />
                            Emergency Broadcast
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-purple-600 bg-transparent">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Mass Alert
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Contacts Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contacts
              </CardTitle>
              <CardDescription>Available personnel and units</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full">
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedContact === contact.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{contact.name}</span>
                            <div className={`flex items-center gap-1 ${getContactStatusColor(contact.status)}`}>
                              {getContactStatusIcon(contact.status)}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">{contact.callSign}</p>
                          <p className="text-xs text-gray-500">{contact.unit}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{contact.status}</span>
                        <span>{contact.lastSeen}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
