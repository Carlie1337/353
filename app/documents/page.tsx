import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Download, Printer, CheckCircle2, Clock, FileCheck } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Document Request & Tracking</h2>
          <p className="text-muted-foreground">Online request system for official barangay documents</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input placeholder="Search by name, document type, or reference number" className="max-w-sm" />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="released">Released</TabsTrigger>
          <TabsTrigger value="new">New Request</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Document Requests</CardTitle>
              <CardDescription>Review and process new document requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium">
                  <div>Reference #</div>
                  <div>Requestor</div>
                  <div>Document Type</div>
                  <div>Date Requested</div>
                  <div>Purpose</div>
                  <div>Action</div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0123</div>
                  <div>Juan Dela Cruz</div>
                  <div>Barangay Clearance</div>
                  <div>May 18, 2025</div>
                  <div>Employment</div>
                  <div className="flex gap-2">
                    <Button size="sm">Process</Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0124</div>
                  <div>Maria Santos</div>
                  <div>Certificate of Residency</div>
                  <div>May 18, 2025</div>
                  <div>School Requirement</div>
                  <div className="flex gap-2">
                    <Button size="sm">Process</Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0125</div>
                  <div>Pedro Reyes</div>
                  <div>Business Permit</div>
                  <div>May 17, 2025</div>
                  <div>Business Registration</div>
                  <div className="flex gap-2">
                    <Button size="sm">Process</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processing Document Requests</CardTitle>
              <CardDescription>Document requests currently being processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium">
                  <div>Reference #</div>
                  <div>Requestor</div>
                  <div>Document Type</div>
                  <div>Date Requested</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0120</div>
                  <div>Ana Reyes</div>
                  <div>Barangay ID</div>
                  <div>May 16, 2025</div>
                  <div>
                    <Badge className="bg-amber-500">Processing</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0121</div>
                  <div>Carlos Mendoza</div>
                  <div>Certificate of Indigency</div>
                  <div>May 16, 2025</div>
                  <div>
                    <Badge className="bg-amber-500">Processing</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Document Requests</CardTitle>
              <CardDescription>Document requests approved and ready for release</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium">
                  <div>Reference #</div>
                  <div>Requestor</div>
                  <div>Document Type</div>
                  <div>Date Approved</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0118</div>
                  <div>Elena Gomez</div>
                  <div>Barangay Clearance</div>
                  <div>May 15, 2025</div>
                  <div>
                    <Badge className="bg-green-500">Approved</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0119</div>
                  <div>Roberto Santos</div>
                  <div>Certificate of Residency</div>
                  <div>May 15, 2025</div>
                  <div>
                    <Badge className="bg-green-500">Approved</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="released" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Released Documents</CardTitle>
              <CardDescription>Document requests that have been released to requestors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium">
                  <div>Reference #</div>
                  <div>Requestor</div>
                  <div>Document Type</div>
                  <div>Date Released</div>
                  <div>Released By</div>
                  <div>Action</div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0115</div>
                  <div>Miguel Lopez</div>
                  <div>Barangay Clearance</div>
                  <div>May 14, 2025</div>
                  <div>Juan Tanod</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileCheck className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 p-4 border-t items-center">
                  <div>DOC-2025-0116</div>
                  <div>Sofia Garcia</div>
                  <div>Business Permit</div>
                  <div>May 14, 2025</div>
                  <div>Maria Clerk</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileCheck className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Document Request</CardTitle>
              <CardDescription>Submit a new document request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select>
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clearance">Barangay Clearance</SelectItem>
                      <SelectItem value="residency">Certificate of Residency</SelectItem>
                      <SelectItem value="indigency">Certificate of Indigency</SelectItem>
                      <SelectItem value="id">Barangay ID</SelectItem>
                      <SelectItem value="business">Business Permit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="school">School Requirement</SelectItem>
                      <SelectItem value="bank">Bank Requirement</SelectItem>
                      <SelectItem value="business">Business Registration</SelectItem>
                      <SelectItem value="police">Police Clearance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requestor-name">Requestor Name</Label>
                  <Input id="requestor-name" placeholder="Enter full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-number">Contact Number</Label>
                  <Input id="contact-number" placeholder="Enter contact number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup-method">Pickup Method</Label>
                  <Select>
                    <SelectTrigger id="pickup-method">
                      <SelectValue placeholder="Select pickup method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Pickup at Barangay Office</SelectItem>
                      <SelectItem value="delivery">Delivery (Additional Fee)</SelectItem>
                      <SelectItem value="email">Email (Digital Copy)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Required Documents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <Label htmlFor="id-upload" className="block mb-2">
                      Valid ID (Front)
                    </Label>
                    <Input id="id-upload" type="file" />
                  </div>
                  <div className="border rounded-md p-4">
                    <Label htmlFor="id-back-upload" className="block mb-2">
                      Valid ID (Back)
                    </Label>
                    <Input id="id-back-upload" type="file" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Input id="additional-notes" placeholder="Any additional information or special requests" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Clock className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
