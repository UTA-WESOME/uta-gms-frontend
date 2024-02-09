# uta-gms-frontend

The uta-gms-frontend application’s main task is to provide access to the UTA-GMS system in a friendly and readable form to the end user. 
It is written entirely in JavaScript with the use of the React framework and connects to the [uta-gms-backend](https://github.com/UTA-WESOME/uta-gms-backend) using the REST
protocol in order to retrieve data for display and send changes that the user wants to make. Inside
the application users can create accounts, log in, browse their projects, edit them, and see the results of the UTA-GMS method.

## How to run? 🚀

1. Prepare a `.env` file inside the main directory. Example:
```
VITE_BACKEND=http://localhost:8080
```
- `VITE_BACKEND` - url to the `uta-gms-backend` application

2. Execute commands:
```commandline
npm i
npm run dev
```

## Technologies used 🔨

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [d3-graphviz](https://github.com/magjac/d3-graphviz)
- [formik and yup](https://formik.org/)
- [react-router-dom](https://reactrouter.com/en/main)
- [dnd-kit](https://dndkit.com/)

## How does the app look like? 💻

The app is fully responsive and also looks great on mobile devices! 📱

![main-page](https://github.com/UTA-WESOME/uta-gms-frontend/assets/91278796/6df96717-ae79-4aae-9168-7d18b4eefd18)
![hierarchy](https://github.com/UTA-WESOME/uta-gms-frontend/assets/91278796/ced77ae6-d837-47b6-bcbe-6c976bced859)
![hasse-general](https://github.com/UTA-WESOME/uta-gms-frontend/assets/91278796/c32faef6-4169-4c9c-aafd-0a7bb28fa91f)
![acceptability](https://github.com/UTA-WESOME/uta-gms-frontend/assets/91278796/1131c834-6b59-4968-b273-e4a4b4ad636c)
![import](https://github.com/UTA-WESOME/uta-gms-frontend/assets/91278796/a8b4d9ab-9623-40a5-8673-c40f5b421a38)


