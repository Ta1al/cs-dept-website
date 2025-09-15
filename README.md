[![Netlify Status](https://api.netlify.com/api/v1/badges/0c1f2cae-cb76-47c1-8632-86c7644d9257/deploy-status)](https://app.netlify.com/projects/csdeptuos/deploys)

# CS Department Website

This is the official website for the Computer Science Department, built with Astro. This site serves as a hub for department news, events, society activities, and program information.

## 🆕 Latest Features

- **Custom Form Fields**: Add event-specific registration fields directly in markdown
- **Smart Form Validation**: Automatic validation for required fields and data types
- **Enhanced Event Management**: Streamlined event creation with custom registration
- **AI Content Generation**: Use LLMs to quickly generate events with custom forms
- **Interactive Timetable**: New `/timetable` page with instant search, multi-dataset switching, and day / semester / program filters

> Timetable quick use: Go to `/timetable`, pick a dataset (e.g. `full_parsed2`), optionally click day / semester / program pills to narrow, and just start typing — results update on every key press across all fields (course, code, teacher, room, etc.).

## 📚 Table of Contents

- [CS Department Website](#cs-department-website)
  - [🆕 Latest Features](#-latest-features)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ How the Website Works](#️-how-the-website-works)
    - [Project Structure](#project-structure)
  - [📰 Adding News Articles](#-adding-news-articles)
  - [🎉 Adding Events](#-adding-events)
  - [📋 Registration Forms \& Custom Fields](#-registration-forms--custom-fields)
    - [Basic Registration](#basic-registration)
    - [Custom Form Fields 🆕](#custom-form-fields-)
    - [Form Submission](#form-submission)
  - [🔧 Using MDX for Enhanced Content](#-using-mdx-for-enhanced-content)
    - [When to Use MDX:](#when-to-use-mdx)
    - [MDX Example:](#mdx-example)
  - [🤖 Using AI/LLMs to Generate Content](#-using-aillms-to-generate-content)
    - [Generating News Articles:](#generating-news-articles)
    - [Generating Events:](#generating-events)
    - [AI Content Generation Tips:](#ai-content-generation-tips)
    - [Sample AI Prompts:](#sample-ai-prompts)
  - [🚀 Development Commands](#-development-commands)
  - [🔧 Quick Start Guide](#-quick-start-guide)
  - [📝 Content Guidelines](#-content-guidelines)
  - [🆘 Need Help?](#-need-help)

## 🏗️ How the Website Works

The website is built using **Astro**, a modern web framework that generates fast, content-focused websites. Here's what you need to know:

- **Static Site Generation**: The website pre-builds all pages for fast loading
- **Content Management**: News and events are written in Markdown (.md) or MDX (.mdx) files with metadata
- **Component-Based**: Reusable UI components for consistent design
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **MDX Support**: Enhanced Markdown with React components for interactive content

### Project Structure

```text
cs-dept-website/
├── .github/                  # GitHub workflows and templates
│   └── workflows/           # CI/CD automation
├── .vscode/                 # VS Code settings
├── public/                  # Static assets (images, icons, etc.)
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   │   ├── EventRegistration.astro
│   │   ├── RegistrationForm.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ...
│   ├── content/             # Content management (THIS IS WHERE YOU'LL WORK!)
│   │   ├── config.ts       # Content collection schemas
│   │   ├── events/         # Event markdown files (.md/.mdx)
│   │   └── news/           # News article markdown files (.md/.mdx)
│   ├── layouts/            # Page layout templates
│   │   ├── BaseLayout.astro
│   │   ├── EventLayout.astro
│   │   └── NewsLayout.astro
│   ├── pages/              # Website pages and routing
│   │   ├── index.astro     # Homepage
│   │   ├── about.astro     # About page
│   │   ├── calendar.astro  # Events calendar
│   │   ├── timetable.astro # Interactive searchable timetable
│   │   ├── events/         # Event detail pages
│   │   │   └── [slug].astro
│   │   ├── news/           # News article pages
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── societies/      # Society pages
│   │       ├── cms.astro
│   │       ├── ps.astro
│   │       └── ...
│   ├── styles/             # CSS and styling
│   │   └── global.css
│   └── utils/              # Utility functions
│       └── registrationForm.ts
├── astro.config.mjs         # Astro configuration
├── eslint.config.js         # ESLint configuration
├── netlify.toml            # Netlify deployment settings
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── README.md              # This file
├── CONTRIBUTING.md        # Contribution guidelines
├── DEPLOYMENT.md          # Deployment instructions
├── CUSTOM_FORMS.md        # Custom form fields guide
├── FORM_EXAMPLES.md       # Form implementation examples
└── FORMS_QUICK_REF.md     # Developer form reference
```

**Key Directories Explained:**

- **`src/content/`**: All website content (news, events) in Markdown format
- **`src/components/`**: Reusable UI components used across pages
- **`src/pages/`**: Website routes and page templates
- **`src/layouts/`**: Common page layouts for consistent design
- **`public/`**: Static files served directly (images, favicons, etc.)
- **`.github/workflows/`**: Automated testing and deployment

## 📰 Adding News Articles

To add a new news article:

1. Create a new `.md` or `.mdx` file in `src/content/news/`
2. Name it descriptively (e.g., `new-lab-opening.md`)
3. Add the required frontmatter (metadata) at the top:

```markdown
---
title: 'Your Article Title'
description: 'Brief summary of the article'
publishDate: 2025-08-28 # Format: YYYY-MM-DD
category: 'announcement' # Options: research, achievement, event, partnership, announcement
featured: false # Set to true for homepage feature
author: 'Your Name'
image: '/path/to/image.jpg' # Optional
tags: ['tag1', 'tag2'] # Optional
---

# Your Article Content

Write your article content here using Markdown...
```

**Category Options:**

- `research`: Research publications, discoveries
- `achievement`: Student/faculty achievements, awards
- `event`: Department events, seminars
- `partnership`: Industry partnerships, collaborations
- `announcement`: General announcements, policy changes

## 🎉 Adding Events

To add a new event:

1. Create a new `.md` or `.mdx` file in `src/content/events/`
2. Name it descriptively (e.g., `hackathon-2025.md`)
3. Add the required frontmatter:

```markdown
---
title: 'Event Name'
description: 'Brief description of the event'
date: 2025-09-15 # Event date (YYYY-MM-DD)
time: '2:00 PM' # Start time
endTime: '5:00 PM' # End time (optional)
location: 'Room 101, CS Building'
type: 'workshop' # Options: workshop, conference, competition, seminar, hackathon, meetup
registrationRequired: true
registrationLink: 'https://forms.example.com' # Optional
organizer: 'CS Department'
society: 'ps' # Optional: cms, pas, ps, sports, egaming, ems, blood-donation
capacity: 100 # Optional
image: '/event-image.jpg' # Optional
---

# Event Details

Detailed description of your event...

## Agenda

- 2:00 PM - Opening
- 3:00 PM - Main session
- ...
```

**Event Types:**

- `workshop`: Hands-on learning sessions
- `conference`: Academic conferences
- `competition`: Coding competitions, contests
- `seminar`: Guest lectures, presentations
- `hackathon`: Programming marathons
- `meetup`: Society gatherings, informal meetings

**Society Codes:**

- `cms`: Computing Media Society
- `pas`: Performing Arts Society
- `ps`: Programming Society
- `sports`: Sports Society
- `egaming`: E-Gaming Society
- `ems`: Event Management Society
- `blood-donation`: Blood Donation & Welfare Society

## 📋 Registration Forms & Custom Fields

Events can have custom registration forms with fields tailored to each event's needs. The website includes a flexible registration system that automatically generates forms.

### Basic Registration

For simple registration with a standard form, add these fields to your event frontmatter:

```yaml
registrationRequired: true
formSubmitUrl: 'https://your-backend.com/register' # Optional custom endpoint
```

### Custom Form Fields 🆕

You can now add custom form fields directly in your event markdown! The system automatically includes required default fields (Full Name, Email, Phone, Student ID, Gender) and adds your custom fields.

**Example Event with Custom Fields:**

```yaml
---
title: 'Advanced React Workshop'
# ... other event fields
customFormFields:
  - name: 'reactExperience'
    label: 'React Experience Level'
    type: 'select'
    required: true
    options:
      - 'Complete Beginner'
      - 'Basic (< 1 year)'
      - 'Intermediate (1-3 years)'
      - 'Advanced (3+ years)'

  - name: 'projectGoals'
    label: 'What do you want to build?'
    type: 'textarea'
    required: true
    placeholder: 'Describe your project goals...'

  - name: 'laptopOS'
    label: 'Laptop Operating System'
    type: 'select'
    required: true
    options: ['Windows', 'macOS', 'Linux', 'I need a lab computer']
---
```

**Supported Field Types:**

- `text`: Single-line text input
- `email`: Email validation
- `tel`: Phone number input
- `number`: Numeric input
- `select`: Dropdown menu (requires `options` array)
- `textarea`: Multi-line text area

**Field Properties:**

- `name`: Unique identifier (required)
- `label`: Display text (required)
- `type`: Field type (required)
- `required`: Whether field is mandatory (default: false)
- `placeholder`: Helper text
- `options`: Array of choices for select fields

**Default Required Fields (Always Included):**

1. Full Name
2. Email Address
3. Phone Number
4. Student ID
5. Gender (Male/Female)

### Form Submission

Forms submit to either:

- Custom endpoint: Set `formSubmitUrl` in event frontmatter
- Default endpoint: Built-in form handler

**Submitted Data Structure:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "studentId": "CS123456",
  "gender": "Male",
  "reactExperience": "Intermediate (1-3 years)",
  "projectGoals": "Build a portfolio website",
  "laptopOS": "macOS",
  "eventId": "advanced-react-workshop",
  "submittedAt": "2025-08-28T15:30:00.000Z"
}
```

## 🧩 Component Documentation

The website uses reusable Astro components for consistent design and functionality. Here's an overview of the main components:

### Core Components

#### Header.astro

**Purpose**: Main navigation header with logo and menu
**Location**: `src/components/Header.astro`
**Features**:

- Responsive navigation
- Active route highlighting
- Mobile-friendly burger menu
- University logo integration

**Usage**:

```astro
---
import Header from '../components/Header.astro';
---

<Header />
```

#### Footer.astro

**Purpose**: Site footer with links and information
**Location**: `src/components/Footer.astro`
**Features**:

- Contact information
- Quick links
- Social media links
- University branding

#### Hero.astro

**Purpose**: Homepage hero section
**Location**: `src/components/Hero.astro`
**Features**:

- Animated text effects
- Call-to-action buttons
- Responsive design
- Gradient backgrounds

### Form Components

#### RegistrationForm.astro

**Purpose**: Configurable event registration forms
**Location**: `src/components/RegistrationForm.astro`
**Features**:

- Custom form fields
- Validation
- Multiple field types (text, select, textarea)
- Netlify form integration

**Usage**:

```astro
---
import RegistrationForm from '../components/RegistrationForm.astro';
---

<RegistrationForm
  eventTitle="Workshop Name"
  eventId="workshop-2025"
  customFields={[
    {
      name: 'experience',
      label: 'Experience Level',
      type: 'select',
      required: true,
      options: ['Beginner', 'Intermediate', 'Advanced'],
    },
  ]}
/>
```

#### EventRegistration.astro

**Purpose**: Wrapper component for event registration
**Location**: `src/components/EventRegistration.astro`
**Props**:

- `eventTitle` (string): Event name
- `eventType` (string): workshop, hackathon, conference, etc.
- `eventId` (string): Unique identifier

**Usage**:

```astro
---
import EventRegistration from '../components/EventRegistration.astro';
---

<EventRegistration
  eventTitle="Python Workshop"
  eventType="workshop"
  eventId="python-workshop-2025"
/>
```

### Content Components

#### SocietyEvents.astro

**Purpose**: Display society-specific events
**Location**: `src/components/SocietyEvents.astro`
**Features**:

- Filter events by society
- Event cards with registration
- Responsive grid layout

### Utility Components

#### ScrollAnimator.astro

**Purpose**: Scroll-based animations
**Location**: `src/components/ScrollAnimator.astro`
**Features**:

- Intersection Observer API
- CSS animation triggers
- Performance optimized

#### HeaderController.astro

**Purpose**: Controls header behavior
**Location**: `src/components/HeaderController.astro`
**Features**:

- Scroll-based header visibility
- Mobile menu state management

### Creating New Components

When creating new components, follow these guidelines:

1. **File Location**: Place in `src/components/`
2. **Naming Convention**: Use PascalCase (e.g., `MyComponent.astro`)
3. **TypeScript Props**: Define interfaces for props
4. **Responsive Design**: Use Tailwind CSS classes
5. **Accessibility**: Include proper ARIA labels

**Component Template**:

```astro
---
export interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const { title, description, variant = 'primary' } = Astro.props;

const variantClasses = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-200 text-gray-900',
};
---

<div class={`p-4 rounded-lg ${variantClasses[variant]}`}>
  <h3 class="text-lg font-semibold">{title}</h3>
  {description && <p class="mt-2 text-sm opacity-90">{description}</p>}
  <slot />
</div>
```

For detailed component examples and form integration, see:

- [CUSTOM_FORMS.md](./CUSTOM_FORMS.md) - Custom form field implementation
- [FORM_EXAMPLES.md](./FORM_EXAMPLES.md) - Complete form examples
- [FORMS_QUICK_REF.md](./FORMS_QUICK_REF.md) - Developer reference

## 🔧 Using MDX for Enhanced Content

The website supports **MDX** (`.mdx` files), which allows you to use interactive components within your Markdown content. This is useful for:

### When to Use MDX:

- **Interactive Elements**: Embed forms, buttons, or interactive components
- **Custom Styling**: Use React components for special layouts
- **Dynamic Content**: Display data from APIs or databases
- **Rich Media**: Embed complex visualizations or interactive demos

### MDX Example:

```mdx
---
title: 'Interactive Workshop Guide'
description: 'A hands-on guide with interactive elements'
publishDate: 2025-08-28
category: 'workshop'
---

import { RegistrationForm } from '../components/RegistrationForm.astro';

# Interactive Workshop

This workshop includes hands-on coding exercises.

<RegistrationForm eventTitle="Coding Workshop" eventId="workshop-2025" />

## Code Example

Here's an interactive example you can try:

function greet(name) {
return `Hello, ${name}!`;
}

Regular Markdown content works normally in MDX files.
```

**Note**: Use regular `.md` files for simple content and `.mdx` when you need interactive components.

## 🤖 Using AI/LLMs to Generate Content

You can leverage AI tools like ChatGPT, Claude, or GitHub Copilot to help create content efficiently:

### Generating News Articles:

**Prompt Template for News:**

```
Create a news article for a Computer Science department website about [topic].

Format the response with proper frontmatter followed by the article content.

Required frontmatter fields:
---
title: "Engaging Article Title"
description: "Brief 1-2 sentence summary"
publishDate: 2025-08-28
category: "announcement"  # Choose: research, achievement, event, partnership, announcement
featured: false  # Set to true only for major announcements
author: "Your Name"
---

Article requirements:
- Professional tone suitable for CS students and faculty
- 300-500 words
- Use Markdown formatting (headers, lists, links, etc.)
- Include specific details and actionable information
- End with relevant contact information if applicable

Topic: [Describe your news topic here]
```

**Example Prompt:**

```
Create a news article for a Computer Science department website about a new AI research lab opening. Include details about equipment, research focus, and student opportunities.
```

### Generating Events:

**Prompt Template for Events:**

```
Create an event listing for a Computer Science department website.

Format the response with proper frontmatter followed by the event description.

Required frontmatter fields:
---
title: "Event Name"
description: "Brief description of what attendees will learn/do"
date: 2025-09-15  # Event date (YYYY-MM-DD)
time: "2:00 PM"
endTime: "5:00 PM"  # Optional
location: "Specific room/building location"
type: "workshop"  # Choose: workshop, conference, competition, seminar, hackathon, meetup
registrationRequired: true
formSubmitUrl: "https://example.com/register"  # Optional custom endpoint
organizer: "Department/Society Name"
society: "ps"  # Optional: cms, pas, ps, sports, egaming, ems, blood-donation
capacity: 50  # Optional
customFormFields:  # Optional: Add event-specific registration fields
  - name: "experience"
    label: "Experience Level"
    type: "select"
    required: true
    options: ["Beginner", "Intermediate", "Advanced"]
  - name: "goals"
    label: "Learning Goals"
    type: "textarea"
    required: false
    placeholder: "What do you hope to achieve?"
---

Event details to include:
- Event: [event name and type]
- Date & Time: [when and duration]
- Target Audience: [who should attend]
- Prerequisites: [any requirements]
- What to bring: [if applicable]

Content requirements:
- Detailed event description
- Clear agenda with timeline
- Learning objectives or outcomes
- Registration form fields relevant to the event
- Contact information for questions
```

### AI Content Generation Tips:

1. **Be Specific with Details**: Provide exact dates, times, locations, and requirements
2. **Request Complete Frontmatter**: Ask for the full YAML frontmatter block with all required fields
3. **Specify Content Structure**: Request specific sections like agenda, prerequisites, contact info
4. **Review and Customize**: Always verify dates, links, and department-specific information
5. **Check Field Values**: Ensure categories and types match the allowed options exactly
6. **Add Missing Information**: Fill in any placeholder links, contact details, or specific requirements
7. **Validate Formatting**: Make sure the frontmatter uses correct YAML syntax with proper quotes and dates

### Sample AI Prompts:

**For Workshop Events:**

```
Create an event listing for a "Python for Beginners" workshop.

Event details:
- Date: Next Friday (September 1, 2025)
- Time: 6:00 PM - 8:00 PM
- Location: CS Lab 101
- Capacity: 30 people maximum
- Registration required with custom fields
- Target: Complete beginners to programming

Custom registration fields needed:
- Programming experience level (dropdown)
- Laptop availability (yes/no dropdown)
- Learning goals (optional text area)
- Dietary restrictions for refreshments (optional text)

Include hands-on coding exercises and laptop requirements in the description.
```

**For Achievement News:**

```
Create a news article about CS student Sarah Ahmed winning first place in the National Cybersecurity Competition.

Details to include:
- Competition was held at University of Technology
- She competed against 150+ students nationwide
- Prize was $5000 and internship opportunity
- Her project focused on network security algorithms
- Make it inspiring for other students
- Include quote from department head if possible
```

**For Research News:**

```
Create a news article about a new research partnership between our CS department and TechCorp Inc.

Partnership details:
- Focus: Machine learning applications in healthcare
- Duration: 3-year collaboration
- Funding: $500K research grant
- Student opportunities: 10 paid internship positions
- Faculty lead: Dr. Jane Smith
- Include application process for interested students
```

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **Bun** (recommended) or **npm/yarn** - [Install Bun](https://bun.sh/docs/installation)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ta1al/cs-dept-website.git
   cd cs-dept-website
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Start the development server**

   ```bash
   # Using Bun
   bun dev

   # Or using npm
   npm run dev

   # Or using yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321` to see the website

### Development Commands

All commands are run from the project root:

| Command       | Action                                       |
| :------------ | :------------------------------------------- |
| `bun install` | Install dependencies (first time setup)      |
| `bun dev`     | Start development server at `localhost:4321` |
| `bun build`   | Build production site to `./dist/`           |
| `bun preview` | Preview production build locally             |

### Code Quality & Formatting

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `bun run format`       | Format all files with Prettier                   |
| `bun run format:check` | Check if files are properly formatted            |
| `bun run lint`         | Run ESLint to check for code issues              |
| `bun run lint:fix`     | Fix ESLint issues automatically (where possible) |
| `bun run check-format` | Run both formatting and linting checks           |

**Important**: Pull requests automatically check code formatting and linting. Always run `bun run format` and `bun run lint:fix` before submitting your changes.

### Troubleshooting

**Common Issues:**

1. **Port 4321 already in use**
   - Stop any existing development servers
   - Or change the port: `bun dev --port 3000`

2. **Dependencies not installing**
   - Clear cache: `bun install --force` or `rm -rf node_modules && bun install`
   - Ensure you have the latest version of Bun

3. **Build failures**
   - Check that all content files have proper frontmatter
   - Run `bun run lint:fix` to fix common issues
   - Verify TypeScript types with `bun run astro check`

## 🔧 Quick Start Guide

1. **Clone and setup** (see Installation Steps above)
2. **Make your first content change**:
   - Edit an existing news article in `src/content/news/`
   - Or create a new event in `src/content/events/`
3. **See changes instantly** in your browser (hot reload enabled)
4. **Follow code quality checks** before committing
5. **Read the contribution guidelines** in [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📝 Content Guidelines

- **Write in Markdown or MDX**: Use `.md` for simple content, `.mdx` for interactive elements
- **Use descriptive filenames**: `ai-workshop-2025.md` not `event1.md`
- **Include all required fields**: Check the examples above
- **Add custom form fields**: Use `customFormFields` for event-specific registration
- **Optimize images**: Keep image files under 1MB
- **Test your content**: Always run `bun dev` to preview changes
- **Leverage AI tools**: Use LLMs to help generate initial content with custom forms
- **Review AI content**: Always verify and edit AI-generated content for accuracy
- **Validate form fields**: Ensure field names are unique and types are correct

## 🆘 Need Help?

- **Getting Started**: [Installation & Setup](#-installation--setup)
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md) - Complete contributor guide
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions for all platforms
- **Markdown Guide**: [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- **MDX Documentation**: [MDX Guide](https://mdxjs.com/docs/)
- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **Custom Form Fields**: [CUSTOM_FORMS.md](./CUSTOM_FORMS.md) - Comprehensive guide with examples
- **Form Examples**: [FORM_EXAMPLES.md](./FORM_EXAMPLES.md) - Complete real-world examples
- **Form Quick Reference**: [FORMS_QUICK_REF.md](./FORMS_QUICK_REF.md) - Developer reference
- **Component Documentation**: [Component Documentation](#-component-documentation)
- **AI Content Tools**: ChatGPT, Claude, GitHub Copilot, or other LLMs
- **Ask Questions**: Reach out to the web development team

---

_This website is maintained by CS students for CS students. Contributions and suggestions are always welcome!_
