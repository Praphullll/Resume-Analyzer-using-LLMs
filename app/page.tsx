"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, Briefcase, Zap, AlertCircle } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { FileUpload } from "@/components/file-upload"
import { AnalysisResults } from "@/components/analysis-results"

export default function HomePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [customRequirements, setCustomRequirements] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload a resume and provide a job description.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const formData = new FormData()
      formData.append("resume", resumeFile)
      formData.append("jobDescription", jobDescription)
      formData.append("customRequirements", customRequirements)

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const results = await response.json()

      clearInterval(progressInterval)
      setAnalysisProgress(100)
      setAnalysisResults(results)

      // Check if we're running in demo mode
      const isDemoMode = !process.env.NEXT_PUBLIC_OPENAI_CONFIGURED

      toast({
        title: isDemoMode ? "Demo Analysis Complete" : "Analysis Complete",
        description: isDemoMode
          ? "Showing demo results. Configure OpenAI API key for real analysis."
          : "Your resume has been successfully analyzed!",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis Failed",
        description:
          error instanceof Error ? error.message : "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
      setTimeout(() => setAnalysisProgress(0), 1000)
    }
  }

  const handleReset = () => {
    setResumeFile(null)
    setJobDescription("")
    setCustomRequirements("")
    setAnalysisResults(null)
    setAnalysisProgress(0)
  }

  if (analysisResults) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Analysis Results</h1>
            </div>
            <div className="ml-auto">
              <Button onClick={handleReset} variant="outline">
                New Analysis
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6">
          <AnalysisResults results={analysisResults} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Resume Analyzer</h1>
            <p className="text-sm text-muted-foreground">AI-powered resume analysis and job matching</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Resume
              </CardTitle>
              <CardDescription>Upload your resume in PDF or DOCX format for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileSelect={setResumeFile}
                selectedFile={resumeFile}
                accept=".pdf,.docx,.doc"
                maxSize={10 * 1024 * 1024} // 10MB
              />
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Description
              </CardTitle>
              <CardDescription>Paste the job description you want to match against</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="job-description">Job Description *</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Requirements (Optional)</CardTitle>
            <CardDescription>
              Add any specific requirements or criteria you want to emphasize in the analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Must have 5+ years of React experience, Leadership experience preferred, Remote work experience..."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 animate-pulse" />
                  <span className="text-sm font-medium">Analyzing Resume...</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />
                <div className="text-xs text-muted-foreground">
                  {analysisProgress < 30 && "Extracting resume content..."}
                  {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing skills and experience..."}
                  {analysisProgress >= 60 && analysisProgress < 90 && "Matching against job requirements..."}
                  {analysisProgress >= 90 && "Generating insights and recommendations..."}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your resume and job description are processed securely and are not stored permanently. Analysis typically
            takes 30-60 seconds depending on document complexity.
          </AlertDescription>
        </Alert>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeFile || !jobDescription.trim()}
            size="lg"
            className="min-w-[200px]"
          >
            {isAnalyzing ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
