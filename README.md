# CLONE GIT REPO
git clone https://github.com/premographycreations/premographycreations.git

# OWNERSHIP PERMISSION RESET
sudo chown -R bitnami:bitnami /home/bitnami/premographycreations

cd /home/bitnami/premographycreations

sudo chown -R bitnami:bitnami .

# INSTALL VITE v5.4.10 (STABLE VERSION FOR NODE v22.18.0)
npm install vite@5.4.10

npx vite --version

# REINSTALL ALL DEPENDENCIES
npm install --production

# CHECK VITE BINARY PERMISSION
ls -l node_modules/.bin/vite

chmod +x node_modules/.bin/vite

# VERIFY VITE CLI EXISTS
ls node_modules/vite/dist/node/cli.js

# BUILD APPLICATION
npm run build

npx vite build

npm ls vite



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
