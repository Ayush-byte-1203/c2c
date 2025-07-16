# Website Master Builder

A professional website building and contractor services platform built with React, TypeScript, and Vite.

## 🚀 Deployment to Netlify

This project is configured for easy deployment to Netlify. Here are the steps:

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist/public`
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Drag & Drop

1. **Build the project locally**
   ```bash
   npm install
   npm run build
   ```

2. **Drag the `dist/public` folder to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/public` folder to the deploy area

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # Entry point
│   └── index.html         # HTML template
├── server/                # Backend Express server
├── shared/                # Shared types and schemas
├── dist/                  # Build output
│   └── public/            # Static files for deployment
└── netlify.toml          # Netlify configuration
```

## ⚙️ Configuration

The project includes a `netlify.toml` file with the following configuration:

- **Build command**: `npm run build`
- **Publish directory**: `dist/public`
- **Node version**: 18
- **SPA redirects**: All routes redirect to `index.html` for client-side routing

## 🔧 Environment Variables

If your application uses environment variables, you can set them in Netlify:

1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add your variables (e.g., API endpoints, database URLs)

## 📝 Notes

- The frontend is a Single Page Application (SPA) with client-side routing
- All routes are configured to redirect to `index.html` for proper SPA behavior
- The build process creates optimized static files in `dist/public`
- The backend server code is included but not deployed to Netlify (Netlify is for static sites)

## 🚀 Next Steps

After deployment, you can:
- Set up a custom domain
- Configure environment variables
- Set up form handling (if needed)
- Configure redirects and headers
- Set up analytics and monitoring 