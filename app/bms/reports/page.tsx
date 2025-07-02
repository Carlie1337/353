"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { BarChart3, FileText, Download, Calendar, Users, Building2, AlertTriangle, TrendingUp } from "lucide-react"

export default function BMSReportsPage() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState<any>(null)

  const reportTemplates = [
    {
      id: "population",
      title: "Population Report",
      description: "Comprehensive resident demographics and statistics",
      icon: Users,
      category: "Demographics",
    },
    {
      id: "households",
      title: "Household Summary",
      description: "Household composition and income classification",
      icon: Building2,
      category: "Demographics",
    },
    {
      id: "documents",
      title: "Document Requests Report",
      description: "Certificate and permit processing statistics",
      icon: FileText,
      category: "Services",
    },
    {
      id: "incidents",
      title: "Incident Analysis",
      description: "Safety and security incident trends",
      icon: AlertTriangle,
      category: "Safety",
    },
    {
      id: "revenue",
      title: "Revenue Report",
      description: "Barangay income from fees and permits",
      icon: TrendingUp,
      category: "Financial",
    },
    {
      id: "health",
      title: "Health Statistics",
      description: "Health center activities and patient data",
      icon: Users,
      category: "Health",
    },
  ]

  const quickReports = [
    {
      title: "Monthly Summary",
      description: "January 2024 overview",
      generated: "2024-01-31",
      size: "2.3 MB",
    },
    {
      title: "Quarterly Demographics",
      description: "Q4 2023 population data",
      generated: "2024-01-15",
      size: "1.8 MB",
    },
    {
      title: "Annual Incident Report",
      description: "2023 safety statistics",
      generated: "2024-01-10",
      size: "4.1 MB",
    },
  ]

  const handleGenerateReport = () => {
    console.log("Generating report:", reportType, dateRange)
    // Handle report generation
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive barangay reports and statistics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-blue-600">234</p>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
            <CardDescription>Create custom reports with specific parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="population">Population Report</SelectItem>
                  <SelectItem value="households">Household Summary</SelectItem>
                  <SelectItem value="documents">Document Requests</SelectItem>
                  <SelectItem value="incidents">Incident Analysis</SelectItem>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="health">Health Statistics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date Range</Label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} className="w-full" />
            </div>

            <div>
              <Label htmlFor="format">Output Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerateReport} className="w-full" disabled={!reportType}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <p className="text-xs text-gray-500">
                      Generated: {report.generated} • {report.size}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-configured report templates for common needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <template.icon className="h-8 w-8 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium">{template.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                      <Button size="sm" variant="outline">
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
