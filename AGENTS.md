<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MITRA - Setup and Deployment

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables:

### Application
- `NEXT_PUBLIC_APP_URL`: Your application URL (e.g., http://localhost:3000 for local)

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key (client-safe)
- `DATABASE_URL`: PostgreSQL connection string (server-side only, keep secret)
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations (server-side only, keep secret)

### Google Gemini
- `GEMINI_API_KEY`: Your Google Gemini API key (server-side only, keep secret)
- `GEMINI_MODEL`: The Gemini model to use (e.g., gemini-3.8-flash)

### Resend
- `RESEND_API_KEY`: Your Resend API key (server-side only, keep secret)
- `RESEND_FROM_EMAIL`: Your Resend from email address (server-side only, keep secret)

### Environment
- `NODE_ENV`: Set to 'development', 'production', or 'test'

## Database Setup

1. Run the database migrations in your Supabase SQL editor:
   - Execute `database/migrations/001_initial_schema.sql`
   - Execute `database/migrations/002_rls_policies.sql`

2. The migrations will:
   - Create all required tables (profiles, tasks, projects, goals, habits, notes, calendar_events, etc.)
   - Set up Row Level Security (RLS) policies
   - Create triggers for automatic profile creation on signup
   - Add indexes for performance

## Development

```bash
npm install
npm run dev
```

The application will be available at http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Health Checks

- Application health: `GET /api/health`
- AI service health: `GET /api/ai/health`

## Key Features Implemented

- ✅ Real Supabase database with proper schema
- ✅ Row Level Security (RLS) for user data isolation
- ✅ Server actions for all CRUD operations
- ✅ Authentication with Supabase Auth
- ✅ Real persistent data (no client-side state)
- ✅ Loading, error, and empty states
- ✅ Environment validation
- ✅ Database health checks
- ✅ AI service integration with Gemini
- ✅ TypeScript with relaxed strict mode for compatibility

## Database Schema

Tables:
- `profiles` - User profiles (extends Supabase auth.users)
- `user_preferences` - User settings and preferences
- `tasks` - Task management with status, priority, due dates
- `projects` - Project grouping for tasks
- `goals` - Long-term goals with progress tracking
- `goal_milestones` - Milestones within goals
- `habits` - Recurring habit tracking
- `habit_completions` - Habit completion records
- `notes` - Note-taking with tags and categories
- `calendar_events` - Calendar events
- `activity_logs` - User activity/event logging

## RLS Policies

All user-owned tables have RLS policies ensuring:
- Users can only view their own data
- Users can only insert their own data
- Users can only update their own data
- Users can only delete their own data
- Related tables (habit_completions, goal_milestones) use subqueries to verify ownership

## Testing Checklist

Before deploying, test:
1. [ ] User signup and login
2. [ ] Create/read/update/delete tasks
3. [ ] Create/read/update/delete projects
4. [ ] Create/read/update/delete goals
5. [ ] Create/read/update/delete habits
6. [ ] Create/read/update/delete notes
7. [ ] Create/read/update/delete calendar events
8. [ ] Data persistence after page refresh
9. [ ] User isolation (User A cannot access User B's data)
10. [ ] Gemini API connection (via /api/ai/health)
11. [ ] Database connectivity (via /api/health)
12. [ ] Production build succeeds

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy
5. Test production environment

Required Vercel environment variables:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NODE_ENV` (set to production)

## Important Notes

- Never commit `.env.local` to version control
- Never expose server-side secrets to client-side code
- All AI operations go through server-side service
- RLS policies are enforced at the database level
- The application uses real data - no mock/fake data in production

## Development Workflow

**Important:** This repository is connected to Vercel for automatic deployment. When making changes:

1. Make your code changes
2. Automatically commit and push to GitHub (Devin will handle this)
3. Vercel will automatically detect the push and deploy the update
4. Monitor deployment at https://vercel.com

**Commit Message Format:**
```
type: description

- change 1
- change 2

Generated with [Devin](https://devin.ai)

Co-Authored-By: Devin <158243242+devin-ai-integration[bot]@users.noreply.github.com>
```

**Commit Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `docs:` Documentation changes
- `style:` Code style changes
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
