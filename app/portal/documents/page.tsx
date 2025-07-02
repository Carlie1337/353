import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Download, Clock, AlertCircle, Upload } from "lucide-react"

export default function ResidentDocumentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Document Requests</h2>
          <p className="text-muted-foreground">Track and manage your document requests</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <Tabs defaultValue="my-requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="new-request">New Request</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="my-requests" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Barangay Clearance</CardTitle>
                    <CardDescription>Reference: DOC-2025-0123</CardDescription>
                  </div>
                  <Badge className="bg-amber-500">Processing</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span>Employment</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date Requested:</span>
                    <span>May 18, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Completion:</span>
                    <span>May 20, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee:</span>
                    <span>₱50.00</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Track Status
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Certificate of Residency</CardTitle>
                    <CardDescription>Reference: DOC-2025-0110</CardDescription>
                  </div>
                  <Badge className="bg-green-500">Ready for Pickup</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span>School Requirement</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date Completed:</span>
                    <span>May 15, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pickup Location:</span>
                    <span>Barangay Hall</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee:</span>
                    <span>₱30.00 (Paid)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Digital Copy
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="new-request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request New Document</CardTitle>
              <CardDescription>Fill out the form to request a new document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clearance">Barangay Clearance</SelectItem>
                      <SelectItem value="residency">Certificate of Residency</SelectItem>
                      <SelectItem value="indigency">Certificate of Indigency</SelectItem>
                      <SelectItem value="id">Barangay ID</SelectItem>
                      <SelectItem value="business">Business Permit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select>
                    <SelectTrigger>
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
                  <Label htmlFor="pickup-method">Pickup Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Pickup at Barangay Office</SelectItem>
                      <SelectItem value="delivery">Home Delivery (+₱20)</SelectItem>
                      <SelectItem value="email">Email (Digital Copy)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="Enter contact number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Textarea id="additional-notes" placeholder="Any special instructions or requests" />
              </div>

              <div className="space-y-2">
                <Label>Required Documents</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Button variant="outline">Upload Valid ID</Button>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Upload front and back of valid ID (Max 5MB each)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Requirements & Fees</CardTitle>
              <CardDescription>Requirements and processing fees for each document type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Barangay Clearance</h3>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Fee:</strong> ₱50.00
                    </p>
                    <p>
                      <strong>Processing Time:</strong> 2-3 business days
                    </p>
                    <p>
                      <strong>Requirements:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Valid ID (front and back)</li>
                      <li>Proof of residency</li>
                      <li>Cedula (if available)</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Certificate of Residency</h3>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Fee:</strong> ₱30.00
                    </p>
                    <p>
                      <strong>Processing Time:</strong> 1-2 business days
                    </p>
                    <p>
                      <strong>Requirements:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Valid ID (front and back)</li>
                      <li>Proof of residency (utility bill, lease contract)</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Certificate of Indigency</h3>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Fee:</strong> Free
                    </p>
                    <p>
                      <strong>Processing Time:</strong> 2-3 business days
                    </p>
                    <p>
                      <strong>Requirements:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Valid ID (front and back)</li>
                      <li>Proof of income (if any)</li>
                      <li>Barangay interview may be required</li>
                    </ul>
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
