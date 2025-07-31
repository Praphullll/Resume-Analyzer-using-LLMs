import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Upload, BarChart3, Download } from "lucide-react"

export default function BatchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Batch Analysis</h1>
            <p className="text-sm text-muted-foreground">Analyze multiple resumes simultaneously</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Bulk Resume Analysis
              </CardTitle>
              <CardDescription>
                Perfect for recruiters and HR teams to analyze multiple candidates efficiently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Multiple Resumes</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop multiple resume files or select them from your computer.
                </p>
                <Button size="lg" disabled>
                  <Upload className="mr-2 h-4 w-4" />
                  Select Multiple Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Coming soon - Batch processing for enterprise users
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Comparative Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare multiple candidates side-by-side with detailed scoring and ranking.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Skill match comparison</li>
                  <li>• Experience level ranking</li>
                  <li>• ATS score comparison</li>
                  <li>• Cultural fit assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Bulk Export
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export all analysis results in various formats for easy sharing and reporting.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Excel spreadsheet export</li>
                  <li>• PDF summary reports</li>
                  <li>• JSON data export</li>
                  <li>• Email distribution</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise Features</CardTitle>
              <CardDescription>Advanced features for large-scale recruitment operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1000+</div>
                  <p className="text-sm text-muted-foreground">Resumes per batch</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">5min</div>
                  <p className="text-sm text-muted-foreground">Average processing time</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">API</div>
                  <p className="text-sm text-muted-foreground">Integration available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
