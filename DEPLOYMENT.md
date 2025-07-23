# Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## How it Works

A GitHub Actions workflow has been set up in `.github/workflows/deploy.yml`. This workflow will automatically trigger on every push to the `main` branch.

The workflow performs the following steps:

1.  **Checks out the code:** It checks out the latest version of your code from the `main` branch.
2.  **Sets up Node.js:** It installs the required version of Node.js.
3.  **Installs dependencies:** It runs `npm install` to install all the project dependencies.
4.  **Builds the project:** It runs `npm run build` to create a production-ready build of the application in the `dist` directory.
5.  **Deploys to GitHub Pages:** It uses the `peaceiris/actions-gh-pages` action to deploy the contents of the `dist` directory to the `gh-pages` branch of your repository.

## Configuration

To ensure the deployment is successful, you need to configure your repository settings on GitHub:

1.  Go to your repository's **Settings** tab.
2.  Navigate to the **Pages** section in the left sidebar.
3.  Under **Build and deployment**, select **GitHub Actions** as the source.

Once this is configured, every push to the `main` branch will automatically update your GitHub Pages site.