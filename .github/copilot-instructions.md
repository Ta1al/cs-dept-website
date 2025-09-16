# CS Department Website - GitHub Copilot Instructions

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

This is the official Computer Science Department website built with Astro, serving as a hub for department news, events, society activities, and program information. The site features custom form fields, interactive timetables, and markdown-based content management.

## Working Effectively

### Environment Setup & Dependencies

- **Install Bun runtime**: `curl -fsSL https://bun.sh/install | bash && source ~/.bashrc`
- **Install dependencies**: `bun install` -- takes ~25 seconds. NEVER CANCEL.
- **Verify installation**: `bun --version` should show 1.2.22+

### Build & Development Commands

- **Development server**: `bun dev` -- starts at http://localhost:4321
- **Production build**: `bun run build` -- takes ~4-5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- **Preview build**: `bun run preview` -- previews production build locally
- **Type checking**: `bunx astro check` -- validates TypeScript and Astro components

### Code Quality & Validation

- **Format code**: `bun run format` -- auto-formats with Prettier
- **Check formatting**: `bun run format:check` -- validates formatting without changes
- **Lint code**: `bun run lint` -- ESLint validation, takes ~3-4 seconds
- **Fix linting**: `bun run lint:fix` -- auto-fixes ESLint issues where possible
- **Combined check**: `bun run check-format` -- runs both format:check and lint

**CRITICAL**: ALWAYS run `bun run format` and `bun run lint:fix` before committing changes or the CI (.github/workflows/code-quality.yml) will fail.

## Validation & Testing

### Manual Validation Requirements

After making ANY changes, ALWAYS:

1. **Build validation**: `bun run build` to ensure no build errors
2. **Development testing**: Start dev server with `bun dev` and test functionality
3. **Navigation testing**: Click through main navigation (Home, About, Calendar, News & Events, Timetable, Societies)
4. **Content validation**: If modifying content, verify markdown renders correctly
5. **Form testing**: If changing form fields, test event registration forms
6. **Mobile responsiveness**: Check that changes work on different screen sizes

### Key User Scenarios to Test

- **Homepage navigation**: Verify all society links and main navigation work
- **News/Events browsing**: Check that articles and events display correctly
- **Timetable functionality**: Test search, filtering, and dataset switching on `/timetable`
- **Event registration**: For events with custom form fields, test the registration flow
- **Form submissions**: Ensure forms submit properly (they go to Netlify)

### Performance Expectations

- **Install**: ~25 seconds for `bun install`
- **Build**: ~4-5 seconds for `bun run build` (much faster than typical 45+ min projects)
- **Lint**: ~3-4 seconds for `bun run lint`
- **Dev server startup**: ~1-2 seconds
- **Hot reload**: Instant for most changes

## Project Structure & Architecture

### Key Directories

```
cs-dept-website/
├── .github/workflows/       # CI/CD pipelines (code quality checks)
├── public/                  # Static assets (images, favicons)
├── src/
│   ├── components/         # Astro/React components
│   ├── content/            # Markdown content (THIS IS WHERE YOU'LL WORK!)
│   │   ├── config.ts      # Content schema definitions
│   │   ├── events/        # Event markdown files
│   │   └── news/          # News article markdown files
│   ├── layouts/           # Page templates
│   ├── pages/             # Site pages and routing
│   │   ├── timetable.astro # Interactive searchable timetable
│   │   ├── events/        # Dynamic event pages
│   │   └── news/          # Dynamic news pages
│   ├── styles/            # CSS and Tailwind styles
│   └── utils/             # Utility functions
├── astro.config.mjs       # Astro configuration
├── package.json           # Dependencies and scripts
└── netlify.toml           # Netlify deployment config
```

### Technology Stack

- **Framework**: Astro 5.13.2+ (static site generator)
- **Runtime**: Bun 1.2.22+ (faster than Node.js)
- **Styling**: Tailwind CSS 4.1.12+
- **Content**: MDX (Markdown + React components)
- **Deployment**: Netlify with form handling
- **Type Safety**: TypeScript throughout

### Content Management

- **News**: Create `.md` files in `src/content/news/` with frontmatter
- **Events**: Create `.md` files in `src/content/events/` with frontmatter and optional custom form fields
- **Forms**: Events can have custom registration fields defined in frontmatter
- **Images**: Store in `public/` directory, reference with `/image-name.jpg`

## Common Development Tasks

### Adding News Articles

1. Create new `.md` file in `src/content/news/`
2. Use descriptive filename: `new-ai-lab-opening.md`
3. Required frontmatter fields:
   ```yaml
   ---
   title: 'Article Title'
   description: 'Brief summary'
   publishDate: 2025-01-15
   category: 'announcement' # research, achievement, event, partnership, announcement
   featured: false
   author: 'Your Name'
   ---
   ```

### Adding Events with Custom Forms

1. Create new `.md` file in `src/content/events/`
2. Include custom form fields in frontmatter:
   ```yaml
   ---
   title: 'Workshop Title'
   date: 2025-02-15
   registrationRequired: true
   customFormFields:
     - name: 'experience'
       label: 'Experience Level'
       type: 'select'
       required: true
       options: ['Beginner', 'Intermediate', 'Advanced']
   ---
   ```

### Modifying Components

- **Registration forms**: Edit `src/components/RegistrationForm.astro`
- **Event cards**: Edit `src/components/EventCard.astro`
- **Navigation**: Edit navigation in layout files
- **Timetable**: Complex logic in `src/pages/timetable.astro`

### Deployment & CI/CD

- **Automatic deployment**: Netlify builds on every push to main
- **CI pipeline**: `.github/workflows/code-quality.yml` runs format and lint checks
- **Form handling**: Netlify Forms processes event registrations
- **Environment**: Production uses Netlify, development uses local Bun

## Troubleshooting & Common Issues

### Build Issues

- **Bun not found**: Run `curl -fsSL https://bun.sh/install | bash && source ~/.bashrc`
- **Dependencies out of sync**: Delete `node_modules` and run `bun install`
- **Type errors**: Run `bunx astro check` for detailed TypeScript diagnostics
- **Lint failures**: Run `bun run lint:fix` then `bun run format`

### Content Issues

- **Markdown not rendering**: Check frontmatter syntax and required fields
- **Images not loading**: Ensure images are in `public/` and paths start with `/`
- **Forms not working**: Verify form field names are unique and types are valid
- **Build failing on content**: Check that all referenced files exist

### Development Server Issues

- **Port 4321 in use**: Astro will automatically try 4322, 4323, etc.
- **Hot reload not working**: Restart dev server with `bun dev`
- **Styles not updating**: Check for CSS syntax errors in browser console

## Important Notes

### Do NOT:

- Skip formatting/linting steps - CI will fail
- Make changes without testing in dev server
- Commit without validating build succeeds
- Use Node.js commands - this project uses Bun
- Cancel long-running builds (they're actually quite fast ~4s)

### ALWAYS:

- Test navigation and core functionality after changes
- Run `bun run format` before committing
- Verify that forms still work if touching registration components
- Check that images load correctly after adding new assets
- Test the timetable search functionality if modifying related code

### CI/CD Requirements

The `.github/workflows/code-quality.yml` pipeline will fail if:

- Code is not properly formatted (Prettier)
- ESLint rules are violated
- Build fails
- TypeScript type errors exist

Success requires: `bun run format:check` and `bun run lint` to pass clean.

---

_This website features advanced functionality including real-time timetable search, custom event registration forms, and responsive design. Always test thoroughly when making changes._
