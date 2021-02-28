import { ListItem } from "./ListItem";

export class List {
  _handleDelete: (event: any) => void;
  _itemsList: HTMLUListElement;

  constructor(ul: HTMLUListElement) {
    this._itemsList = ul;

    this._handleDelete = () => {};
  }
  static itemsList = document.querySelector(".items");
  setDeleteHanlder(cb: (event: any) => void) {
    this._handleDelete = cb;
    this._handleDelete = this._handleDelete.bind(this);
  }
  render(list: string[]) {
    this._itemsList.innerHTML = "";
    list.forEach((text, index) => {
      const listItem = new ListItem({
        text,
        index: index + "",
        deleteHandler: this._handleDelete,
      });
      this._itemsList.append(listItem.getElement());
    });
  }
}
