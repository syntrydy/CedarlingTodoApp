# Todo Application

A simple todo list application built with React, TypeScript, and Vite.

## Features

- Create new todos
- Mark todos as complete/incomplete
- Delete todos
- Persist todos in local storage
- Clean and minimal user interface

## Tech Stack

- [React](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:syntrydy/CedarlingTodoApp.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```
4. Availables branches

   - `main`: contains the TODO App without any  cedarling related code
   - `cedarling`: contains the TODO App with cedarling integrate and access enforce with cedarling

4. Open [http://localhost:5173](http://localhost:5173) in your browser

5. Demo Access
 
 We have the version enforce with cedarling deploy on vercel 
 It is accessible [here](https://cedarling-todo-app.vercel.app).

6. Cedarling
    - Policies
      The policy store used is availables [here](https://raw.githubusercontent.com/Gasmyr/PolicyRepo/refs/heads/agama-lab-policy-designer/434a7eed9f7bb98812f9001fca88524427008f332e0e.json) with its policies
    - Actions diagrams
      ![image](https://github.com/user-attachments/assets/366f2136-7076-4d0f-a80f-0c542efdc870)

    -  Custom enities
    ```
      "TodoItem": {
        "shape": {
          "type": "Record",
          "attributes": {
            "author": {
              "type": "String"
            },
            "completed": {
              "type": "Boolean"
            }
          }
        }
      },
      "TodoList": {
        "shape": {
          "type": "Record",
          "attributes": {}
        }
      }  
    ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Development

This project uses TypeScript for type safety and ESLint for code quality. The ESLint configuration includes React-specific rules and type checking.
