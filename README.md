## Productivity Manager General Logs

### 1) Setup project

npm install -g degit
npm degit royrao2333/template-vite-react-ts-tailwind frontend
npm npm i -D daisyui@latest

### 2) Setup Landing
- Logo, img
- Into
- Buttons

### 3) Setup pages
- create Index, err, reg, dashboard pages
- return 

### 4) Setup React Roter `details in FE READ..`

npm i react-router-dom v. 6.14
- setup routes 

### 5) Setup Error page

- Route
- Component

### 6) Setup Project register page

`for styles form styles - npm install -D @tailwindcss/forms`
`for the form handling - React Hook Form ` npm install react-hook-form //schema-based form validation with Yup, Zod ...separate ADD for validations for test//

    6.1 setted up form
        const fData = watch(data);
        onSubmit={handleSubmit(onSubmit)}
        type="text"{...register('name', { required: true })}

    6.2 Toggle member:
        - depending on isMember decide what form fields to show and fetch

    6.3 Notifications
        - react toastify 
        import { ToastContainer, toast } from 'react-toastify';
        import 'react-toastify/dist/ReactToastify.css';
        <ToastContainer position={? ?}>

    6.4 Redux-react setup
        npm install @reduxjs/toolkit react-redux  - `x2 components`

### 7) Setup Server
    

### 7) Setup Server