import "../style.css";
import { taskFormManager } from "./create-task.js";
import { renderTasks } from "./render-tasks.js";

async function main() {
  await renderTasks();
  await taskFormManager();
}

document.addEventListener("DOMContentLoaded", main);
