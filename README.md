# LinkHEd In - Social Networking Platform

This project is a LinkedIn-like social networking platform designed to connect professionals, enabling them to build relationships, share posts, and communicate directly. Built with a focus on seamless interaction, security, and a user-friendly experience.

## Features

### User Authentication
- **Register & Login** with JWT for secure sessions
- **Email Activation**: Account activation link sent via email for added security
- **Google Sign-In**: Easily register or log in with a Google account
- **Forgot Password**: Send an email with a reset code for password recovery
- **Middleware Protection**: Routes secured with authentication middleware

### Profile Management
- **View Current User**: Fetch and display current user info with `useContext`
- **Update Profile**: Edit user details (name, work, education) with authorization
- **Profile Pictures**: Upload profile and background pictures using Firebase

### Social Networking
- **Search & Connect**: Search for users, send and manage connection requests (accept, ignore, unconnect)
- **Follow & Unfollow**: Follow users to see their posts in your feed
- **User Suggestions**: “Users You Might Know” recommendations

### Post Interactions
- **Create Posts**: Share text, photos, or videos in a single post
- **Engage with Posts**: Like, unlike, and comment on posts
- **Infinite Scroll**: Continuously load posts in the feed

### Messaging
- **Direct Messaging**: Chat with connected users on a dedicated messaging page
- **Connected User Search**: Easily find users to message

### Additional Features
- **Footer Component**: Fixed footer with useful links and site information
- **Infinite Scrolling**: Smooth loading for content-heavy pages
- **Frontend Middleware**: Protect client-side routes and manage navigation based on user auth status

## Technology Stack
- **Frontend**: React.js with TypeScript, SCSS/SASS for styling
- **Backend**: Go with PostgreSQL database, JWT authentication, Firebase for image storage
- **Build Tools**: Vite for fast development
- **Environment**: Docker for containerized setup
