import { renderTasks } from "./render-tasks";
import { createTask } from "./task-api";
import { $, toast } from "./utilities";

async function taskFormManager() {
  const $titleErrors = $("#task-title-errors");
  const $descriptionErrors = $("#task-description-errors");
  const $buttonSubmit = $("#task-submit-button");

  $buttonSubmit.disabled = true;

  const $taskForm = document.querySelector("#task-form");

  let errors = {
    title: true,
    description: true,
  };

  const $titleInput = $("#task-title-input");
  const $descriptionInput = $("#task-description-input");

  const isValidForm = () => {
    let valid = true;

    if ($titleInput.value.length < 5) {
      $titleErrors.innerText = "Must be at least 5 characters long";

      valid = false;
    } else {
      $titleErrors.innerText = "";
    }

    if ($descriptionInput.value.length < 5) {
      $descriptionErrors.innerText = "Must be at least 5 characters long";

      valid = false;
    } else {
      $descriptionErrors.innerText = "";
    }

    return valid;
  };

  $taskForm.addEventListener("input", (e) => {
    $buttonSubmit.disabled = !isValidForm();
  });

  $taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = $("#task-title-input").value;
    const description = $("#task-description-input").value;

    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

    await createTask({
      title,
      description,
      isComplete: false,
    });

    e.target.reset();

    toast("Task created successfully");

    await renderTasks();
  });
}

export { taskFormManager };
