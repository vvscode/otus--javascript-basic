export class ToDoListModel {
  _list: string[];
  constructor() {
    this._list = ["one", "two", "three"];
  }
  async delete(index: string) {
    this._list.splice(+index, 1);
  }
  async add(item: string) {
    this._list.push(item);
  }
  async getList() {
    return this._list;
  }
}
