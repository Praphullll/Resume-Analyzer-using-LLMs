import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Download, Share } from "lucide-react"

export default function ResultsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Analysis Results</h1>
            <p className="text-sm text-muted-foreground">View and manage your resume analysis history</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Analysis Results
              </CardTitle>
              <CardDescription>Your most recent resume analysis results and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Analysis Results Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a resume and job description to get started with AI-powered analysis.
                </p>
                <Button asChild>
                  <a href="/">Start Analysis</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Download your analysis results in various formats for sharing or record keeping.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Export to JSON
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="h-5 w-5" />
                  Share Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Share your analysis results with recruiters or career counselors.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Generate Share Link
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Email Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
