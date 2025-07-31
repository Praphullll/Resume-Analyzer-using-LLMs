import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Trash2, Server, FileCheck } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Privacy & Security</h1>
            <p className="text-sm text-muted-foreground">How we protect and handle your data</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data Protection Commitment
              </CardTitle>
              <CardDescription>Your privacy and data security are our top priorities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                We are committed to protecting your personal information and maintaining the highest standards of data
                security. Our Resume Analyzer processes your documents with enterprise-grade security measures and
                follows industry best practices for data protection.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Encryption & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileCheck className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">End-to-End Encryption</p>
                    <p className="text-xs text-muted-foreground">All data is encrypted in transit and at rest</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Secure Processing</p>
                    <p className="text-xs text-muted-foreground">Analysis happens in isolated, secure environments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">No Permanent Storage</p>
                    <p className="text-xs text-muted-foreground">
                      Files are processed in memory and deleted immediately
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Data Usage Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileCheck className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Analysis Only</p>
                    <p className="text-xs text-muted-foreground">Data is used solely for resume analysis purposes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">No Third-Party Sharing</p>
                    <p className="text-xs text-muted-foreground">Your data is never shared with external parties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">No Training Data</p>
                    <p className="text-xs text-muted-foreground">Your resumes are not used to train AI models</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Data Retention & Deletion
              </CardTitle>
              <CardDescription>How long we keep your data and how to request deletion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-2">0 sec</div>
                    <p className="text-sm text-muted-foreground">File storage after analysis</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">24h</div>
                    <p className="text-sm text-muted-foreground">Analysis results retention</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">Instant</div>
                    <p className="text-sm text-muted-foreground">Deletion upon request</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Uploaded files are processed in memory and never stored permanently. Analysis results are temporarily
                  cached for 24 hours to improve performance, then automatically deleted. You can request immediate
                  deletion of any data at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Infrastructure & Compliance
              </CardTitle>
              <CardDescription>Our technical infrastructure and compliance standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Infrastructure</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Hosted on Vercel's secure platform[^5]</li>
                    <li>• Serverless architecture for enhanced security</li>
                    <li>• Automatic security updates and patches</li>
                    <li>• DDoS protection and rate limiting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Compliance</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• GDPR compliant data processing</li>
                    <li>• SOC 2 Type II certified infrastructure</li>
                    <li>• Regular security audits and assessments</li>
                    <li>• Industry-standard encryption protocols</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights & Controls</CardTitle>
              <CardDescription>What you can do to control your data and privacy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Right to Access</h4>
                  <p className="text-sm text-muted-foreground">
                    You can request information about what data we have processed for you.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Right to Deletion</h4>
                  <p className="text-sm text-muted-foreground">
                    You can request immediate deletion of any analysis results or cached data.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Right to Portability</h4>
                  <p className="text-sm text-muted-foreground">
                    You can export your analysis results in machine-readable formats.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
