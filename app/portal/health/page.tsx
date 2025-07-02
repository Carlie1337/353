import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Pill, Stethoscope, Users } from "lucide-react"

export default function HealthAidPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Health & Aid Services</h2>
          <p className="text-muted-foreground">Access healthcare services and community aid programs</p>
        </div>
        <Button>
          <Heart className="mr-2 h-4 w-4" />
          Request Aid
        </Button>
      </div>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Health Services</TabsTrigger>
          <TabsTrigger value="programs">Aid Programs</TabsTrigger>
          <TabsTrigger value="schedule">Health Schedule</TabsTrigger>
          <TabsTrigger value="records">My Records</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="mr-2 h-5 w-5 text-blue-600" />
                  General Consultation
                </CardTitle>
                <CardDescription>Basic health checkup and consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Schedule:</span>
                    <span>Monday - Friday, 8AM - 5PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Barangay Health Center</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="mr-2 h-5 w-5 text-green-600" />
                  Vaccination Services
                </CardTitle>
                <CardDescription>Immunization and vaccination programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Schedule:</span>
                    <span>Tuesdays & Thursdays, 9AM - 3PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Drive:</span>
                    <span>May 25-27, 2025</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Register for Vaccination
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-600" />
                  Maternal Care
                </CardTitle>
                <CardDescription>Prenatal and postnatal care services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Schedule:</span>
                    <span>Wednesdays, 8AM - 12PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Services:</span>
                    <span>Checkup, Vitamins, Counseling</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Consultation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-600" />
                  Senior Citizen Care
                </CardTitle>
                <CardDescription>Specialized care for elderly residents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Schedule:</span>
                    <span>Fridays, 9AM - 2PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Services:</span>
                    <span>Health monitoring, Medicines</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Assistance Programs</CardTitle>
                <CardDescription>Available aid programs for qualified residents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Medical Assistance</h3>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Financial aid for medical expenses, hospitalization, and medicines for indigent families.
                    </p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Maximum Amount:</span>
                        <span>₱10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Requirements:</span>
                        <span>Medical certificate, Indigency certificate</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3">
                      Apply Now
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Emergency Food Assistance</h3>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Food packs and grocery assistance for families in crisis situations.
                    </p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span>Monthly (if qualified)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contents:</span>
                        <span>Rice, canned goods, basic necessities</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3">
                      Apply Now
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Educational Assistance</h3>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Scholarship and educational support for students from low-income families.
                    </p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Coverage:</span>
                        <span>Tuition, books, supplies</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Application Period:</span>
                        <span>June - July annually</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Center Schedule</CardTitle>
              <CardDescription>Weekly schedule of health services and programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">This Week's Schedule</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Monday:</span>
                        <span>General Consultation (8AM-5PM)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Tuesday:</span>
                        <span>Vaccination Drive (9AM-3PM)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Wednesday:</span>
                        <span>Maternal Care (8AM-12PM)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Thursday:</span>
                        <span>Child Immunization (9AM-3PM)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Friday:</span>
                        <span>Senior Citizen Care (9AM-2PM)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Upcoming Events</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">COVID-19 Booster Drive</p>
                          <p className="text-xs text-muted-foreground">May 25-27, 2025</p>
                          <p className="text-xs text-muted-foreground">8AM - 5PM</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
                          <Heart className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Free Health Screening</p>
                          <p className="text-xs text-muted-foreground">June 1, 2025</p>
                          <p className="text-xs text-muted-foreground">7AM - 12PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Health Records</CardTitle>
              <CardDescription>Your personal health information and visit history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Recent Visits</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>General Checkup</span>
                        <span className="text-muted-foreground">May 10, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>COVID-19 Vaccination</span>
                        <span className="text-muted-foreground">March 15, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Blood Pressure Check</span>
                        <span className="text-muted-foreground">February 20, 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Vaccination Record</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>COVID-19 (3rd Dose)</span>
                        <Badge className="bg-green-500">Complete</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Flu Vaccine 2025</span>
                        <Badge className="bg-green-500">Complete</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tetanus</span>
                        <Badge variant="outline">Due 2026</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Health Alerts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">Annual checkup due in 2 months</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Flu vaccination available</span>
                    </div>
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
