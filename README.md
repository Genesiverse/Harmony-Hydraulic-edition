# Harmony Hydraulic Edition

## Setup

1. Install [Node.js](https://nodejs.org/) and npm.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the application and generate installers:
   ```bash
   npm run build
   ```
  Artifacts will appear in the `dist` folder.

After installation, you can edit the UI files directly. The `bin` folder
containing `index.html` and its assets is copied next to the application's
resources directory. On Windows this will be under
`<install dir>\resources\bin`.

The application icon is loaded from `bin/images/logo.png` and `bin/images/logo.ico`. Replace these files after installation if you want to change the icon.

## Auto Updates

The app uses `electron-updater` configured with GitHub releases. After pushing the project to a GitHub repository, publish new versions as releases containing the generated installer files. Automatic update checks occur on launch when enabled in **Settings > Advance** under *Auto Update on Launch*.