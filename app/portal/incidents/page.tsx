import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, FileText, MapPin, ShieldAlert, Upload } from "lucide-react"
import Link from "next/link"

export default function IncidentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Incident & Complaint Reporting</h2>
          <p className="text-muted-foreground">Report issues affecting the community and track their resolution</p>
        </div>
        <Button asChild>
          <Link href="/portal/incidents?tab=new">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Report Incident
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="my-reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          <TabsTrigger value="community">Community Reports</TabsTrigger>
          <TabsTrigger value="new">New Report</TabsTrigger>
        </TabsList>

        <TabsContent value="my-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Incident Reports</CardTitle>
              <CardDescription>Track the status of your submitted reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div>Reference #</div>
                  <div>Type</div>
                  <div>Date Reported</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>

                <div className="grid grid-cols-5 p-4 border-t items-center">
                  <div>INC-2025-0045</div>
                  <div>Street Light Outage</div>
                  <div>May 15, 2025</div>
                  <div>
                    <Badge className="bg-amber-500">In Progress</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-5 p-4 border-t items-center">
                  <div>INC-2025-0032</div>
                  <div>Garbage Collection</div>
                  <div>May 10, 2025</div>
                  <div>
                    <Badge className="bg-green-500">Resolved</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-5 p-4 border-t items-center">
                  <div>INC-2025-0018</div>
                  <div>Noise Complaint</div>
                  <div>May 5, 2025</div>
                  <div>
                    <Badge className="bg-green-500">Resolved</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Reports</CardTitle>
              <CardDescription>Recent incidents reported in your community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Broken Water Pipe</h3>
                    <p className="text-sm text-muted-foreground">Reported by: Anonymous • May 18, 2025</p>
                  </div>
                  <Badge className="bg-amber-500">In Progress</Badge>
                </div>
                <p className="text-sm">
                  Water pipe leaking on Main Street near the market. Creating puddles and affecting water pressure in
                  nearby homes.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>Main Street, near Public Market</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Illegal Dumping</h3>
                    <p className="text-sm text-muted-foreground">Reported by: Maria Santos • May 17, 2025</p>
                  </div>
                  <Badge className="bg-amber-500">In Progress</Badge>
                </div>
                <p className="text-sm">
                  Someone has been dumping construction waste in the vacant lot near Purok 2. Environmental hazard and
                  eyesore for residents.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>Vacant lot, Purok 2</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Stray Dogs</h3>
                    <p className="text-sm text-muted-foreground">Reported by: Pedro Reyes • May 16, 2025</p>
                  </div>
                  <Badge className="bg-green-500">Resolved</Badge>
                </div>
                <p className="text-sm">
                  Pack of stray dogs near the elementary school posing risk to children. Need animal control assistance.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>Near Elementary School, Purok 3</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report New Incident</CardTitle>
              <CardDescription>Submit details about an issue affecting the community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="incident-type">Incident Type</Label>
                <Select>
                  <SelectTrigger id="incident-type">
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure Issue</SelectItem>
                    <SelectItem value="safety">Safety Concern</SelectItem>
                    <SelectItem value="noise">Noise Complaint</SelectItem>
                    <SelectItem value="sanitation">Sanitation Problem</SelectItem>
                    <SelectItem value="animal">Animal Control</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident-title">Title</Label>
                <Input id="incident-title" placeholder="Brief title of the incident" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident-description">Description</Label>
                <Textarea
                  id="incident-description"
                  placeholder="Provide detailed information about the incident"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Where did this occur?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-time">Date & Time</Label>
                  <Input id="date-time" type="datetime-local" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Photos</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-2">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Take Photo</p>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload Photo</p>
                    <Input id="photo-upload" type="file" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select>
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Not urgent</SelectItem>
                    <SelectItem value="medium">Medium - Needs attention soon</SelectItem>
                    <SelectItem value="high">High - Urgent issue</SelectItem>
                    <SelectItem value="critical">Critical - Immediate action required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="anonymous" />
                  <Label htmlFor="anonymous">Submit anonymously</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your identity will not be visible to other residents, but barangay officials will still be able to
                  contact you if needed.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Submit Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
