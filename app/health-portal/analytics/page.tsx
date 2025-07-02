"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  Activity,
  Heart,
  Pill,
  FileText,
  AlertTriangle,
  BarChart3,
  PieChart,
  LineChart,
  Download,
} from "lucide-react"

export default function AnalyticsPage() {
  const healthStats = [
    { title: "Total Patients", value: "1,247", change: "+12%", trend: "up" },
    { title: "Monthly Visits", value: "456", change: "+8%", trend: "up" },
    { title: "Vaccinations", value: "234", change: "+15%", trend: "up" },
    { title: "Health Programs", value: "12", change: "+2", trend: "up" },
  ]

  const diseaseData = [
    { disease: "Hypertension", cases: 89, percentage: 35, trend: "+5%" },
    { disease: "Diabetes", cases: 67, percentage: 26, trend: "+3%" },
    { disease: "Respiratory Issues", cases: 45, percentage: 18, trend: "-2%" },
    { disease: "Heart Disease", cases: 34, percentage: 13, trend: "+1%" },
    { disease: "Others", cases: 20, percentage: 8, trend: "0%" },
  ]

  const ageGroups = [
    { group: "0-18 years", count: 312, percentage: 25 },
    { group: "19-35 years", count: 387, percentage: 31 },
    { group: "36-50 years", count: 298, percentage: 24 },
    { group: "51-65 years", count: 156, percentage: 12.5 },
    { group: "65+ years", count: 94, percentage: 7.5 },
  ]

  const monthlyTrends = [
    { month: "Jan", consultations: 120, vaccinations: 45, emergencies: 8 },
    { month: "Feb", consultations: 135, vaccinations: 52, emergencies: 12 },
    { month: "Mar", consultations: 142, vaccinations: 48, emergencies: 6 },
    { month: "Apr", consultations: 158, vaccinations: 63, emergencies: 9 },
    { month: "May", consultations: 167, vaccinations: 71, emergencies: 11 },
    { month: "Jun", consultations: 178, vaccinations: 68, emergencies: 7 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Health statistics and community health insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Health Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {healthStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <span className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="diseases">Disease Tracking</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly Health Services
                </CardTitle>
                <CardDescription>Services provided over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{trend.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-blue-600">{trend.consultations} consultations</span>
                        <span className="text-green-600">{trend.vaccinations} vaccinations</span>
                        <span className="text-red-600">{trend.emergencies} emergencies</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health Alerts
                </CardTitle>
                <CardDescription>Current health concerns and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Dengue cases increasing</p>
                      <p className="text-xs text-gray-500">Sitio 3 area - 5 new cases this week</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Pill className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Flu vaccination drive</p>
                      <p className="text-xs text-gray-500">Scheduled for next week</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Activity className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">COVID-19 cases decreasing</p>
                      <p className="text-xs text-gray-500">Down 15% from last month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diseases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Common Health Conditions
              </CardTitle>
              <CardDescription>Most prevalent health conditions in the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseaseData.map((disease, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{disease.disease}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{disease.cases} cases</span>
                          <span className="text-sm text-green-600">{disease.trend}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${disease.percentage}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{disease.percentage}% of total cases</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Age Distribution
                </CardTitle>
                <CardDescription>Patient distribution by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{group.group}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${(group.percentage / 35) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{group.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Gender Distribution
                </CardTitle>
                <CardDescription>Patient distribution by gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">Female</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{ width: "58%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">723 (58%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">Male</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "42%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">524 (42%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Health Service Trends
              </CardTitle>
              <CardDescription>Monthly trends in health services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <LineChart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Interactive trend charts</p>
                <p className="text-sm text-gray-400">Detailed analytics and trend visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
