
# Netlify Deployment Guide (Detailed)

This guide provides comprehensive, step-by-step instructions for deploying your Next.js application to Netlify, with extra explanations and troubleshooting tips.

---

## Prerequisites

Before you begin, make sure you have the following:

1.  **Project Ready**: Your application is complete, tested, and ready for deployment. Ensure all features work as expected locally.
2.  **Git Repository**: Your project is version-controlled with Git and pushed to a remote repository (GitHub, GitLab, or Bitbucket).
3.  **Netlify Account**: You have a Netlify account. If not, [sign up for free](https://app.netlify.com/signup).
4.  **Gemini API Key**: Obtain your Google Gemini API key. This is required for your app to access Gemini services.

---

## Deployment Steps

### Step 1: Push Your Code to a Git Repository

Make sure your latest code, including all configuration files (`next.config.js` or `next.config.ts`, `netlify.toml`, etc.), is committed and pushed to your remote repository.

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push
```

**Tip:** Double-check that your `main` branch (or the branch you want to deploy) is up to date.

---

### Step 2: Create a New Site on Netlify

1.  Log in to your Netlify account at [app.netlify.com](https://app.netlify.com/).
2.  Click **"Add new site"** and select **"Import an existing project"**.
3.  Connect Netlify to your Git provider (GitHub, GitLab, or Bitbucket) if you haven't already.
4.  Select your repository from the list.

**Note:** Netlify will ask for permissions to access your repositories if this is your first time connecting.

---

### Step 3: Configure Build Settings

Netlify will auto-detect your [`netlify.toml`](./netlify.toml) file and use its settings. The important settings are:

-   **Build command**: `npm run build`
-   **Publish directory**: `out`

These settings tell Netlify how to build and where to find your static site output.

**Important:**
- Your app must be compatible with [Next.js static export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports). Features like server-side rendering (SSR) and API routes are not supported with static export. If you use them, consider switching to a serverless deployment or refactoring to static-compatible features.
- If you have both `next.config.js` and `next.config.ts`, ensure only one is used to avoid conflicts.

---

### Step 4: Add Environment Variables

Your app requires the Gemini API key to function. Set this as an environment variable in Netlify:

1.  In your Netlify site dashboard, go to **Site configuration > Environment variables**.
2.  Click **"Add a variable"**.
3.  Enter the following:
    -   **Key**: `NEXT_PUBLIC_GEMINI_API_KEY`
    -   **Value**: Paste your Google Gemini API key here.
4.  Save the variable.

**Why?**
Environment variables let you securely provide secrets and configuration to your app at build time. The `NEXT_PUBLIC_` prefix makes the variable available in the browser as well as on the server.

---

### Step 5: Deploy Your Site

After setting the environment variable, trigger your first deployment:

1.  Go to the **"Deploys"** tab for your site in Netlify.
2.  Click **"Trigger deploy"** and select **"Deploy site"**.

Netlify will now install dependencies, build your app, and publish it to a live URL.

---

## After Deployment

- Once the deployment is complete, Netlify will provide a public URL for your site.
- Test your site thoroughly to ensure all features work as expected.
- If you update your code, just push to your Git repository—Netlify will automatically redeploy.

---

## Troubleshooting & Tips

- **Build fails?**
    - Check the Netlify deploy logs for errors.
    - Make sure your app builds locally with `npm run build` and `npm run export` (if using static export).
    - Ensure all dependencies are listed in `package.json`.
- **Environment variable not found?**
    - Double-check the variable name and value in Netlify.
    - Remember: variables with `NEXT_PUBLIC_` are exposed to the browser.
- **SSR or API routes not working?**
    - Static export does not support SSR or API routes. Refactor to use static data or client-side fetching.
- **Multiple config files?**
    - Only one of `next.config.js` or `next.config.ts` should be present. Remove or rename the unused one.
- **Need a custom domain?**
    - You can add a custom domain in Netlify’s site settings after deployment.

---

## References

- [Netlify Docs: Deploy Next.js](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Next.js Docs: Static HTML Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)

---

If you have any issues, check the Netlify deploy logs or reach out for help!