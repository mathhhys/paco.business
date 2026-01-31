# 🎰 Lucky Roulette - Random Name Generator

A casino-style roulette random name generator powered by Next.js, TypeScript, and Supabase.

## Features

- 🎰 Casino-style roulette with spinning animation
- 🖼️ Display associated images for last names
- ✨ Beautiful casino theme with gold, red, and black colors
- 📱 Fully responsive design
- ⚡ Smooth animations powered by Framer Motion
- 🔗 Connected to Supabase for dynamic data

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Animation**: Framer Motion

## Setup Instructions

### 1. Clone and Install

```bash
cd casino-roulette
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Run the following SQL to create the tables:

```sql
-- Create first_names table
create table first_names (
  id uuid default gen_random_uuid() primary key,
  name text not null
);

-- Create last_names table with image URLs
create table last_names (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  image_url text not null
);

-- Enable Row Level Security (optional but recommended)
alter table first_names enable row level security;
alter table last_names enable row level security;

-- Create policies for public read access
create policy "Allow public read access" on first_names
  for select using (true);

create policy "Allow public read access" on last_names
  for select using (true);
```

4. Insert some sample data:

```sql
-- Insert sample first names
insert into first_names (name) values 
  ('James'), ('Mary'), ('John'), ('Patricia'), ('Robert'),
  ('Jennifer'), ('Michael'), ('Linda'), ('William'), ('Elizabeth');

-- Insert sample last names with images
insert into last_names (name, image_url) values 
  ('Smith', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
  ('Johnson', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'),
  ('Williams', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'),
  ('Brown', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'),
  ('Jones', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400');
```

### 3. Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to Project Settings → API in your Supabase dashboard
   - Copy the `Project URL` and `anon public` API key

3. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### first_names
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | First name |

### last_names
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Last name |
| image_url | text | URL to associated image |

## Customization

### Styling
- Modify Tailwind classes in components to change colors
- The casino theme uses: `red-500/600/700`, `yellow-400/500/600`, `gray-800/900`, `black`

### Animation Speed
- Adjust `spinDuration` prop in `RouletteColumn` component (default: 3000ms)

### Images
- Store images in Supabase Storage for better performance
- Or use any external image URL

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Make sure to set the environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## License

MIT
