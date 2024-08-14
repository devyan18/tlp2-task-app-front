import Swal from "sweetalert2";
import { deleteTask, getAllTasks, updateTask } from "./task-api";
import { $ } from "./utilities";

export async function renderTasks() {
  const $tasksList = $("#table-body");
  const tasks = await getAllTasks();

  $tasksList.innerHTML = tasks
    .map(
      (task) => `
    <tr class=''>
      <td class="border-gray-700 border-2 w-10 text-center">${task.id}</td>
      <td class="border-gray-700 border-2 pl-2">${task.title}</td>
      <td class="border-gray-700 border-2 pl-2">${task.description}</td>
      <td class="border-gray-700 border-2 text-center">
        ${task.isComplete ? "✅" : "🟥"}
      </td>
      <td class="border-gray-700 border-2 text-center flex flex-row gap-4 justify-center" id="actions-${
        task.id
      }">
        
      </td>
    </tr>
  `
    )
    .join("");

  tasks.forEach((task) => {
    const $actions = $(`#actions-${task.id}`);
    const $completeButton = document.createElement("button");
    $completeButton.innerText = "✏️";
    $completeButton.className = "hover:bg-gray-700 rounded-md";
    $completeButton.addEventListener("click", async () => {
      const { value: formValues } = await Swal.fire({
        background: "#1a202c",
        color: "#f7fafc",
        title: "Editar Registro",
        className: "rounded-xl",
        html: `
        <div class="flex flex-col gap-4  text-white">
            <input id="title" class="swal2-input" placeholder="Título" value="${
              task.title
            }">
            <textarea id="description" class="swal2-textarea" placeholder="Descripción">${
              task.description
            }</textarea>
            <label>
                <input id="isComplete" type="checkbox" ${
                  task.isComplete ? "checked" : ""
                }>
                Completado
            </label>
        </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            isComplete: document.getElementById("isComplete").checked,
          };
        },

        showCancelButton: true,
      });

      console.log(formValues);

      await updateTask(task.id, {
        title: formValues.title,
        description: formValues.description,
        isComplete: formValues.isComplete,
      });

      await renderTasks();
    });
    $actions.appendChild($completeButton);

    const $deleteButton = document.createElement("button");
    $deleteButton.innerText = "❌";
    $deleteButton.className = "hover:bg-gray-700 rounded-md";
    $deleteButton.addEventListener("click", async () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        background: "#1a202c",
        color: "#f7fafc",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteTask(task.id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });

      await renderTasks();
    });
    $actions.appendChild($deleteButton);
  });
}
