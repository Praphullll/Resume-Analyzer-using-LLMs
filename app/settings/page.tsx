import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Brain, Zap, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">Configure your analysis preferences</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Model Settings
              </CardTitle>
              <CardDescription>Configure the AI models and analysis parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model-select">AI Model</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Analysis Depth</Label>
                <div className="px-3">
                  <Slider defaultValue={[75]} max={100} min={25} step={25} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Quick</span>
                    <span>Standard</span>
                    <span>Detailed</span>
                    <span>Comprehensive</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Include Soft Skills Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Analyze communication, leadership, and interpersonal skills
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cultural Fit Assessment</Label>
                  <p className="text-sm text-muted-foreground">Evaluate candidate alignment with company culture</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance Settings
              </CardTitle>
              <CardDescription>Optimize analysis speed and resource usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Parallel Processing</Label>
                  <p className="text-sm text-muted-foreground">
                    Process multiple sections simultaneously for faster results
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cache Results</Label>
                  <p className="text-sm text-muted-foreground">
                    Store analysis results temporarily for faster re-analysis
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Processing Priority</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speed">Speed Optimized</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="accuracy">Accuracy Optimized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Control how your data is handled and processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-delete Files</Label>
                  <p className="text-sm text-muted-foreground">Automatically delete uploaded files after analysis</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymous Processing</Label>
                  <p className="text-sm text-muted-foreground">Remove personal identifiers before AI analysis</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label>Data Retention Period</Label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Delete Immediately</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
