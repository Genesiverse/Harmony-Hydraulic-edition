# Harmony Hydraulic Edition

## Setup

1. Install [Node.js](https://nodejs.org/) and npm.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the application and generate installers (Windows target):
   ```bash
   npm run build
   ```
  Artifacts, including `latest.yml`, will appear in the `dist` folder.

After installation, you can edit the UI files directly. The `bin` folder
containing `index.html` and its assets is copied next to the application's
resources directory. On Windows this will be under
`<install dir>\resources\bin`.

The application icon is loaded from `bin/images/logo.png` and `bin/images/logo.ico`. Replace these files after installation if you want to change the icon. Electron Builder uses the `.ico` file when generating the Windows installer, so ensure `bin/images/logo.ico` exists before running `npm run build`.

## Auto Updates

The app uses `electron-updater` configured with GitHub releases. After pushing the project to a GitHub repository, publish new versions as releases containing the generated installer files. The `autoUpdater` will check the repository listed in `package.json` and apply updates automatically.

