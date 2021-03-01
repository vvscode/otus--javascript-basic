import { ListItem } from "./ListItem";

export class List {
  constructor(
    private itemsList: HTMLUListElement,
    private handleDelete = (event: any) => {}
  ) {}
  static itemsList = document.querySelector(".items");
  setDeleteHanlder(cb: (event: any) => void) {
    this.handleDelete = cb;
    this.handleDelete = this.handleDelete.bind(this);
  }
  render(list: string[]) {
    this.itemsList.innerHTML = "";
    list.forEach((text, index) => {
      const listItem = new ListItem({
        text,
        index: index + "",
        deleteHandler: this.handleDelete,
      });
      this.itemsList.append(listItem.getElement());
    });
  }
}
