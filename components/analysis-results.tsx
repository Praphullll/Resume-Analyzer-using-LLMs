"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Lightbulb,
  DollarSign,
  AlertCircle,
  Star,
  Users,
  Brain,
  MessageSquare,
  Zap,
  Heart,
} from "lucide-react"

interface AnalysisResultsProps {
  results: {
    overallScore: number
    skillsMatch: {
      matched: string[]
      missing: string[]
      additional: string[]
      skillsGap: number
    }
    experienceAnalysis: {
      yearsOfExperience: number
      relevantExperience: number
      seniorityLevel: string
      keyAchievements: string[]
      careerProgression: string
      industryExperience: string[]
    }
    qualifications: {
      education: string[]
      certifications: string[]
      languages: string[]
      educationMatch: number
    }
    recommendations: Array<{
      category: string
      priority: string
      suggestion: string
      impact: string
    }>
    strengths: Array<{
      area: string
      description: string
      relevance: number
    }>
    weaknesses: Array<{
      area: string
      description: string
      severity: string
      improvement: string
    }>
    atsScore: number
    atsIssues: string[]
    culturalFit: number
    culturalFitFactors: string[]
    summary: string
    hiringRecommendation: string
    salaryRange: {
      min: number
      max: number
      currency: string
    }
    interviewFocus: string[]
    redFlags: string[]
    competencyScores: {
      technical: number
      leadership: number
      communication: number
      problemSolving: number
      teamwork: number
      adaptability: number
    }
  }
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const skillsData = [
    { name: "Matched Skills", value: results.skillsMatch.matched.length, color: "#00C49F" },
    { name: "Missing Skills", value: results.skillsMatch.missing.length, color: "#FF8042" },
    { name: "Additional Skills", value: results.skillsMatch.additional.length, color: "#0088FE" },
  ]

  const competencyData = [
    { subject: "Technical", score: results.competencyScores.technical },
    { subject: "Leadership", score: results.competencyScores.leadership },
    { subject: "Communication", score: results.competencyScores.communication },
    { subject: "Problem Solving", score: results.competencyScores.problemSolving },
    { subject: "Teamwork", score: results.competencyScores.teamwork },
    { subject: "Adaptability", score: results.competencyScores.adaptability },
  ]

  const competencyBarData = Object.entries(results.competencyScores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
  }))

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "Major":
        return "secondary"
      case "Minor":
        return "outline"
      default:
        return "outline"
    }
  }

  const getHiringRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Strong Hire":
        return "text-green-700 bg-green-100"
      case "Hire":
        return "text-green-600 bg-green-50"
      case "Maybe":
        return "text-yellow-600 bg-yellow-50"
      case "No Hire":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const formatSalary = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>{results.overallScore}%</div>
              <p className="text-sm text-muted-foreground">Overall Match</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(results.atsScore)}`}>{results.atsScore}%</div>
              <p className="text-sm text-muted-foreground">ATS Score</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(results.culturalFit)}`}>{results.culturalFit}%</div>
              <p className="text-sm text-muted-foreground">Cultural Fit</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{results.skillsMatch.matched.length}</div>
              <p className="text-sm text-muted-foreground">Skills Matched</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{results.experienceAnalysis.seniorityLevel}</div>
              <p className="text-sm text-muted-foreground">Seniority Level</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Hiring Recommendation</span>
              <Badge className={getHiringRecommendationColor(results.hiringRecommendation)}>
                {results.hiringRecommendation}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Salary Range</span>
              <span className="text-sm font-bold">
                {formatSalary(results.salaryRange.min, results.salaryRange.currency)} -{" "}
                {formatSalary(results.salaryRange.max, results.salaryRange.currency)}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Progress</p>
              <Progress value={results.overallScore} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="competencies">Competencies</TabsTrigger>
          <TabsTrigger value="recommendations">Insights</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{results.summary}</p>

                {results.redFlags.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Red Flags
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {results.redFlags.map((flag, index) => (
                        <li key={index}>• {flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competency Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={competencyData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                    <Radar name="Score" dataKey="score" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-green-800">{strength.area}</h4>
                        <Badge variant="outline" className="text-green-600">
                          {strength.relevance}% relevant
                        </Badge>
                      </div>
                      <p className="text-sm text-green-700">{strength.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.weaknesses.map((weakness, index) => (
                    <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-orange-800">{weakness.area}</h4>
                        <Badge variant={getSeverityColor(weakness.severity)}>{weakness.severity}</Badge>
                      </div>
                      <p className="text-sm text-orange-700 mb-2">{weakness.description}</p>
                      <p className="text-xs text-orange-600 italic">💡 {weakness.improvement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skills Distribution</CardTitle>
                <CardDescription>Skills gap: {results.skillsMatch.skillsGap}%</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Matched Skills ({results.skillsMatch.matched.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {results.skillsMatch.matched.map((skill, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Missing Skills ({results.skillsMatch.missing.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {results.skillsMatch.missing.map((skill, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Additional Skills ({results.skillsMatch.additional.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {results.skillsMatch.additional.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ATS Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                ATS Compatibility Analysis
              </CardTitle>
              <CardDescription>Score: {results.atsScore}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={results.atsScore} className="h-2" />
                {results.atsIssues.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">ATS Optimization Suggestions:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {results.atsIssues.map((issue, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experience Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.experienceAnalysis.yearsOfExperience}
                    </div>
                    <p className="text-sm text-blue-700">Total Years</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {results.experienceAnalysis.relevantExperience}
                    </div>
                    <p className="text-sm text-green-700">Relevant Years</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Career Progression</h4>
                  <p className="text-sm text-muted-foreground">{results.experienceAnalysis.careerProgression}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Industry Experience</h4>
                  <div className="flex flex-wrap gap-1">
                    {results.experienceAnalysis.industryExperience.map((industry, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.experienceAnalysis.keyAchievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Qualifications Overview
              </CardTitle>
              <CardDescription>Education match: {results.qualifications.educationMatch}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-medium mb-2">Education</h4>
                  <ul className="text-sm space-y-1">
                    {results.qualifications.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <ul className="text-sm space-y-1">
                    {results.qualifications.certifications.length > 0 ? (
                      results.qualifications.certifications.map((cert, index) => <li key={index}>{cert}</li>)
                    ) : (
                      <li className="text-muted-foreground">None listed</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <ul className="text-sm space-y-1">
                    {results.qualifications.languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competencies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Competency Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competencyBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competency Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(results.competencyScores).map(([key, value]) => {
                  const icons = {
                    technical: Brain,
                    leadership: Users,
                    communication: MessageSquare,
                    problemSolving: Lightbulb,
                    teamwork: Heart,
                    adaptability: Zap,
                  }
                  const Icon = icons[key as keyof typeof icons] || Brain

                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium capitalize">{key}</span>
                        </div>
                        <Badge variant={getScoreBadgeVariant(value)}>{value}%</Badge>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Cultural Fit Analysis
              </CardTitle>
              <CardDescription>Score: {results.culturalFit}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={results.culturalFit} className="h-2" />
                <div>
                  <h4 className="font-medium mb-2">Cultural Fit Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.culturalFitFactors.map((factor, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Generated Recommendations
              </CardTitle>
              <CardDescription>Prioritized actionable insights to improve candidacy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{recommendation.category}</Badge>
                        <Badge variant={getPriorityColor(recommendation.priority)}>
                          {recommendation.priority} Priority
                        </Badge>
                      </div>
                    </div>
                    <h4 className="font-medium mb-2">{recommendation.suggestion}</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Impact:</strong> {recommendation.impact}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Interview Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.interviewFocus.map((area, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Compensation Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {formatSalary(results.salaryRange.min, results.salaryRange.currency)} -{" "}
                    {formatSalary(results.salaryRange.max, results.salaryRange.currency)}
                  </div>
                  <p className="text-sm text-green-600">Estimated Salary Range</p>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>* Based on experience level, skills, and market data</p>
                  <p>* Actual compensation may vary by location and company</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Final Hiring Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6 border rounded-lg">
                <div
                  className={`text-3xl font-bold mb-2 ${getHiringRecommendationColor(results.hiringRecommendation)}`}
                >
                  {results.hiringRecommendation}
                </div>
                <p className="text-muted-foreground">
                  Based on comprehensive analysis of skills, experience, and cultural fit
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
