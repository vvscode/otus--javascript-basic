import { ToDoListModel } from "./ToDoListModel";
import { ToDoListView } from "./ToDoListView";

export class ToDoListController {
  _model: ToDoListModel;
  _view: ToDoListView;
  constructor(model: ToDoListModel, view: ToDoListView) {
    this._model = model;
    this._view = view;
    this._view.setDeleteHanlder(this._handleDelete.bind(this));
    this._view.setAddHandler((value: string) => {
      this._model.add(value);
      this._model.getList().then((data) => this._view.render(data));
    });
    this._model.getList().then((data) => this._view.render(data));
  }
  _handleDelete(event: any) {
    this._model.delete(event.target.parentNode.id);
    this._model.getList().then((data) => this._view.render(data));
  }
}
