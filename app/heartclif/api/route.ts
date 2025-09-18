import { type NextRequest, NextResponse } from "next/server"

// Simulated database for HeartClif system
const heartclifData = {
  users: [
    {
      id: 1,
      name: "Dr. Maria Santos",
      role: "Cardiologist",
      department: "Cardiology",
      status: "active",
      lastLogin: new Date().toISOString(),
      patientsToday: 12,
      appointmentsCompleted: 8,
    },
    {
      id: 2,
      name: "Nurse John Cruz",
      role: "Registered Nurse",
      department: "Emergency",
      status: "active",
      lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      patientsToday: 25,
      appointmentsCompleted: 20,
    },
  ],
  stats: {
    totalPatients: 1247,
    activeAppointments: 23,
    completedToday: 45,
    emergencyCases: 3,
    bedOccupancy: 78,
    staffOnDuty: 15,
  },
  analytics: {
    dailyVisits: [120, 135, 98, 167, 145, 189, 156],
    monthlyTrends: {
      appointments: 1250,
      emergencies: 45,
      admissions: 89,
    },
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    switch (action) {
      case "health":
        return NextResponse.json({
          status: "healthy",
          timestamp: new Date().toISOString(),
          services: {
            database: true,
            api: true,
            heartclif: true,
          },
          responseTime: Math.floor(Math.random() * 100) + 50,
        })

      case "stats":
        return NextResponse.json({
          success: true,
          data: heartclifData.stats,
          timestamp: new Date().toISOString(),
        })

      case "users":
        return NextResponse.json({
          success: true,
          data: heartclifData.users,
          total: heartclifData.users.length,
          timestamp: new Date().toISOString(),
        })

      case "analytics":
        return NextResponse.json({
          success: true,
          data: heartclifData.analytics,
          timestamp: new Date().toISOString(),
        })

      default:
        return NextResponse.json({
          message: "HeartClif API - Barangay Health Management System",
          version: "1.0.0",
          endpoints: {
            health: "/heartclif/api?action=health",
            stats: "/heartclif/api?action=stats",
            users: "/heartclif/api?action=users",
            analytics: "/heartclif/api?action=analytics",
          },
          timestamp: new Date().toISOString(),
        })
    }
  } catch (error) {
    console.error("HeartClif API Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to process request",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case "create_user":
        const newUser = {
          id: heartclifData.users.length + 1,
          ...data,
          status: "active",
          lastLogin: new Date().toISOString(),
          patientsToday: 0,
          appointmentsCompleted: 0,
        }
        heartclifData.users.push(newUser)

        return NextResponse.json({
          success: true,
          message: "User created successfully",
          data: newUser,
          timestamp: new Date().toISOString(),
        })

      case "update_analytics":
        Object.assign(heartclifData.analytics, data)

        return NextResponse.json({
          success: true,
          message: "Analytics updated successfully",
          data: heartclifData.analytics,
          timestamp: new Date().toISOString(),
        })

      case "log_activity":
        return NextResponse.json({
          success: true,
          message: "Activity logged successfully",
          activityId: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        })

      default:
        return NextResponse.json(
          {
            error: "Invalid action",
            message: "Supported actions: create_user, update_analytics, log_activity",
            timestamp: new Date().toISOString(),
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("HeartClif API POST Error:", error)
    return NextResponse.json(
      {
        error: "Bad request",
        message: "Invalid request body or parameters",
        timestamp: new Date().toISOString(),
      },
      { status: 400 },
    )
  }
}
