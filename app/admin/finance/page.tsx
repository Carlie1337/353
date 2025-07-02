"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Plus,
  Download,
  Calendar,
  CreditCard,
  Wallet,
} from "lucide-react"

const budgetData = [
  { category: "Infrastructure", allocated: 500000, spent: 320000, percentage: 64 },
  { category: "Health Services", allocated: 200000, spent: 150000, percentage: 75 },
  { category: "Education", allocated: 150000, spent: 120000, percentage: 80 },
  { category: "Social Services", allocated: 100000, spent: 85000, percentage: 85 },
  { category: "Peace & Order", allocated: 80000, spent: 60000, percentage: 75 },
]

const recentTransactions = [
  {
    id: 1,
    type: "Income",
    description: "Business Permit Fees",
    amount: 15000,
    date: "2024-01-15",
    status: "Completed",
  },
  { id: 2, type: "Expense", description: "Road Maintenance", amount: -25000, date: "2024-01-14", status: "Completed" },
  {
    id: 3,
    type: "Income",
    description: "Barangay Clearance Fees",
    amount: 8500,
    date: "2024-01-13",
    status: "Completed",
  },
  { id: 4, type: "Expense", description: "Medical Supplies", amount: -12000, date: "2024-01-12", status: "Pending" },
  { id: 5, type: "Income", description: "Community Tax", amount: 20000, date: "2024-01-11", status: "Completed" },
]

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const totalBudget = budgetData.reduce((sum, item) => sum + item.allocated, 0)
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0)
  const totalIncome = recentTransactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(
    recentTransactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Financial Management</h1>
          <p className="text-muted-foreground">Track budget, expenses, and revenue</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Annual allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-red-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="budget" className="space-y-4">
        <TabsList>
          <TabsTrigger value="budget">Budget Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation & Spending</CardTitle>
              <CardDescription>Track budget utilization by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        ₱{item.spent.toLocaleString()} / ₱{item.allocated.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.percentage}% utilized</span>
                      <span>₱{(item.allocated - item.spent).toLocaleString()} remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "Income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "Income" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{transaction.description}</h3>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}₱{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create financial reports for different periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Monthly Financial Report
                </Button>
                <Button className="w-full" variant="outline">
                  <PieChart className="h-4 w-4 mr-2" />
                  Budget Analysis Report
                </Button>
                <Button className="w-full" variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Revenue Summary Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Key financial metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Budget Utilization:</span>
                  <span className="font-semibold">{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Funds:</span>
                  <span className="font-semibold">₱{(totalBudget - totalSpent).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Income (Monthly):</span>
                  <span className="font-semibold text-green-600">
                    ₱{(totalIncome - totalExpenses).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
