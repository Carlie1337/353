import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, MapPin, Clock, Users, Siren } from "lucide-react"

export default function EmergencyAlertsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Emergency Alerts</h2>
          <p className="text-muted-foreground">Stay informed about emergency situations in your area</p>
        </div>
        <Button variant="destructive">
          <Siren className="mr-2 h-4 w-4" />
          Report Emergency
        </Button>
      </div>

      {/* Emergency Contacts */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="bg-red-50 dark:bg-red-950/50">
          <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="font-medium">Barangay Emergency</div>
              <div className="text-lg font-bold text-red-600">911</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Barangay Hall</div>
              <div className="text-lg font-bold">(02) 123-4567</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Health Center</div>
              <div className="text-lg font-bold">(02) 123-4568</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Active Alerts</h3>

        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="bg-red-50 dark:bg-red-950/50">
            <div className="flex justify-between items-center">
              <Badge variant="destructive" className="mb-2">
                ACTIVE - HIGH PRIORITY
              </Badge>
              <span className="text-xs text-muted-foreground">Issued: 2 hours ago</span>
            </div>
            <CardTitle className="flex items-center text-red-700 dark:text-red-400">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Flash Flood Warning
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <p>
                Flash flooding reported in low-lying areas of East Zone. Residents in Purok 3-5 are advised to evacuate
                to higher ground immediately.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>East Zone, Purok 3, 4, and 5</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>~150 households affected</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Expected duration: 6-8 hours</span>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-1">Safety Instructions:</h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Move to higher ground immediately</li>
                  <li>• Avoid walking or driving through flood waters</li>
                  <li>• Evacuation center: Mabuhay Elementary School</li>
                  <li>• Bring essential items and important documents</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 dark:border-amber-900">
          <CardHeader className="bg-amber-50 dark:bg-amber-950/50">
            <div className="flex justify-between items-center">
              <Badge variant="destructive" className="mb-2">
                ACTIVE - MEDIUM PRIORITY
              </Badge>
              <span className="text-xs text-muted-foreground">Issued: 5 hours ago</span>
            </div>
            <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Missing Person Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <p>
                Missing child: Maria Santos, 8 years old, last seen near the public market at around 3:00 PM. Wearing
                red shirt and blue shorts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Last seen: Public Market, West Zone</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Missing since: 3:00 PM today</span>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-1">If you see this child:</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Contact Barangay Hall immediately: (02) 123-4567</li>
                  <li>• Do not approach, call authorities first</li>
                  <li>• Provide your location and contact information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Alerts (Resolved)</h3>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge className="bg-green-500 mb-2">RESOLVED</Badge>
              <span className="text-xs text-muted-foreground">Resolved: May 15, 2025</span>
            </div>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-muted-foreground" />
              Power Outage - West Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Power has been restored to all affected areas in West Zone. Outage lasted approximately 4 hours.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge className="bg-green-500 mb-2">RESOLVED</Badge>
              <span className="text-xs text-muted-foreground">Resolved: May 10, 2025</span>
            </div>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-muted-foreground" />
              Residential Fire - Purok 2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Fire has been extinguished. No casualties reported. Affected family has been provided temporary shelter.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
