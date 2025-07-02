import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, MapPin, CheckCircle2, AlertTriangle, Camera } from "lucide-react"

export default function ServiceRequestsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Service Requests</h2>
          <p className="text-muted-foreground">Request maintenance and community services</p>
        </div>
        <Button>
          <Wrench className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <Tabs defaultValue="my-requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="new-request">New Request</TabsTrigger>
          <TabsTrigger value="community">Community Board</TabsTrigger>
        </TabsList>

        <TabsContent value="my-requests" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Street Light Repair</CardTitle>
                    <CardDescription>Reference: SVC-2025-0045</CardDescription>
                  </div>
                  <Badge className="bg-amber-500">In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span>Corner of Main St. & Oak Ave.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date Reported:</span>
                    <span>May 16, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Priority:</span>
                    <span>Medium</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Assigned To:</span>
                    <span>Maintenance Team A</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Street light has been flickering for several days and completely went out yesterday evening.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Updates
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Pothole Repair</CardTitle>
                    <CardDescription>Reference: SVC-2025-0038</CardDescription>
                  </div>
                  <Badge className="bg-green-500">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span>Purok 3, near Elementary School</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date Completed:</span>
                    <span>May 14, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed By:</span>
                    <span>Road Maintenance Crew</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Rate Service
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="new-request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Service Request</CardTitle>
              <CardDescription>Report issues or request services in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="road">Road Maintenance</SelectItem>
                      <SelectItem value="lighting">Street Lighting</SelectItem>
                      <SelectItem value="drainage">Drainage/Sewerage</SelectItem>
                      <SelectItem value="garbage">Garbage Collection</SelectItem>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="electrical">Electrical Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait</SelectItem>
                      <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                      <SelectItem value="high">High - Needs immediate attention</SelectItem>
                      <SelectItem value="emergency">Emergency - Safety hazard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Provide specific location (street, purok, landmarks)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="Your contact number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred-time">Preferred Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="When can we contact you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 8PM)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue or service needed in detail"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Photo Evidence (Optional)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Button variant="outline">Upload Photos</Button>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Upload photos to help us understand the issue better
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Wrench className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Service Board</CardTitle>
              <CardDescription>See what services are being requested in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">Drainage Cleaning - Purok 2</h3>
                      <p className="text-sm text-muted-foreground">Reported by: Maria Santos</p>
                    </div>
                    <Badge variant="outline">High Priority</Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Drainage system is clogged causing water to overflow during rain. Needs immediate cleaning.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Purok 2, near Basketball Court</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                    <Button size="sm" variant="outline">
                      +1 Support (3)
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">Basketball Court Lighting</h3>
                      <p className="text-sm text-muted-foreground">Reported by: Pedro Reyes</p>
                    </div>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Basketball court lights are not working. Community requests repair for evening activities.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Central Basketball Court</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                    <Button size="sm" variant="outline">
                      +1 Support (7)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
