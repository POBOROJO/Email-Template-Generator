# Professional Email Generator

A Next.js application that generates professional emails using Google's Gemini AI. The app helps users create well-structured emails for different purposes like meeting requests, follow-ups, and thank you notes.

## Features

- 🎯 Purpose-specific email generation
- 💡 Smart key points integration
- 🎨 Clean, modern UI with Tailwind CSS
- 🔒 Secure API handling with rate limiting
- ⚡ Edge runtime for optimal performance

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini AI
- LangChain
- React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Google API key for Gemini AI (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

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
   - Add your Google API key:
```bash
GOOGLE_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter the recipient's name
2. Select the email purpose (Meeting Request, Follow Up, or Thank You)
3. Enter key points for the email (comma-separated)
4. Click "Generate Email"
5. Copy and customize the generated email as needed

## Deployment

### Environment Variables

When deploying, make sure to set the following environment variable in your deployment platform:

- `GOOGLE_API_KEY`: Your Google Gemini AI API key

### Deploy on Vercel

The easiest way to deploy the app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import the project in Vercel
3. Add the environment variable in Vercel's project settings
4. Deploy!

## Security Features

- API key is securely stored server-side
- Rate limiting to prevent abuse (5 requests per minute per IP)
- Environment variables properly secured
- Edge runtime for enhanced security and performance

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

Key points:
- ✅ You can share and adapt the code
- ✅ You must give appropriate credit
- ❌ Commercial use requires explicit permission from the copyright holder

See the [LICENSE](LICENSE) file for details.
