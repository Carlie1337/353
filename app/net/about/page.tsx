import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Radio, AlertTriangle } from "lucide-react"

export default function NETAbout() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-red-600 flex items-center justify-center">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">Network Enforcement Team</h1>
          <p className="text-xl text-muted-foreground">Unified Law Enforcement Coordination System</p>
          <Badge variant="outline" className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-300">
            DEMO VERSION
          </Badge>
        </div>
      </div>

      {/* About NET */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-red-600" />
              What is NET?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The Network Enforcement Team (NET) is a unified coordination system that brings together multiple law
              enforcement agencies including PNP, AFP, BFP, PCG, and local Barangay Tanod units for seamless
              collaboration and emergency response.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Radio className="h-5 w-5 mr-2 text-red-600" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Unified Blotter System</li>
              <li>• Real-time Agency Coordination</li>
              <li>• Emergency Response Management</li>
              <li>• Patrol Unit Tracking</li>
              <li>• Inter-agency Communications</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Demo Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a demonstration version of the NET Portal. All data shown is simulated for demo purposes only. In
              a real deployment, this system would connect to actual law enforcement databases and communication
              systems.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" />
              Participating Agencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Badge variant="outline">PNP</Badge>
              <Badge variant="outline">AFP</Badge>
              <Badge variant="outline">BFP</Badge>
              <Badge variant="outline">PCG</Badge>
              <Badge variant="outline">BJMP</Badge>
              <Badge variant="outline">DILG</Badge>
              <Badge variant="outline">Barangay Tanod</Badge>
              <Badge variant="outline">Local Units</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
