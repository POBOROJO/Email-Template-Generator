# Professional Email Generator

A Next.js SaaS application that leverages Google's Gemini AI to help users create professional emails, convert email tones, personalize cold emails, and generate catchy subject lines. With a sleek landing page, user authentication, and a history view, this tool is designed to streamline email communication for professionals.

## Features

- 🎯 **Purpose-Specific Email Generation**: Create well-structured emails for meeting requests, follow-ups, thank-you notes, and more.
- 🎨 **Email Tone Converter**: Adjust email tones to formal, casual, or friendly with ease.
- 💌 **Cold Email Personalizer**: Generate personalized cold emails tailored for sales and outreach.
- ✨ **Email Subject Line Generator**: Craft compelling subject lines to boost email open rates.
- 📜 **History View**: Access and review your previously generated emails and subject lines.
- 🔐 **User Authentication**: Securely sign in with Google (or other providers) via BetterAuth.
- 💾 **Database Storage**: Save user data, generated emails, and subject lines using Prisma and PostgreSQL.
- 🎨 **Modern UI**: Clean, responsive design built with Tailwind CSS, Shadcn components, and Framer Motion animations.
- 🔒 **Secure API Handling**: Rate-limited APIs with server-side key storage and edge runtime for performance or Redis.
- ⚡ **SaaS-Ready**: Features a professional landing page to attract users and drive sign-ups.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, React Hook Form, Zod validation
- **Styling**: Tailwind CSS, Shadcn UI components, Framer Motion
- **Backend**: Google Gemini AI, LangChain, Prisma, PostgreSQL
- **Authentication**: NextAuth.js with GitHub provider
- **Deployment**: Edge runtime for optimal performance

## Architecture Diagrams

### System Architecture

```mermaid
flowchart TB
    subgraph "Frontend"
        LandingPage["Landing Page"]
        Dashboard["Dashboard"]
        Forms["Form Components"]
    end
    
    subgraph "API Layer"
        NextJSAPI["Next.js API Routes"]
    end
    
    subgraph "AI Integration"
        LangChain["LangChain"]
        GeminiAI["Google Gemini AI"]
    end
    
    User((User)) --> LandingPage
    User --> Dashboard
    Dashboard --> Forms
    Forms --> NextJSAPI
    NextJSAPI --> LangChain
    LangChain --> GeminiAI
    GeminiAI --> LangChain
    LangChain --> NextJSAPI
    NextJSAPI --> Forms
```

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Form
    participant API
    participant LangChain
    participant GeminiAI
    
    User->>Form: Enters form data
    Form->>Form: Validates data with Zod
    Form->>API: Submits validated data
    API->>LangChain: Constructs prompt with template
    LangChain->>GeminiAI: Sends prompt to model
    GeminiAI->>LangChain: Returns generated text
    LangChain->>API: Returns formatted response
    API->>Form: Returns AI-generated content
    Form->>User: Displays result
```

### User Experience Flow

```mermaid
graph TD
    A[Landing Page] -->|Try Now| B[Dashboard]
    B -->|Tab 1| C[Email Generator]
    B -->|Tab 2| D[Tone Converter]
    B -->|Tab 3| E[Cold Email Personalizer]
    B -->|Tab 4| F[Subject Line Generator]
    C -->|Submit Form| G[Generated Email]
    D -->|Submit Form| H[Converted Email]
    E -->|Submit Form| I[Personalized Cold Email]
    F -->|Submit Form| J[Subject Line Options]
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Google API key for Gemini AI (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- A PostgreSQL database (local or cloud-hosted, e.g., Supabase, Neon, etc.)
- GitHub OAuth credentials for authentication (create an app in [GitHub Developer Settings](https://github.com/settings/developers))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/email-generator.git
   cd email-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add the required variables:
     ```bash
     GOOGLE_API_KEY=your_google_api_key
     DATABASE_URL=postgresql://username:password@host:port/database_name
     GITHUB_ID=your_github_client_id
     GITHUB_SECRET=your_github_client_secret
     NEXTAUTH_URL=http://localhost:3000
     ```

4. Initialize the database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the landing page.

## Usage

1. **Sign In**: Visit `/auth/signin` and log in with your GitHub account.
2. **Access the Dashboard**: Navigate to `/dashboard` to use the tools:
   - **Email Generator**: Enter recipient details, select a purpose, and provide key points to generate a professional email.
   - **Tone Converter**: Paste an email and choose a tone (formal, casual, friendly) to convert it.
   - **Cold Email Personalizer**: Input recipient and sender details to create tailored cold emails.
   - **Subject Line Generator**: Describe your email's purpose to generate effective subject lines.
3. **View History**: Go to `/dashboard/history` to see your saved emails and subject lines.
4. **Copy & Customize**: Use the generated content directly or tweak it as needed.

## Deployment

### Environment Variables

When deploying, set the following environment variables in your deployment platform (e.g., Vercel):

- `GOOGLE_API_KEY`: Your Google Gemini AI API key
- `DATABASE_URL`: Your PostgreSQL connection URL
- `GITHUB_ID`: Your GitHub OAuth client ID
- `GITHUB_SECRET`: Your GitHub OAuth client secret
- `NEXTAUTH_URL`: The canonical URL of your app (e.g., `https://yourapp.vercel.app`)

### Deploy on Vercel

1. Push your code to a Git repository.
2. Import the project in Vercel.
3. Add the environment variables in Vercel's project settings.
4. Deploy the app and access it at your provided URL.

## Security Features

- 🔐 **Authentication**: Secure user sessions with NextAuth.js and Prisma adapter.
- 🔒 **API Security**: API keys stored server-side, rate limiting (5 requests/minute/IP), and edge runtime.
- 💾 **Data Protection**: User data, emails, and subject lines securely stored in PostgreSQL with encrypted connections.
- 🌐 **Environment Variables**: Sensitive data managed securely via `.env`.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

Key points:
- ✅ You can share and adapt the code.
- ✅ You must give appropriate credit.
- ❌ Commercial use requires explicit permission from the copyright holder.

See the [LICENSE](LICENSE) file for details.

---

### **Changes Made to the README**

1. **Project Description**: Updated to reflect the app's evolution into a SaaS with multiple tools and a landing page.
2. **Features**: Added the new tools (Tone Converter, Cold Email Personalizer, Subject Line Generator), history view, authentication, and database storage.
3. **Tech Stack**: Included Prisma, PostgreSQL, NextAuth.js, and Framer Motion.
4. **Prerequisites**: Added PostgreSQL and GitHub OAuth requirements.
5. **Installation**: Incorporated Prisma setup steps (`db push` and `generate`) and updated `.env` variables.
6. **Usage**: Revised to cover sign-in, dashboard tools, and history view.
7. **Deployment**: Added environment variables for PostgreSQL and NextAuth.js.
8. **Security Features**: Highlighted authentication, database security, and existing API protections.
