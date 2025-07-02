import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Info, Phone, MapPin, Users, Building, Heart, Shield } from "lucide-react"

export default function InfoCenterPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Barangay Information Center</h2>
          <p className="text-muted-foreground">Essential information about Barangay Mabuhay</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="officials">Officials</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Population</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,432</div>
                <p className="text-xs text-muted-foreground">+2.1% from last year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Households</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">Across 5 puroks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Land Area</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5</div>
                <p className="text-xs text-muted-foreground">Square kilometers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Established</CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1952</div>
                <p className="text-xs text-muted-foreground">73 years ago</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About Barangay Mabuhay</CardTitle>
              <CardDescription>Learn about our community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Barangay Mabuhay is a vibrant community located in the heart of Mabuhay City. Established in 1952, our
                barangay has grown from a small farming community to a thriving residential area that balances modern
                development with traditional Filipino values.
              </p>
              <p>
                Our community is known for its strong sense of unity, active civic participation, and commitment to
                environmental sustainability. We take pride in our clean streets, well-maintained facilities, and the
                warm hospitality of our residents.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Modern health center with 24/7 emergency services</li>
                    <li>• Well-equipped elementary school</li>
                    <li>• Public market and commercial areas</li>
                    <li>• Basketball courts and recreational facilities</li>
                    <li>• Efficient waste management system</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Community Programs:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Monthly cleanup drives</li>
                    <li>• Skills training and livelihood programs</li>
                    <li>• Senior citizen assistance</li>
                    <li>• Youth development activities</li>
                    <li>• Emergency preparedness training</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="officials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Barangay Officials</CardTitle>
              <CardDescription>Meet your elected representatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Hon. Ricardo M. Santos</h3>
                      <p className="text-sm text-muted-foreground">Barangay Captain</p>
                      <p className="text-xs text-muted-foreground">Term: 2022-2025</p>
                    </div>
                    <Badge>Captain</Badge>
                  </div>
                  <p className="text-sm mt-3 text-muted-foreground">
                    Leading the barangay with over 15 years of public service experience. Focused on community
                    development and transparent governance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Hon. Maria L. Garcia</h4>
                        <p className="text-sm text-muted-foreground">Barangay Kagawad</p>
                        <p className="text-xs text-muted-foreground">Committee on Health</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Hon. Pedro A. Reyes</h4>
                        <p className="text-sm text-muted-foreground">Barangay Kagawad</p>
                        <p className="text-xs text-muted-foreground">Committee on Infrastructure</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Hon. Ana C. Lopez</h4>
                        <p className="text-sm text-muted-foreground">Barangay Kagawad</p>
                        <p className="text-xs text-muted-foreground">Committee on Education</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Hon. Carlos D. Martinez</h4>
                        <p className="text-sm text-muted-foreground">Barangay Kagawad</p>
                        <p className="text-xs text-muted-foreground">Committee on Peace & Order</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Ms. Elena R. Cruz</h3>
                      <p className="text-sm text-muted-foreground">Barangay Secretary</p>
                      <p className="text-xs text-muted-foreground">Administrative Officer</p>
                    </div>
                    <Badge variant="outline">Secretary</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-blue-600" />
                  Administrative Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Barangay Clearance</span>
                    <Badge variant="outline">₱50</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Certificate of Residency</span>
                    <Badge variant="outline">₱30</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Certificate of Indigency</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Barangay ID</span>
                    <Badge variant="outline">₱100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Business Permit</span>
                    <Badge variant="outline">₱200</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-600" />
                  Health Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">General Consultation</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vaccination</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maternal Care</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Senior Citizen Care</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Services</span>
                    <Badge variant="outline">24/7</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-600" />
                  Peace & Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Barangay Tanod Patrol</span>
                    <Badge variant="outline">24/7</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Incident Reporting</span>
                    <Badge variant="outline">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mediation Services</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CCTV Monitoring</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Response</span>
                    <Badge variant="outline">911</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-600" />
                  Community Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Skills Training</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Senior Citizen Assistance</span>
                    <Badge variant="outline">Monthly</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Youth Development</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Environmental Programs</span>
                    <Badge variant="outline">Monthly</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Preparedness</span>
                    <Badge variant="outline">Quarterly</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Barangay Hall</h4>
                    <p className="text-sm text-muted-foreground">(02) 123-4567</p>
                    <p className="text-sm text-muted-foreground">barangay.mabuhay@city.gov.ph</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Health Center</h4>
                    <p className="text-sm text-muted-foreground">(02) 123-4568</p>
                    <p className="text-sm text-muted-foreground">health.mabuhay@city.gov.ph</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Emergency Hotline</h4>
                    <p className="text-sm text-muted-foreground font-bold text-red-600">911</p>
                    <p className="text-sm text-muted-foreground">(02) 123-4569</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Barangay Tanod</h4>
                    <p className="text-sm text-muted-foreground">(02) 123-4570</p>
                    <p className="text-sm text-muted-foreground">09123456789</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Location & Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-sm text-muted-foreground">
                    123 Main Street
                    <br />
                    Barangay Mabuhay
                    <br />
                    Mabuhay City, Metro Manila
                    <br />
                    Philippines 1234
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Office Hours</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>8:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency:</span>
                      <span className="text-red-600 font-medium">24/7</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>History of Barangay Mabuhay</CardTitle>
              <CardDescription>Our journey through the years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium">1952 - Foundation</h3>
                  <p className="text-sm text-muted-foreground">
                    Barangay Mabuhay was officially established as a small farming community with just 50 families. The
                    area was primarily agricultural, known for its rice fields and vegetable gardens.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium">1970s - Growth Period</h3>
                  <p className="text-sm text-muted-foreground">
                    The community began to expand as more families moved to the area. The first elementary school was
                    built, and basic infrastructure like roads and water systems were established.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-medium">1990s - Modernization</h3>
                  <p className="text-sm text-muted-foreground">
                    Major infrastructure improvements were made, including the construction of the current barangay
                    hall, health center, and public market. The population grew to over 2,000 residents.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-medium">2000s - Technology Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Introduction of modern communication systems, CCTV monitoring, and computerized record-keeping. The
                    barangay became one of the first to implement digital services for residents.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-medium">2020s - Digital Transformation</h3>
                  <p className="text-sm text-muted-foreground">
                    Launch of the comprehensive digital management system, online services, and mobile applications. The
                    barangay now serves over 5,400 residents with modern, efficient services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
