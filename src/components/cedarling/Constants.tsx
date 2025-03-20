export const ACTION_ADD = "Add";
export const ACTION_UPDATE = "Update";
export const ACTION_DELETE = "Delete";
export const ACTION_MARK_COMPLETE = "MarkComplete";
export const ACTION_VIEW_DETAILS = "ViewDetails";
export const ACTION_USE = "Use";

export const initialTodoList = [
  {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    author: "thomas@gluu.org",
    title: "Install cedarling wasm with npm",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    author: "thomas@gluu.org",
    title: "Install vite-wasm-plugin with npm",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    author: "thomas@gluu.org",
    title: " Configure vite.config.ts",
    completed: false,
  },
];
