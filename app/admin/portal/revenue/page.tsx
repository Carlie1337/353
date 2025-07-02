"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Receipt,
  CreditCard,
  Search,
  Filter,
  Download,
  Eye,
  Plus,
  Banknote,
} from "lucide-react"

export default function RevenueManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  // Demo data
  const payments = [
    {
      id: "PAY-001",
      payer: "Juan Dela Cruz",
      type: "Community Tax",
      amount: 500,
      status: "Paid",
      dueDate: "2024-05-31",
      paidDate: "2024-05-20",
      method: "Cash",
      avatar: "JD",
    },
    {
      id: "PAY-002",
      payer: "Maria Santos",
      type: "Business Permit Fee",
      amount: 3000,
      status: "Pending",
      dueDate: "2024-05-25",
      paidDate: "-",
      method: "-",
      avatar: "MS",
    },
    {
      id: "PAY-003",
      payer: "Pedro Garcia",
      type: "Barangay Clearance",
      amount: 100,
      status: "Paid",
      dueDate: "2024-05-20",
      paidDate: "2024-05-19",
      method: "GCash",
      avatar: "PG",
    },
    {
      id: "PAY-004",
      payer: "Ana Reyes",
      type: "Cedula",
      amount: 50,
      status: "Overdue",
      dueDate: "2024-05-15",
      paidDate: "-",
      method: "-",
      avatar: "AR",
    },
  ]

  const revenueStats = {
    totalRevenue: 890000,
    monthlyRevenue: 156000,
    pendingPayments: 23000,
    overduePayments: 8500,
    collectionRate: 94.2,
  }

  const revenueByType = [
    { type: "Business Permits", amount: 450000, percentage: 50.6 },
    { type: "Community Tax", amount: 234000, percentage: 26.3 },
    { type: "Document Fees", amount: 156000, percentage: 17.5 },
    { type: "Other Fees", amount: 50000, percentage: 5.6 },
  ]

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || payment.type.toLowerCase().includes(selectedType.toLowerCase())
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Revenue Management</h2>
            <p className="text-slate-400">Track taxes, fees, and barangay income</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-200">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
              <Plus className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₱{(revenueStats.totalRevenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-slate-400">This year</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₱{(revenueStats.monthlyRevenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-slate-400">This month</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Pending</CardTitle>
              <Receipt className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₱{(revenueStats.pendingPayments / 1000).toFixed(0)}K</div>
              <p className="text-xs text-slate-400">Awaiting payment</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Overdue</CardTitle>
              <Calendar className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₱{(revenueStats.overduePayments / 1000).toFixed(1)}K</div>
              <p className="text-xs text-slate-400">Past due</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Collection Rate</CardTitle>
              <Banknote className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{revenueStats.collectionRate}%</div>
              <p className="text-xs text-slate-400">Success rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 p-1">
            <TabsTrigger value="payments" className="data-[state=active]:bg-slate-800 text-slate-200">
              Payments
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-slate-800 text-slate-200">
              Revenue Breakdown
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-slate-800 text-slate-200">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Payment Records</CardTitle>
                <CardDescription className="text-slate-400">
                  Track all payments and outstanding balances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="tax">Community Tax</SelectItem>
                      <SelectItem value="permit">Business Permit</SelectItem>
                      <SelectItem value="clearance">Clearance</SelectItem>
                      <SelectItem value="cedula">Cedula</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-200">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>

                <div className="rounded-lg border border-slate-800">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800 hover:bg-slate-800/50">
                        <TableHead className="text-slate-300">Payer</TableHead>
                        <TableHead className="text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-300">Amount</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Due Date</TableHead>
                        <TableHead className="text-slate-300">Payment Method</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id} className="border-slate-800 hover:bg-slate-800/30">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-slate-700 text-slate-200">
                                  {payment.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-white">{payment.payer}</div>
                                <div className="text-sm text-slate-400">{payment.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-slate-300">{payment.type}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-white">₱{payment.amount.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-slate-300">
                              <Calendar className="h-3 w-3" />
                              {payment.dueDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            {payment.method !== "-" ? (
                              <div className="flex items-center gap-1 text-sm text-slate-300">
                                <CreditCard className="h-3 w-3" />
                                {payment.method}
                              </div>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {payment.status !== "Paid" && (
                                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                                  Record Payment
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Revenue by Type</CardTitle>
                  <CardDescription className="text-slate-400">Breakdown of revenue sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueByType.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{item.type}</span>
                          <span className="text-white font-medium">₱{(item.amount / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-400">{item.percentage}% of total revenue</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Trends</CardTitle>
                  <CardDescription className="text-slate-400">Revenue collection over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <p className="text-white">Revenue Chart</p>
                      <p className="text-sm text-slate-400">Monthly collection trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Financial Reports</CardTitle>
                <CardDescription className="text-slate-400">Generate and download financial reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Receipt className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-white">Financial Reports</p>
                    <p className="text-sm text-slate-400">Generate detailed financial reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
