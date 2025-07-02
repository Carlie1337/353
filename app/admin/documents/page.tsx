import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentTemplateManager from "@/components/document-template-manager"

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-5">Documents</h1>

      <Tabs defaultValue="templates" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="space-y-4">
          <DocumentTemplateManager />
        </TabsContent>
        <TabsContent value="settings">Settings Content</TabsContent>
      </Tabs>
    </div>
  )
}
