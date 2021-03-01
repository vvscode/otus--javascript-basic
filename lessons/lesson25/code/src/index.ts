import { ToDoListController } from "./ToDoListController";
import { ToDoListView } from "./ToDoListView";
import { ToDoListModel } from "./ToDoListModel";
const textInput = document.querySelector(".form__input") as HTMLInputElement;
const submitButton = document.querySelector(
  ".form__submit"
) as HTMLButtonElement;
const ul = document.querySelector(".items") as HTMLUListElement;
const model = new ToDoListModel();
const view = new ToDoListView({ ul, textInput, submitButton });
const controller = new ToDoListController(model, view);
