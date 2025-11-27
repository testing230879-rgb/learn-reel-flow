# Contributing to Bloom Scrolling

Thank you for your interest in contributing to Bloom Scrolling! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Code Guidelines](#code-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **bun** package manager
- **Git** for version control
- A **YouTube Data API v3** key (for testing)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/learn-reel-flow.git
   cd learn-reel-flow
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/testing230879-rgb/learn-reel-flow.git
   ```

## Development Setup

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Environment Configuration

- The YouTube API key is stored in browser localStorage
- No `.env` file is required for basic development
- For production deployments, ensure proper API key management

## Project Structure

```
bloom-scrolling/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (shadcn)
│   │   ├── ApiKeyModal.tsx
│   │   ├── BottomNav.tsx
│   │   ├── NotesPanel.tsx
│   │   ├── ReelsPlayer.tsx
│   │   └── TiptapEditor.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useYouTubeSearch.ts
│   │   └── use-toast.ts
│   ├── pages/            # Page components
│   │   ├── Index.tsx
│   │   ├── Saved.tsx
│   │   ├── ApiTutorial.tsx
│   │   └── NotFound.tsx
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles (Design System)
├── public/               # Static assets
├── README.md
├── CONTRIBUTING.md
└── package.json
```

## How to Contribute

### Types of Contributions

We welcome the following types of contributions:

1. **Bug Fixes** - Fix issues in existing functionality
2. **Feature Enhancements** - Improve or add new features
3. **Documentation** - Improve README, code comments, or guides
4. **UI/UX Improvements** - Enhance the design and user experience
5. **Performance Optimization** - Improve app performance
6. **Code Refactoring** - Improve code quality and maintainability
7. **Testing** - Add or improve test coverage

### Workflow

1. **Check existing issues** - Look for existing issues or create a new one
2. **Discuss first** - For major changes, discuss in an issue first
3. **Create a branch** - Branch from `main` with a descriptive name
4. **Make changes** - Implement your changes following our guidelines
5. **Test thoroughly** - Test your changes in different scenarios
6. **Commit** - Follow our commit message guidelines
7. **Push and PR** - Push to your fork and create a pull request

## Reporting Bugs

### Before Submitting a Bug Report

- Check the existing issues to avoid duplicates
- Test with the latest version of the code
- Collect relevant information about the bug

### How to Submit a Bug Report

Create an issue with the following information:

**Title:** Clear, descriptive title

**Description:**
- **Expected Behavior:** What should happen
- **Actual Behavior:** What actually happens
- **Steps to Reproduce:**
  1. Step one
  2. Step two
  3. ...
- **Environment:**
  - Browser and version
  - Operating System
  - Node.js version
- **Screenshots/Videos:** If applicable
- **Console Errors:** Any error messages from browser console
- **Additional Context:** Any other relevant information

## Suggesting Features

### Before Submitting a Feature Request

- Check if the feature already exists
- Search existing issues for similar suggestions
- Consider if the feature aligns with project goals

### How to Submit a Feature Request

Create an issue with the following information:

**Title:** Clear, descriptive feature title

**Description:**
- **Problem Statement:** What problem does this solve?
- **Proposed Solution:** How should it work?
- **Alternatives Considered:** Other approaches you've thought about
- **Use Cases:** Real-world scenarios where this would be useful
- **Mockups/Examples:** Visual examples if applicable

## Code Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Follow the existing code style and patterns
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Add comments for complex logic only
- Avoid premature optimization

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use type inference where appropriate
- Export types that might be reused

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): UserProfile | null => {
  // implementation
};

// ❌ Bad
const getUser = (id: any): any => {
  // implementation
};
```

### React Guidelines

- Use functional components with hooks
- Keep components small and focused
- Use custom hooks for reusable logic
- Follow React naming conventions
- Properly handle loading and error states
- Clean up effects and subscriptions

```typescript
// ✅ Good
const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, [videoId]);
  
  return <div>{/* Component JSX */}</div>;
};

// ❌ Bad
const VideoPlayer = (props: any) => {
  let isPlaying = false; // Using var/let for state
  // Missing cleanup
  return <div>{/* Component JSX */}</div>;
};
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the design system defined in `src/index.css`
- Use semantic color tokens (e.g., `bg-primary`, `text-foreground`)
- Avoid inline styles unless absolutely necessary
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- All colors MUST be HSL format in the design system

```typescript
// ✅ Good
<Button className={cn(
  "bg-primary text-primary-foreground",
  isActive && "bg-accent"
)}>
  Click Me
</Button>

// ❌ Bad
<Button style={{ backgroundColor: '#3b82f6', color: 'white' }}>
  Click Me
</Button>
```

### File Naming Conventions

- **Components:** PascalCase (e.g., `ReelsPlayer.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useYouTubeSearch.ts`)
- **Utilities:** camelCase (e.g., `utils.ts`)
- **Pages:** PascalCase (e.g., `Index.tsx`)
- **Types:** PascalCase for interfaces/types

### Import Order

Organize imports in the following order:

1. React and third-party libraries
2. Internal components
3. Hooks
4. Utils and types
5. Styles

```typescript
// ✅ Good
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReelsPlayer } from "@/components/ReelsPlayer";
import { useYouTubeSearch } from "@/hooks/useYouTubeSearch";
import { cn } from "@/lib/utils";
import "./styles.css";

// ❌ Bad - Random order
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
```

## Commit Message Guidelines

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `build`: Build system or external dependency changes
- `ci`: CI/CD configuration changes

### Examples

```bash
# Good commit messages
feat(player): add autoplay for next video
fix(search): resolve search suggestions not displaying
docs(readme): update installation instructions
style(components): format code with prettier
refactor(hooks): extract video fetching logic to custom hook
perf(player): optimize video loading performance
test(search): add unit tests for search component

# Bad commit messages
update code
fixed bug
changes
asdf
wip
```

### Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 72 characters
- Capitalize the subject line
- Don't end subject line with a period
- Separate subject from body with a blank line
- Use body to explain what and why, not how

## Pull Request Process

### Before Creating a PR

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test thoroughly:**
   - Test all affected functionality
   - Test in multiple browsers if UI changes
   - Ensure no console errors or warnings

3. **Review your changes:**
   - Remove debugging code (console.logs, commented code)
   - Check for unnecessary whitespace changes
   - Ensure all files are properly formatted

### Creating a PR

1. Push your branch to your fork:
   ```bash
   git push origin your-branch-name
   ```

2. Go to the original repository on GitHub
3. Click "New Pull Request"
4. Select your fork and branch

### PR Title and Description

**Title:** Follow commit message format

**Description Template:**

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots/Videos
(If applicable, add screenshots or videos demonstrating the changes)

## Testing Done
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Manual testing performed
- [ ] No console errors

## Checklist
- [ ] My code follows the project's code style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings or errors
- [ ] I have tested my changes thoroughly
```

### PR Review Process

1. **Automated checks** must pass (if configured)
2. **Code review** by maintainers
3. **Address feedback** - Make requested changes
4. **Approval** - Once approved, maintainers will merge

### After Your PR is Merged

1. Delete your branch:
   ```bash
   git branch -d your-branch-name
   git push origin --delete your-branch-name
   ```

2. Update your local main:
   ```bash
   git checkout main
   git pull upstream main
   ```

## Testing

### Manual Testing

Before submitting a PR, test the following:

**Core Functionality:**
- [ ] Video search works correctly
- [ ] Video playback functions properly
- [ ] Autoplay advances to next video
- [ ] Mute/unmute toggle works
- [ ] Vertical scrolling between videos is smooth
- [ ] Save video functionality works
- [ ] Notes editor saves and retrieves notes
- [ ] Navigation between pages works

**UI/UX:**
- [ ] All buttons are clickable and responsive
- [ ] Layout is responsive on mobile, tablet, and desktop
- [ ] Dark mode displays correctly (if applicable)
- [ ] Animations are smooth
- [ ] No UI glitches or overlapping elements

**Browser Compatibility:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

**Error Handling:**
- [ ] Invalid API key shows appropriate error
- [ ] Network errors are handled gracefully
- [ ] Empty states display correctly

### Performance Testing

- Check for memory leaks
- Monitor network requests
- Ensure smooth scrolling
- Test with slow network connections

## Documentation

### Code Documentation

- **Add JSDoc comments** for complex functions:
  ```typescript
  /**
   * Fetches YouTube videos based on search query
   * @param query - Search term for videos
   * @param apiKey - YouTube API key
   * @returns Promise with array of video objects
   */
  const fetchVideos = async (query: string, apiKey: string): Promise<Video[]> => {
    // implementation
  };
  ```

- **Component documentation:**
  - Describe props and their purpose
  - Document any side effects
  - Explain complex logic

### Updating Documentation

When making changes, update:

- **README.md** - If adding new features or changing setup
- **Code comments** - For complex logic
- **Type definitions** - Keep interfaces up to date
- **API documentation** - If changing API interactions

## Additional Resources

### Useful Links

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [YouTube Data API v3 Documentation](https://developers.google.com/youtube/v3)
- [Shadcn UI Components](https://ui.shadcn.com/)

### Getting Help

If you need help:

1. Check existing issues and discussions
2. Read the project documentation
3. Ask in issue comments
4. Reach out to maintainers

## Recognition

All contributors will be recognized in the project. Thank you for helping make Bloom Scrolling better!

---

**Note:** These guidelines may evolve over time. Please check back regularly for updates.

Thank you for contributing to Bloom Scrolling! 🎓✨
