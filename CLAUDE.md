# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Run the app in development mode (opens http://localhost:3000)
- `npm test` - Launch test runner in interactive watch mode
- `npm run build` - Build the app for production to the `build` folder

### Amplify Backend
This project uses AWS Amplify for backend services. Common Amplify commands:
- `amplify status` - Show current backend environment status
- `amplify push` - Deploy backend changes to AWS
- `amplify pull` - Sync backend changes from AWS

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 with Create React App
- **UI Library**: Material-UI (MUI) v5 with custom theme
- **Styling**: Emotion (styled components)
- **State Management**: Recoil for React state management
- **Backend**: AWS Amplify with GraphQL/DataStore
- **Authentication**: AWS Amplify Authenticator
- **Routing**: React Router DOM v6

### Project Structure
```
src/
├── components/          # React components organized by feature
│   ├── Account/        # User account, groups, and subusers
│   ├── Authenticator/  # Custom auth components
│   ├── Home/           # Dashboard and overview components  
│   ├── Money/          # Financial tracking features
│   ├── Public/         # Public-facing components
│   └── Wishlist/       # Core wishlist functionality
├── state/              # Recoil state management
│   ├── atoms/          # Recoil atoms for simple state
│   └── selectors/      # Recoil selectors for derived state
├── hooks/              # Custom React hooks
├── helpers/            # Utility functions
└── models/             # Amplify DataStore models
```

### State Management with Recoil
- **Atoms**: Simple state values (modals, filters, user preferences)
- **Selectors**: Derived state and async data queries from AWS DataStore
- Key patterns:
  - Version atoms for cache invalidation (e.g., `currentUserVersion`)
  - Async selectors for DataStore queries
  - Update selectors for triggering cache refreshes

### AWS Amplify Integration
- Uses DataStore for offline-first data synchronization
- Authentication handled by Amplify Authenticator with custom form fields
- Models are auto-generated from GraphQL schema in `src/models/`
- Configuration in `amplify/` directory and `aws-exports.js`

### Key Features
- **Group-based wishlists**: Users create/join groups to share wishlists
- **Subuser support**: Family accounts with child user management
- **Gift coordination**: Track who's getting what gifts
- **Money tracking**: Budget and expense management
- **Amazon import**: Scrape Amazon wishlists for import
- **Public sharing**: Share wishlists publicly via URLs

### Component Patterns
- Extensive use of MUI components with custom theming
- Emotion styled-components for custom styling
- Custom hooks for Recoil state management (`useRecoilHook`, `useBooleanRecoilHook`)
- Modal-based workflows for adding/editing items
- Responsive design with mobile drawer navigation

### Testing
- Uses Jest and React Testing Library (standard Create React App setup)
- Test files should be placed alongside components or in `__tests__` directories

### Development Notes
- Service Worker enabled for PWA functionality
- Custom theme defined in `src/theme.js` with brand colors
- Icons primarily from MUI Icons
- Image handling with upload and resize capabilities
- Uses React Router v6 nested routing pattern