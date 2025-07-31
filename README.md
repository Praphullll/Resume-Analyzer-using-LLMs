# Resume Analyzer - AI-Powered Resume Analysis

A comprehensive resume analysis tool powered by Large Language Models (LLMs) and deployed on Vercel.

## Features

- 🤖 **AI-Powered Analysis** - Advanced resume analysis using OpenAI GPT-4o
- 📊 **Comprehensive Scoring** - Overall match, ATS compatibility, and cultural fit scores
- 🎯 **Skills Matching** - Detailed analysis of matched, missing, and additional skills
- 📈 **Interactive Visualizations** - Charts and graphs for easy result interpretation
- 🔒 **Privacy-First** - Files processed in memory, never stored permanently
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd resume-analyzer-llm
npm install
\`\`\`

### 2. Environment Setup

Copy the example environment file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your OpenAI API key to `.env.local`:

\`\`\`env
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 3. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key to your `.env.local` file

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Mode

The application includes a demo mode that works without an API key, showing mock analysis results. This is perfect for:

- Testing the UI and user experience
- Demonstrating the application features
- Development without API costs

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` in Vercel's environment variables
4. Deploy!

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: AI SDK, OpenAI GPT-4o
- **Charts**: Recharts
- **File Upload**: react-dropzone
- **Deployment**: Vercel

## API Usage

The application uses the OpenAI API for resume analysis. Costs are typically:
- ~$0.01-0.05 per resume analysis
- Depends on resume length and complexity

## Privacy & Security

- Files are processed in memory only
- No permanent storage of uploaded documents
- Analysis results cached for 24 hours maximum
- GDPR compliant data handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
\`\`\`

The application now handles the missing OpenAI API key gracefully by:

1. **Providing mock data** when the API key is missing
2. **Showing clear setup instructions** with the EnvSetupAlert component
3. **Graceful error handling** with informative error messages
4. **Demo mode functionality** so users can explore the interface
5. **Comprehensive setup documentation** in the README

Users can now:
- ✅ **Test the application immediately** with demo data
- ✅ **See exactly what they need to do** to enable AI analysis
- ✅ **Get helpful error messages** instead of crashes
- ✅ **Follow clear setup instructions** to configure their API key

The application will work in demo mode without any configuration, and seamlessly switch to real AI analysis once the OpenAI API key is properly configured.
