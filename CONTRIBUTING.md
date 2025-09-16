# Contributing to CS Department Website

Thank you for your interest in contributing to the CS Department website! This guide will help you get started and ensure smooth collaboration.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.0 or higher)
- Bun (recommended) or npm/yarn
- Git
- A text editor (VS Code recommended)

### First-Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cs-dept-website.git
   cd cs-dept-website
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Ta1al/cs-dept-website.git
   ```
4. **Install dependencies**:
   ```bash
   bun install
   ```
5. **Start development server**:
   ```bash
   bun dev
   ```

## 📝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Content**: Adding news articles, events, updating information
- **Features**: New functionality, components, or improvements
- **Bug fixes**: Resolving issues and improving stability
- **Documentation**: Improving guides, adding examples
- **Design**: UI/UX improvements and responsive design
- **Performance**: Optimization and accessibility improvements

### Content Contributions

#### Adding News Articles

1. **Create a new file** in `src/content/news/` with format: `YYYY-MM-DD-article-title.md`
2. **Use proper frontmatter**:
   ```yaml
   ---
   title: 'Your Article Title'
   description: 'Brief summary (1-2 sentences)'
   publishDate: 2025-08-28
   category: 'announcement' # research, achievement, event, partnership, announcement
   featured: false
   author: 'Your Name'
   image: '/path/to/image.jpg' # Optional
   tags: ['tag1', 'tag2'] # Optional
   ---
   ```
3. **Write content** in Markdown below the frontmatter
4. **Test locally** with `bun dev`

#### Adding Events

1. **Create a new file** in `src/content/events/` with format: `YYYY-MM-DD-event-name.md`
2. **Use proper frontmatter**:
   ```yaml
   ---
   title: 'Event Name'
   description: 'Brief description'
   date: 2025-09-15
   time: '2:00 PM'
   endTime: '5:00 PM' # Optional
   location: 'Room 101, CS Building'
   type: 'workshop' # workshop, conference, competition, seminar, hackathon, meetup
   registrationRequired: true
   organizer: 'CS Department'
   society: 'ps' # Optional: cms, pas, ps, sports, egaming, ems, blood-donation
   capacity: 100 # Optional
   customFormFields: # Optional: event-specific registration fields
     - name: 'experience'
       label: 'Experience Level'
       type: 'select'
       required: true
       options: ['Beginner', 'Intermediate', 'Advanced']
   ---
   ```
3. **Add event details** in Markdown
4. **Test registration form** if applicable

### Code Contributions

#### Development Workflow

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow existing code style and patterns
   - Write clean, readable code with comments when necessary
   - Test thoroughly in development mode

3. **Run code quality checks**:

   ```bash
   bun run format       # Format code with Prettier
   bun run lint:fix     # Fix ESLint issues
   bun run build        # Ensure build succeeds
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add new component for event registration"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

#### Code Style Guidelines

- **TypeScript**: Use TypeScript for all new JavaScript code
- **Components**: Follow Astro component conventions
- **Styling**: Use Tailwind CSS classes for styling
- **Naming**: Use descriptive names for files, variables, and functions
- **Comments**: Add comments for complex logic or business rules
- **Accessibility**: Ensure components are accessible (WCAG 2.1 AA)

#### Component Development

When creating new components:

1. **Location**: Place in `src/components/`
2. **Naming**: Use PascalCase (e.g., `EventCard.astro`)
3. **Props**: Define TypeScript interfaces for props
4. **Styling**: Use Tailwind CSS classes
5. **Responsiveness**: Ensure mobile-first responsive design
6. **Accessibility**: Include proper ARIA labels and semantic HTML

Example component structure:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-semibold text-gray-900">{title}</h3>
  {description && <p class="mt-2 text-gray-600">{description}</p>}
</div>
```

## 🔧 Development Guidelines

### File Organization

- **Components**: `src/components/ComponentName.astro`
- **Pages**: `src/pages/page-name.astro`
- **Layouts**: `src/layouts/LayoutName.astro`
- **Content**: `src/content/collection/item-name.md`
- **Utilities**: `src/utils/utilityName.ts`
- **Styles**: `src/styles/filename.css`

### Content Guidelines

- **Markdown**: Use proper Markdown syntax and structure
- **Images**: Optimize images for web (WebP format preferred)
- **Links**: Use relative links for internal pages
- **Frontmatter**: Always include required frontmatter fields
- **Dates**: Use YYYY-MM-DD format for consistency

### Testing Your Changes

Before submitting a pull request:

1. **Test locally**:

   ```bash
   bun dev  # Test in development mode
   bun build && bun preview  # Test production build
   ```

2. **Check different pages**:
   - Homepage
   - News listing and individual articles
   - Events listing and individual events
   - Navigation and responsive design

3. **Verify form functionality** (if applicable):
   - Registration forms
   - Field validation
   - Success/error states

4. **Code quality**:
   ```bash
   bun run format:check
   bun run lint
   bun run build
   ```

## 📋 Pull Request Process

### Before Submitting

- [ ] Code is properly formatted (`bun run format`)
- [ ] No linting errors (`bun run lint`)
- [ ] Build succeeds (`bun run build`)
- [ ] Changes tested locally
- [ ] Documentation updated (if needed)
- [ ] Commit messages are descriptive

### Pull Request Guidelines

1. **Title**: Use descriptive titles (e.g., "Add event registration validation component")
2. **Description**: Explain what the PR does and why
3. **Screenshots**: Include screenshots for UI changes
4. **Testing**: Describe how you tested the changes
5. **Breaking Changes**: Note any breaking changes
6. **Related Issues**: Reference relevant issues

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Content update
- [ ] Documentation update
- [ ] Code refactoring

## Testing

How did you test these changes?

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Changes tested locally
- [ ] Documentation updated
- [ ] No merge conflicts
```

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Collaborate openly and transparently

### Communication

- **Issues**: Use GitHub issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Pull Requests**: Provide clear descriptions and be responsive to feedback

### Getting Help

- **Documentation**: Check existing documentation first
- **Search**: Look through existing issues and discussions
- **Ask Questions**: Don't hesitate to ask for help in discussions
- **Contact**: Reach out to maintainers for complex issues

## 🎯 Common Tasks

### Adding a Custom Form Field

See [CUSTOM_FORMS.md](./CUSTOM_FORMS.md) for detailed instructions.

### Updating Event Information

1. Find the event file in `src/content/events/`
2. Update the frontmatter or content
3. Test the changes locally
4. Submit a pull request

### Adding New Society Pages

1. Create new `.astro` file in `src/pages/societies/`
2. Follow existing society page structure
3. Add navigation links if needed
4. Test responsive design

### Optimizing Images

1. Use WebP format when possible
2. Compress images using tools like [TinyPNG](https://tinypng.com/)
3. Use appropriate dimensions (max 1920px width)
4. Store in `public/` directory
5. Reference with `/image-name.webp` in content

## 📚 Resources

- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Markdown Guide**: [markdownguide.org](https://www.markdownguide.org)
- **MDX Documentation**: [mdxjs.com](https://mdxjs.com)
- **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org/docs)

## 🚀 Advanced Contributions

### Performance Optimization

- Optimize images and assets
- Implement lazy loading
- Minimize bundle size
- Improve Core Web Vitals

### Accessibility Improvements

- Ensure proper heading structure
- Add ARIA labels where needed
- Test with screen readers
- Maintain sufficient color contrast

### SEO Enhancements

- Optimize meta tags
- Implement structured data
- Improve page load times
- Add proper sitemaps

---

Thank you for contributing to the CS Department website! Your contributions help create a better experience for students, faculty, and visitors.
