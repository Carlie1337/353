import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Users, MapPin, Clock, Star } from "lucide-react"

export default function AnnouncementsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Announcements & Bulletin</h2>
          <p className="text-muted-foreground">Stay updated with the latest barangay news and events</p>
        </div>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          Subscribe to Notifications
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Announcements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="important">Important</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            <Card className="border-blue-200 dark:border-blue-900">
              <CardHeader className="bg-blue-50 dark:bg-blue-950/50">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600">PINNED</Badge>
                  <span className="text-xs text-muted-foreground">Posted: May 18, 2025</span>
                </div>
                <CardTitle className="flex items-center text-blue-700 dark:text-blue-400">
                  <Star className="mr-2 h-5 w-5" />
                  COVID-19 Vaccination Drive - May 25-27, 2025
                </CardTitle>
                <CardDescription>Free booster shots available for all residents</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p>
                    The Barangay Health Center will be conducting a free COVID-19 vaccination drive from May 25-27,
                    2025. All residents are encouraged to get their booster shots to maintain community immunity.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>May 25-27, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Barangay Health Center</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>All ages welcome</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                    <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-1">What to bring:</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Valid ID</li>
                      <li>• Vaccination card (if available)</li>
                      <li>• Face mask</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">EVENT</Badge>
                  <span className="text-xs text-muted-foreground">Posted: May 17, 2025</span>
                </div>
                <CardTitle>Barangay Cleanup Drive - May 30, 2025</CardTitle>
                <CardDescription>Community-wide environmental cleanup activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p>
                    Join our monthly community cleanup drive! Let's work together to keep our barangay clean and
                    beautiful. Volunteers will receive free breakfast and a certificate of participation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>May 30, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>7:00 AM - 10:00 AM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Barangay Plaza (Assembly Point)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>All residents welcome</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Register as Volunteer
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PROGRAM</Badge>
                  <span className="text-xs text-muted-foreground">Posted: May 15, 2025</span>
                </div>
                <CardTitle>Free Skills Training Program - June 5-10, 2025</CardTitle>
                <CardDescription>Learn new skills to improve your livelihood opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p>
                    The barangay is offering free skills training in partnership with TESDA. Available courses include
                    basic computer literacy, food processing, and basic electronics repair.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>June 5-10, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Barangay Multi-Purpose Hall</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Limited to 30 participants</span>
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-3">
                    <h4 className="font-medium text-green-800 dark:text-green-400 mb-1">Benefits:</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Free training materials</li>
                      <li>• Certificate upon completion</li>
                      <li>• Job placement assistance</li>
                      <li>• Free lunch during training days</li>
                    </ul>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Apply for Training
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">NOTICE</Badge>
                  <span className="text-xs text-muted-foreground">Posted: May 12, 2025</span>
                </div>
                <CardTitle>New Garbage Collection Schedule</CardTitle>
                <CardDescription>Updated waste collection days effective June 1, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p>
                    Please be informed that the garbage collection schedule will be updated starting June 1, 2025.
                    Residents are advised to follow the new schedule to ensure proper waste collection.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                    <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-2">New Schedule:</h4>
                    <div className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <div className="flex justify-between">
                        <span>Purok 1 & 2:</span>
                        <span>Monday & Thursday</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Purok 3 & 4:</span>
                        <span>Tuesday & Friday</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Purok 5:</span>
                        <span>Wednesday & Saturday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600">UPCOMING</Badge>
                  <span className="text-xs text-muted-foreground">May 30, 2025</span>
                </div>
                <CardTitle>Barangay Cleanup Drive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Community-wide environmental cleanup activity</p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>7:00 AM - 10:00 AM</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600">UPCOMING</Badge>
                  <span className="text-xs text-muted-foreground">June 15, 2025</span>
                </div>
                <CardTitle>Barangay Fiesta 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Annual celebration with cultural shows and activities</p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>All day event</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-600">ONGOING</Badge>
                  <span className="text-xs text-muted-foreground">June 5-10, 2025</span>
                </div>
                <CardTitle>Free Skills Training Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">TESDA partnership for livelihood skills development</p>
                <div className="flex items-center mt-2 text-sm">
                  <Users className="mr-1 h-4 w-4" />
                  <span>Limited to 30 participants</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600">ACTIVE</Badge>
                  <span className="text-xs text-muted-foreground">Ongoing</span>
                </div>
                <CardTitle>Senior Citizen Assistance Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Monthly assistance for qualified senior citizens</p>
                <div className="flex items-center mt-2 text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Every 15th of the month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="important" className="space-y-4">
          <div className="space-y-4">
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader className="bg-red-50 dark:bg-red-950/50">
                <div className="flex items-center justify-between">
                  <Badge variant="destructive">URGENT</Badge>
                  <span className="text-xs text-muted-foreground">May 18, 2025</span>
                </div>
                <CardTitle className="text-red-700 dark:text-red-400">Water Service Interruption Notice</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>
                  Water service will be temporarily interrupted on May 22, 2025, from 8:00 AM to 6:00 PM for maintenance
                  work on the main pipeline.
                </p>
                <div className="mt-3 text-sm">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>Affected areas: All puroks</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 dark:border-amber-900">
              <CardHeader className="bg-amber-50 dark:bg-amber-950/50">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-600">IMPORTANT</Badge>
                  <span className="text-xs text-muted-foreground">May 15, 2025</span>
                </div>
                <CardTitle className="text-amber-700 dark:text-amber-400">Barangay Assembly Meeting</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>
                  All residents are invited to attend the quarterly barangay assembly on May 28, 2025, at 2:00 PM at the
                  Multi-Purpose Hall.
                </p>
                <div className="mt-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>May 28, 2025 - 2:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
