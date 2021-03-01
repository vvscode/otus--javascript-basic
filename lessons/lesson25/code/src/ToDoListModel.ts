export class ToDoListModel {
  private list: string[] = ["one", "two", "three"];
  async delete(index: string) {
    this.list.splice(+index, 1);
  }
  async add(item: string) {
    this.list.push(item);
  }
  async getList() {
    return this.list;
  }
}
