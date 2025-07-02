"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, Trash2, Plus, Eye, Save } from "lucide-react"

interface DocumentTemplate {
  id: string
  name: string
  description: string
  content: string
  placeholders: string[]
  category: string
  isActive: boolean
}

const defaultTemplates: DocumentTemplate[] = [
  {
    id: "barangay-clearance",
    name: "Barangay Clearance",
    description: "Standard clearance certificate for residents",
    category: "Clearance",
    isActive: true,
    placeholders: ["RESIDENT_NAME", "PURPOSE", "AGE", "CIVIL_STATUS", "ADDRESS"],
    content:
      "REPUBLIC OF THE PHILIPPINES\nPROVINCE OF [PROVINCE]\nMUNICIPALITY/CITY OF [MUNICIPALITY]\nBARANGAY [BARANGAY_NAME]\n\nOFFICE OF THE PUNONG BARANGAY\n\nBARANGAY CLEARANCE\n\nTO WHOM IT MAY CONCERN:\n\nThis is to certify that [RESIDENT_NAME], [AGE] years old, [CIVIL_STATUS], Filipino citizen, and a resident of [ADDRESS], Barangay [BARANGAY_NAME], [MUNICIPALITY], [PROVINCE], is known to me to be of good moral character and law-abiding citizen in the community.\n\nThis is to certify further that he/she has no pending case filed against him/her in this Barangay.\n\nThis certification is being issued upon the request of the above-named person for [PURPOSE] and for whatever legal purpose it may serve him/her best.\n\nGiven this [DAY] day of [MONTH], [YEAR] at Barangay [BARANGAY_NAME], [MUNICIPALITY], [PROVINCE].\n\n                                    [PUNONG_BARANGAY_NAME]\n                                    Punong Barangay\n\nWitnessed by:\n[KAGAWAD_NAME]\nBarangay Kagawad",
  },
]

export default function DocumentTemplateManager() {
  const [templates, setTemplates] = useState<DocumentTemplate[]>(defaultTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<DocumentTemplate | null>(null)

  const handleEditTemplate = (template: DocumentTemplate) => {
    setEditingTemplate({ ...template })
    setIsEditorOpen(true)
  }

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates((prev) => prev.map((t) => (t.id === editingTemplate.id ? editingTemplate : t)))
      setIsEditorOpen(false)
      setEditingTemplate(null)
    }
  }

  const handlePreviewTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const generateSamplePreview = (template: DocumentTemplate) => {
    return template.content
      .replace(/\[RESIDENT_NAME\]/g, "Juan Dela Cruz")
      .replace(/\[PURPOSE\]/g, "Employment Application")
      .replace(/\[AGE\]/g, "30")
      .replace(/\[CIVIL_STATUS\]/g, "Single")
      .replace(/\[ADDRESS\]/g, "123 Sample Street")
      .replace(/\[DAY\]/g, new Date().getDate().toString())
      .replace(/\[MONTH\]/g, new Date().toLocaleString("default", { month: "long" }))
      .replace(/\[YEAR\]/g, new Date().getFullYear().toString())
      .replace(/\[BARANGAY_NAME\]/g, "Barangay Bucana")
      .replace(/\[MUNICIPALITY\]/g, "Davao City")
      .replace(/\[PROVINCE\]/g, "Davao del Sur")
      .replace(/\[PUNONG_BARANGAY_NAME\]/g, "Hon. Maria Santos")
      .replace(/\[KAGAWAD_NAME\]/g, "Hon. Pedro Garcia")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Document Templates</h3>
          <p className="text-sm text-muted-foreground">Manage and customize document templates</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <Badge variant={template.isActive ? "default" : "secondary"}>
                  {template.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Category: {template.category}</p>
                  <p className="text-xs text-muted-foreground">Placeholders: {template.placeholders.length}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handlePreviewTemplate(template)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>Customize the document template content</DialogDescription>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="template-content">Template Content</Label>
                <Textarea
                  id="template-content"
                  value={editingTemplate.content}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      content: e.target.value,
                    })
                  }
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>Preview of the template with sample data</DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="border rounded-md p-6 bg-white text-black">
                <pre className="whitespace-pre-wrap text-sm font-serif leading-relaxed">
                  {generateSamplePreview(selectedTemplate)}
                </pre>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
