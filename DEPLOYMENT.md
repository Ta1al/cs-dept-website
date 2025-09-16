# Deployment Guide

This guide covers how to deploy the CS Department website to various platforms and environments.

## 🌐 Current Deployment

The website is currently deployed on **Netlify** with automatic deployments from the main branch.

- **Production URL**: [Your Production URL]
- **Deploy Status**: [![Netlify Status](https://api.netlify.com/api/v1/badges/0c1f2cae-cb76-47c1-8632-86c7644d9257/deploy-status)](https://app.netlify.com/projects/csdeptuos/deploys)

## 📋 Deployment Overview

### Build Process

The website uses Astro's static site generation:

1. **Content Processing**: Markdown files are processed and validated
2. **Component Compilation**: Astro components are compiled to HTML
3. **Asset Optimization**: Images and CSS are optimized
4. **Static Generation**: All pages are pre-built for fast delivery

### Build Commands

```bash
# Install dependencies
bun install

# Build for production
bun run build

# Preview production build locally
bun run preview
```

### Output

- **Build Directory**: `dist/`
- **Generated Files**: Static HTML, CSS, and JavaScript
- **Assets**: Optimized images and other static files

## 🚀 Netlify Deployment (Current)

### Automatic Deployment

The site automatically deploys when:

- Changes are pushed to the `main` branch
- Pull requests are merged

### Netlify Configuration

**File**: `netlify.toml`

```toml
[build]
  publish = "dist"
  command = "bun install && bun run build"

# Form handling
[[forms]]
  name = "event-registration"

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Redirects
[[redirects]]
  from = "/success"
  to = "/success"
  status = 200
```

### Manual Deployment to Netlify

1. **Build the site**:

   ```bash
   bun run build
   ```

2. **Deploy via Netlify CLI**:

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy
   netlify deploy --prod --dir=dist
   ```

3. **Deploy via Web Interface**:
   - Drag and drop the `dist/` folder to Netlify's deploy interface

### Environment Variables

Set these in Netlify dashboard:

- `NODE_VERSION`: `18` (or higher)
- `BUN_VERSION`: `latest`
- Custom form endpoints (if using external form handlers)

## 🌍 Alternative Deployment Platforms

### Vercel

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy**:

   ```bash
   vercel --prod
   ```

3. **Configuration** (`vercel.json`):
   ```json
   {
     "buildCommand": "bun install && bun run build",
     "outputDirectory": "dist",
     "devCommand": "bun dev",
     "installCommand": "bun install"
   }
   ```

### GitHub Pages

1. **Add GitHub Actions workflow** (`.github/workflows/deploy.yml`):

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: oven-sh/setup-bun@v2
         - run: bun install
         - run: bun run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Configure GitHub Pages**:
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

### Cloudflare Pages

1. **Connect GitHub repository** to Cloudflare Pages
2. **Build settings**:
   - Build command: `bun install && bun run build`
   - Build output directory: `dist`
   - Root directory: `/`

### Self-Hosted (VPS/Dedicated Server)

#### Prerequisites

- Ubuntu/Debian server
- Domain name with DNS configured
- SSL certificate (Let's Encrypt recommended)

#### Setup Process

1. **Install dependencies**:

   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install Bun
   curl -fsSL https://bun.sh/install | bash

   # Install Nginx
   sudo apt install nginx -y

   # Install Certbot for SSL
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Deploy application**:

   ```bash
   # Clone repository
   git clone https://github.com/Ta1al/cs-dept-website.git
   cd cs-dept-website

   # Install dependencies and build
   bun install
   bun run build

   # Copy build to web directory
   sudo cp -r dist/* /var/www/html/
   ```

3. **Configure Nginx**:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
   }
   ```

4. **Enable SSL**:

   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

5. **Set up auto-deployment** (optional):

   ```bash
   # Create deployment script
   cat > deploy.sh << 'EOF'
   #!/bin/bash
   cd /path/to/cs-dept-website
   git pull origin main
   bun install
   bun run build
   sudo cp -r dist/* /var/www/html/
   sudo systemctl reload nginx
   EOF

   chmod +x deploy.sh

   # Set up webhook or cron job for auto-deployment
   ```

## 🔧 CI/CD Setup

### GitHub Actions (Recommended)

**File**: `.github/workflows/deploy.yml`

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Run linting
        run: bun run lint

      - name: Run formatting check
        run: bun run format:check

      - name: Build site
        run: bun run build

      - name: Deploy to Netlify
        if: github.ref == 'refs/heads/main'
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist
```

### Pre-deployment Checks

The CI/CD pipeline includes:

- **Code Quality**: ESLint and Prettier checks
- **Build Verification**: Ensures the site builds successfully
- **Content Validation**: Validates Markdown frontmatter
- **Performance Testing**: Basic performance checks

## 📊 Monitoring and Analytics

### Performance Monitoring

1. **Lighthouse CI**: Automated performance testing

   ```yaml
   - name: Lighthouse CI
     run: |
       npm install -g @lhci/cli
       lhci autorun
   ```

2. **Web Vitals**: Monitor Core Web Vitals in production

### Error Monitoring

1. **Sentry** (recommended for error tracking)
2. **LogRocket** (session replay and monitoring)
3. **Server logs** (for self-hosted deployments)

### Analytics

Current analytics setup:

- Google Analytics (if configured)
- Netlify Analytics
- Custom event tracking for form submissions

## 🔒 Security Considerations

### Headers and Security

Security headers are configured in `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
```

### Environment Variables

Sensitive data should be stored as environment variables:

- API keys
- Database connections
- Third-party service credentials

### HTTPS

Always use HTTPS in production:

- Netlify provides automatic SSL
- For self-hosted: Use Let's Encrypt
- Redirect HTTP to HTTPS

## 🚨 Troubleshooting

### Common Build Issues

1. **Dependency conflicts**:

   ```bash
   rm -rf node_modules bun.lockb
   bun install
   ```

2. **TypeScript errors**:

   ```bash
   bun run astro check
   ```

3. **Content validation errors**:
   - Check frontmatter syntax
   - Ensure required fields are present
   - Validate date formats (YYYY-MM-DD)

### Deployment Failures

1. **Build timeout**: Increase timeout in platform settings
2. **Memory issues**: Check build logs for memory usage
3. **Asset optimization**: Ensure images are optimized

### Form Handling Issues

1. **Netlify Forms**: Ensure form has `name` attribute and `netlify` attribute
2. **Custom endpoints**: Verify CORS settings
3. **Validation**: Check field validation rules

## 📈 Performance Optimization

### Build Optimization

1. **Asset optimization**:

   ```js
   // astro.config.mjs
   export default defineConfig({
     build: {
       assets: 'assets',
     },
     vite: {
       build: {
         rollupOptions: {
           output: {
             manualChunks: {
               vendor: ['astro'],
             },
           },
         },
       },
     },
   });
   ```

2. **Image optimization**: Use Astro's built-in image optimization

### Caching Strategy

1. **Static assets**: Long-term caching (1 year)
2. **HTML files**: Short-term caching (1 hour)
3. **API responses**: Appropriate TTL based on content

### CDN Configuration

For global performance:

- Use Cloudflare or similar CDN
- Configure proper cache headers
- Optimize for mobile networks

## 🔄 Rollback Procedures

### Netlify Rollback

1. **Via Dashboard**: Go to Deploys > Click on previous deploy > "Publish deploy"
2. **Via CLI**:
   ```bash
   netlify api listSiteDeploys --data '{"site_id": "YOUR_SITE_ID"}'
   netlify api restoreSiteDeploy --data '{"site_id": "YOUR_SITE_ID", "deploy_id": "DEPLOY_ID"}'
   ```

### Git-based Rollback

```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit (careful with force push)
git reset --hard COMMIT_HASH
git push --force-with-lease
```

## 📞 Support and Maintenance

### Regular Maintenance

- **Monthly**: Update dependencies
- **Quarterly**: Review performance metrics
- **Annually**: Security audit and major updates

### Backup Strategy

- **Code**: Git repository (GitHub)
- **Content**: Regular exports of content files
- **Database**: If using external databases
- **Assets**: Backup of `public/` directory

### Contact Information

For deployment issues or questions:

- **Technical Team**: [Contact Information]
- **Emergency Contact**: [Emergency Information]
- **Documentation**: This guide and linked resources

---

This deployment guide ensures reliable, secure, and performant hosting of the CS Department website across various platforms and environments.
