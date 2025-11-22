# Bloom Scrolling - YouTube Reels Experience

A modern, Instagram Reels-inspired YouTube video player built as a university project. This application transforms traditional YouTube browsing into an engaging, vertical scrolling experience with a minimalist design and intuitive interface.

## 📸 Screenshots & Demo

### Main Interface
![Bloom Scrolling App](https://via.placeholder.com/800x450/667eea/ffffff?text=Add+Your+Screenshots+Here)

> **Note**: Add your actual screenshots here by:
> 1. Taking screenshots of the app in action
> 2. Uploading them to `public/` folder (e.g., `public/screenshot-1.png`)
> 3. Replacing the placeholder URLs with actual paths (e.g., `![App Screenshot](screenshot-1.png)`)

### Key Features Showcase

**Full-Screen Video Player**
![Video Player](https://via.placeholder.com/800x450/667eea/ffffff?text=Full-Screen+Video+Player)

**Instagram-Style Interface**
![Instagram Interface](https://via.placeholder.com/800x450/667eea/ffffff?text=Instagram-Style+UI)

**Search & Discovery**
![Search Feature](https://via.placeholder.com/800x450/667eea/ffffff?text=Search+Feature)

### 🎥 Demo Video
> Add a demo GIF or video link here to showcase the scrolling experience and interactions.
> 
> Recommended tools for creating GIFs:
> - [ScreenToGif](https://www.screentogif.com/) (Windows)
> - [Kap](https://getkap.co/) (Mac)
> - [Peek](https://github.com/phw/peek) (Linux)
> - [LICEcap](https://www.cockos.com/licecap/) (Cross-platform)

## 📖 Project Overview

Bloom Scrolling is a web-based video streaming application that fetches YouTube videos based on user searches and displays them in a full-screen, vertical scrolling format similar to Instagram Reels or TikTok. The project demonstrates modern web development practices, API integration, and responsive UI/UX design.

## ✨ Key Features

### 🎥 Video Playback
- **Full-screen vertical video player** with smooth snap scrolling
- **Auto-play functionality** - videos automatically play when scrolled into view
- **Seamless video looping** for continuous watching experience
- **YouTube API integration** for fetching real video content

### 🎨 Instagram-Style Interface
- **Translucent bottom navigation bar** with blur effects
- **Right-side action buttons** (Like, Comment, Share, Save, Mute/Unmute)
- **Profile/Channel information display** with gradient avatar rings
- **Minimalist design** with clean typography and smooth animations

### 🔍 Search & Discovery
- **Smart search functionality** with auto-suggestions
- **Random topic generation** for content discovery
- **Search history** and suggested topics

### 📝 Notes & Organization
- **Built-in rich text editor** (Tiptap) for taking notes
- **Save videos** for later viewing
- **Saved videos page** with organized collection
- **Persistent storage** using localStorage

### 🎯 User Experience
- **Responsive design** - works on mobile and desktop
- **Smooth animations** throughout the interface
- **Toast notifications** for user feedback
- **Dark/Light mode support**

## 🛠️ Technologies Used

### Frontend Framework & Libraries
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing

### UI Components & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Component variants

### Rich Text & Media
- **Tiptap** - Headless rich text editor
- **react-youtube** - YouTube player component integration
- **Excalidraw** - Drawing and whiteboard functionality

### State Management & Data Fetching
- **TanStack Query (React Query)** - Async state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### API Integration
- **YouTube Data API v3** - Video search and metadata

## 📁 Project Structure

```
bloom-scrolling/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (shadcn)
│   │   ├── ReelsPlayer.tsx # Main video player component
│   │   ├── BottomNav.tsx   # Navigation bar
│   │   ├── SearchBar.tsx   # Search functionality
│   │   ├── NotesPanel.tsx  # Notes editor panel
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Saved.tsx       # Saved videos page
│   │   ├── ApiTutorial.tsx # API setup guide
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   │   ├── useYouTubeSearch.ts
│   │   └── use-toast.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── assets/             # Static assets (images, logos)
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static files
├── README.md              # Project documentation
└── package.json           # Dependencies and scripts
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- YouTube Data API v3 Key

### Getting YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**
4. Create credentials (API Key)
5. Copy the API key for use in the application

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd bloom-scrolling

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser and navigate to
http://localhost:5173

# 5. Enter your YouTube API key when prompted
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 💡 How to Use

1. **First Launch**: Enter your YouTube Data API key in the modal
2. **Search Videos**: Click the search icon in bottom navigation
3. **Watch Videos**: Scroll vertically to browse videos
4. **Interact**: Use right-side buttons to like, save, share, or mute videos
5. **Take Notes**: Click notes icon to open the built-in editor
6. **Save Videos**: Bookmark videos to watch later in the Saved section

## 🎯 Features Breakdown

### Video Player Component
- Implements YouTube IFrame API
- Handles auto-play/pause based on scroll position
- Manages mute/unmute state
- Supports video looping

### Search Functionality
- Real-time YouTube API integration
- Auto-suggestions based on popular topics
- Search history management
- Random topic generation for discovery

### Notes System
- Rich text editing with Tiptap
- Formatting options (bold, italic, headings, lists)
- Code blocks with syntax highlighting
- Auto-save to localStorage

### Responsive Design
- Mobile-first approach
- Touch-optimized interactions
- Adaptive layouts for different screen sizes
- Smooth transitions and animations

## 🎨 Design System

### Color Palette
- Primary: HSL-based color system
- Background: White/Light theme
- Accent colors for interactive elements
- Translucent overlays with backdrop blur

### Typography
- System font stack for performance
- Hierarchical text sizes
- Readable line heights and spacing

### Animations
- Fade-in effects for content
- Slide animations for panels
- Scale transforms for button interactions
- Smooth scroll snapping

## 🔄 Data Flow

```
User Search → YouTube API → Video Results → ReelsPlayer → 
User Interaction → Save/Notes → localStorage → Persistent Data
```

## 🌟 Key Learning Outcomes

This project demonstrates:
- ✅ Modern React patterns (hooks, context, custom hooks)
- ✅ TypeScript integration for type safety
- ✅ RESTful API integration (YouTube Data API)
- ✅ State management and data persistence
- ✅ Responsive UI/UX design principles
- ✅ Component-based architecture
- ✅ Performance optimization techniques
- ✅ Git version control and collaboration

## 🚧 Future Enhancements

- [ ] User authentication and profiles
- [ ] Backend integration for cloud data storage
- [ ] Social features (share, comments)
- [ ] Playlist creation and management
- [ ] Video recommendations algorithm
- [ ] Offline mode support
- [ ] PWA (Progressive Web App) capabilities
- [ ] Analytics and watch history

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a university project, but suggestions and feedback are welcome!

## 📄 License

This project is created for educational purposes as part of university coursework.

## 👨‍💻 Developer

Created as a university project to demonstrate modern web development skills and API integration.

## 🙏 Acknowledgments

- **YouTube Data API** for video content
- **shadcn/ui** for beautiful UI components
- **Lovable** for rapid development platform
- **React community** for excellent documentation and resources

---

**Note**: Remember to keep your YouTube API key private and never commit it to version control. Use environment variables for production deployments.

## 📞 Support

For issues or questions about this project, please refer to the code comments or contact the developer.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
