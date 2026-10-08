# MITRA - Your Personal AI Companion

MITRA is an AI-powered personal productivity and life-management platform that understands how you work and helps you achieve your goals.

## Status

**Phases Completed:**
- ✅ Phase 0: Foundation (Next.js, TypeScript, Tailwind, Supabase, Gemini setup)
- ✅ Phase 1: Authentication + Application Shell (Login, Signup, Sidebar, Navigation, Settings)
- ✅ Phase 2: Core Productivity (Tasks, Projects, Goals, Habits, Calendar, Notes)
- ✅ Phase 3: Dashboard (Rich dashboard with metrics and AI insights)

**Phases Pending:**
- ⏳ Phase 3: Activity logging system
- ⏳ Phase 3: Analytics engine
- ⏳ Phase 4: AI Companion chat interface
- ⏳ Phase 4: AI context retrieval and recommendations
- ⏳ Phase 5: Recommendation engine
- ⏳ Phase 5: Prediction engine
- ⏳ Phase 6: Knowledge graph
- ⏳ Phase 7: What-if simulation
- ⏳ Phase 8: Document intelligence
- ⏳ Phase 9: Advanced integrations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier)
- A Google Gemini API key (free tier)

### Installation

1. Clone or navigate to the project directory:
```bash
cd "C:\Users\Aman Negi\Desktop\Mitra AI"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
NODE_ENV=development
```

### Setting Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project settings, find:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Anon/public key (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
   - Service role key (SUPABASE_SERVICE_ROLE_KEY)
3. Update your `.env.local` with these values

### Setting Up Gemini API

1. Go to [AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` as `GEMINI_API_KEY`

### Running the Application

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Current Features

### Authentication
- Sign up with email/password
- Login with email/password
- Logout
- Protected routes (redirect to login if not authenticated)

### Core Productivity
- **Tasks**: Create, edit, delete, complete tasks with priorities and due dates
- **Projects**: Manage projects with deadlines and priorities
- **Goals**: Set long-term goals with progress tracking
- **Habits**: Track daily habits with streaks
- **Calendar**: View and manage events in a monthly calendar
- **Notes**: Create notes with tags and categories, search functionality

### Dashboard
- Overview of tasks, projects, goals, habits, and notes
- AI-powered insights (currently static)
- Upcoming deadlines
- Recent activity
- Time-based greeting

### Settings
- Profile management
- Theme selection
- Timezone configuration

## Design Philosophy

MITRA follows a minimalistic, Apple-like design aesthetic:
- Clean typography (Inter font)
- Subtle animations
- Clear visual hierarchy
- Responsive layout
- Polished cards and components
- Excellent empty states

## Architecture

- **Frontend**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Authentication**: Supabase Auth
- **State Management**: React hooks (currently client-side)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Sidebar, Header)
│   └── ...
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client configuration
│   ├── ai/               # AI service (Gemini)
│   ├── auth/             # Auth configuration
│   ├── validation/       # Zod schemas
│   └── utils.ts          # Utility functions
├── server/               # Server-side code
│   ├── services/         # Business logic
│   ├── repositories/     # Data access layer
│   └── actions/          # Server actions
├── types/                # TypeScript types
│   └── database.ts       # Database type definitions
└── database/             # Database migrations and seeds
```

## Next Steps

To make MITRA fully functional:

1. **Database Setup**: Run Supabase migrations to create tables for tasks, projects, goals, habits, etc.
2. **Connect to Supabase**: Replace client-side state with actual Supabase calls
3. **Implement Activity Logging**: Track user actions for analytics
4. **Build Analytics Engine**: Calculate productivity metrics
5. **Implement AI Chat**: Create chat interface with context retrieval
6. **Add Recommendation Engine**: Provide intelligent task prioritization
7. **Build Knowledge Graph**: Visualize connections between data

## Known Limitations

- Currently uses client-side state (data resets on refresh)
- AI features require Supabase and Gemini credentials
- Analytics and advanced AI features not yet implemented
- No database migrations included yet

## Contributing

This is a personal project following the specifications in `prompt.txt`. Future development will follow the phased approach outlined in the documentation.

## License

Private project - All rights reserved
# Mitra-AI
