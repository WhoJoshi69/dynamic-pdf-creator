# AI-Powered PDF Presentation Generator

A modern React application that generates beautiful presentation-style PDFs with AI-powered content creation using Groq.

## Features

- 🤖 **AI Content Generation**: Use Groq AI to automatically generate presentation content based on your topic
- 📄 **PDF Generation**: Create professional presentation-style PDFs with custom branding
- 🎨 **Customizable Design**: Upload logos, customize colors, and personalize content
- 📱 **Responsive UI**: Modern, mobile-friendly interface built with shadcn/uis
- ⚡ **Fast Performance**: Built with Vite and optimized for speed

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory and add your Groq API key:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

To get a Groq API key:
1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key to your `.env` file

### 2. Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

## How to Use

1. **Basic Setup**: Enter your company name and website URL
2. **AI Generation**: 
   - Enter a topic for your presentation
   - Select industry, tone, and number of slides
   - Click "Generate with AI" to create content automatically
3. **Customize**: Edit the generated content, upload logos and images
4. **Generate PDF**: Click "Generate & Download PDF" to create your presentation

## Project info

**URL**: https://lovable.dev/projects/aeaa4793-409d-44ea-b66f-76debb348767

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/aeaa4793-409d-44ea-b66f-76debb348767) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/aeaa4793-409d-44ea-b66f-76debb348767) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
