import { ToDoListModel } from "./ToDoListModel";
import { ToDoListView } from "./ToDoListView";

export class ToDoListController {
  constructor(private model: ToDoListModel, private view: ToDoListView) {
    this.view.setDeleteHanlder(this.handleDelete);
    this.view.setAddHandler((value: string) => {
      this.model.add(value);
      this.render();
    });
    this.render();
  }
  private handleDelete = (event: any) => {
    this.model.delete(event.target.parentNode.id);
    this.render();
  };
  private render() {
    this.model.getList().then((data) => this.view.render(data));
  }
}
