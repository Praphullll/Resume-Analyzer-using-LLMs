import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Zap, CheckCircle } from "lucide-react"

export default function ParserPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Resume Parser</h1>
            <p className="text-sm text-muted-foreground">Advanced text extraction and data structuring</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Intelligent Resume Parsing
              </CardTitle>
              <CardDescription>
                Our AI-powered parser extracts structured data from resumes with high accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3">Supported Formats</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      PDF documents
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Microsoft Word (.docx, .doc)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Plain text files
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Various resume layouts
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Extracted Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      Personal information
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      Work experience & achievements
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      Skills & technologies
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      Education & certifications
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">99.2%</CardTitle>
                <CardDescription>Parsing Accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Industry-leading accuracy in extracting structured data from resumes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{"<"}30s</CardTitle>
                <CardDescription>Processing Time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Lightning-fast processing powered by advanced AI models</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">50+</CardTitle>
                <CardDescription>Data Fields</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive extraction of all relevant resume information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
