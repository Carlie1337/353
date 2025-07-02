"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"

interface SearchFilter {
  id: string
  label: string
  type: "text" | "select" | "multiselect" | "date" | "daterange" | "number" | "boolean"
  options?: { value: string; label: string }[]
  placeholder?: string
}

interface SearchCriteria {
  [key: string]: any
}

interface AdvancedSearchProps {
  filters: SearchFilter[]
  onSearch: (criteria: SearchCriteria) => void
  onReset: () => void
  savedSearches?: SavedSearch[]
  onSaveSearch?: (name: string, criteria: SearchCriteria) => void
}

interface SavedSearch {
  id: string
  name: string
  criteria: SearchCriteria
  createdAt: Date
}

export function AdvancedSearch({ filters, onSearch, onReset, savedSearches = [], onSaveSearch }: AdvancedSearchProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>({})
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [saveSearchName, setSaveSearchName] = useState("")

  const updateCriteria = (key: string, value: any) => {
    setCriteria((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const removeCriteria = (key: string) => {
    setCriteria((prev) => {
      const newCriteria = { ...prev }
      delete newCriteria[key]
      return newCriteria
    })
  }

  const handleSearch = () => {
    onSearch(criteria)
  }

  const handleReset = () => {
    setCriteria({})
    onReset()
  }

  const handleSaveSearch = () => {
    if (saveSearchName && onSaveSearch) {
      onSaveSearch(saveSearchName, criteria)
      setSaveSearchName("")
    }
  }

  const loadSavedSearch = (savedSearch: SavedSearch) => {
    setCriteria(savedSearch.criteria)
    onSearch(savedSearch.criteria)
  }

  const renderFilter = (filter: SearchFilter) => {
    const value = criteria[filter.id]

    switch (filter.type) {
      case "text":
        return (
          <Input
            placeholder={filter.placeholder}
            value={value || ""}
            onChange={(e) => updateCriteria(filter.id, e.target.value)}
          />
        )

      case "select":
        return (
          <Select value={value || ""} onValueChange={(val) => updateCriteria(filter.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "multiselect":
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.id}-${option.value}`}
                  checked={value?.includes(option.value) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = value || []
                    if (checked) {
                      updateCriteria(filter.id, [...currentValues, option.value])
                    } else {
                      updateCriteria(
                        filter.id,
                        currentValues.filter((v: string) => v !== option.value),
                      )
                    }
                  }}
                />
                <Label htmlFor={`${filter.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        )

      case "date":
        return <DatePicker date={value} onDateChange={(date) => updateCriteria(filter.id, date)} />

      case "number":
        return (
          <div className="space-y-2">
            <Slider
              value={[value || 0]}
              onValueChange={(vals) => updateCriteria(filter.id, vals[0])}
              max={100}
              step={1}
            />
            <div className="text-sm text-muted-foreground">Value: {value || 0}</div>
          </div>
        )

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={filter.id}
              checked={value || false}
              onCheckedChange={(checked) => updateCriteria(filter.id, checked)}
            />
            <Label htmlFor={filter.id}>{filter.label}</Label>
          </div>
        )

      default:
        return null
    }
  }

  const activeCriteriaCount = Object.keys(criteria).filter((key) => criteria[key]).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Advanced Search
            </CardTitle>
            <CardDescription>Use filters to find exactly what you're looking for</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {activeCriteriaCount > 0 && (
              <Badge variant="secondary">
                {activeCriteriaCount} filter{activeCriteriaCount !== 1 ? "s" : ""} active
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Filter className="h-4 w-4 mr-2" />
              {showAdvanced ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Quick search..."
              value={criteria.quickSearch || ""}
              onChange={(e) => updateCriteria("quickSearch", e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {/* Active Filters */}
        {activeCriteriaCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(criteria).map(([key, value]) => {
              if (!value) return null
              const filter = filters.find((f) => f.id === key)
              if (!filter) return null

              return (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {filter.label}: {Array.isArray(value) ? value.join(", ") : String(value)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeCriteria(key)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
          </div>
        )}

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <Label htmlFor={filter.id}>{filter.label}</Label>
                  {renderFilter(filter)}
                </div>
              ))}
            </div>

            {/* Save Search */}
            {onSaveSearch && (
              <div className="flex gap-2 pt-4 border-t">
                <Input
                  placeholder="Save this search as..."
                  value={saveSearchName}
                  onChange={(e) => setSaveSearchName(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleSaveSearch}
                  disabled={!saveSearchName || activeCriteriaCount === 0}
                >
                  Save Search
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <div className="space-y-2 border-t pt-4">
            <Label>Saved Searches</Label>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map((savedSearch) => (
                <Button key={savedSearch.id} variant="outline" size="sm" onClick={() => loadSavedSearch(savedSearch)}>
                  {savedSearch.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Predefined filter sets for different modules
export const residentFilters: SearchFilter[] = [
  { id: "name", label: "Name", type: "text", placeholder: "Enter resident name" },
  { id: "age", label: "Age Range", type: "number" },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    id: "zone",
    label: "Zone/Purok",
    type: "select",
    options: [
      { value: "zone1", label: "Zone 1" },
      { value: "zone2", label: "Zone 2" },
      { value: "zone3", label: "Zone 3" },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "multiselect",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending Verification" },
    ],
  },
  { id: "hasHealthRecord", label: "Has Health Record", type: "boolean" },
  { id: "registrationDate", label: "Registration Date", type: "date" },
]

export const documentFilters: SearchFilter[] = [
  {
    id: "type",
    label: "Document Type",
    type: "select",
    options: [
      { value: "clearance", label: "Barangay Clearance" },
      { value: "certificate", label: "Certificate" },
      { value: "permit", label: "Permit" },
      { value: "id", label: "Barangay ID" },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "multiselect",
    options: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
      { value: "completed", label: "Completed" },
    ],
  },
  { id: "requestDate", label: "Request Date", type: "daterange" },
  {
    id: "urgency",
    label: "Urgency",
    type: "select",
    options: [
      { value: "normal", label: "Normal" },
      { value: "urgent", label: "Urgent" },
      { value: "emergency", label: "Emergency" },
    ],
  },
]

export const incidentFilters: SearchFilter[] = [
  {
    id: "type",
    label: "Incident Type",
    type: "multiselect",
    options: [
      { value: "theft", label: "Theft" },
      { value: "assault", label: "Assault" },
      { value: "domestic", label: "Domestic Dispute" },
      { value: "traffic", label: "Traffic Accident" },
      { value: "noise", label: "Noise Complaint" },
    ],
  },
  {
    id: "severity",
    label: "Severity",
    type: "select",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "critical", label: "Critical" },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "reported", label: "Reported" },
      { value: "investigating", label: "Under Investigation" },
      { value: "resolved", label: "Resolved" },
      { value: "closed", label: "Closed" },
    ],
  },
  { id: "location", label: "Location", type: "text", placeholder: "Enter location" },
  { id: "dateReported", label: "Date Reported", type: "daterange" },
]
