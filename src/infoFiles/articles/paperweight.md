PaperWeight is a PWA (progressive web app) designed to bridge the gap between handwritten workout logs, and digital analysis. It allows users to get the benefits of less distractions, and more focussed workouts from handwritten workout logs, while also having the benefits of digital workout analysis, such as trend finding, and progress tracking.

## Core Philosophy

The key insight behind PaperWeight is timing. During your workout, you want to be present and focused. Screens, notifications, and complex interfaces are distractions. But after your workout, you want rich data analysis and progress tracking.

PaperWeight respects this natural workflow by keeping the workout experience purely analog while providing sophisticated digital analysis afterward.

## How It Works

The user experience is intentionally simple: complete your workout on paper as usual, then open the app and take a photo of your notes. PaperWeight uses OpenAI's GPT-4o mini with vision capabilities to parse the handwritten data into structured JSON.

Once parsed, users can review and edit the extracted data to ensure accuracy before saving. This verification step proved essential, as even advanced AI models can struggle with handwritten workout notation—distinguishing between a handwritten "1" and "l", for example, or maintaining the correct order of sets.

## Technical Implementation

PaperWeight is built as a mobile-optimized web application using Vue.js, designed to feel native when added to the home screen on iOS Safari. The app communicates with a Supabase backend for data storage and API endpoints via edge functions.

The most technically challenging aspect was achieving reliable parsing accuracy. Handwritten workout logs vary significantly in notation style, and messy corrections or crossed-out entries are common. Through iterative prompt engineering and implementing the user verification step, the system now handles real-world workout logs effectively.

## Strava Integration

PaperWeight integrates with Strava to allow users to combine their strength training data with their cardio data in one place. The app was recently accepted into the Strava Developer Program, which will enable deeper integration and additional features in the future.

## Development Approach

I developed PaperWeight over the course of several months, working on it during free time. The project gave me hands-on experience with AI vision APIs, mobile-first web development, and the challenge of designing interfaces that respect users' natural workflows rather than forcing digital-first patterns.

The application is currently deployed and available at [paperweight.olihef.com](https://paperweight.olihef.com).
