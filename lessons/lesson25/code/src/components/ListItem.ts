type Props = {
  text: string;
  index: string;
  deleteHandler: (e: Event) => void;
};

export class ListItem {
  _element: HTMLUListElement;
  static itemTemplate: HTMLTemplateElement = document.querySelector(
    ".item_template"
  ) as HTMLTemplateElement;
  constructor({ text, index, deleteHandler }: Props) {
    this._element = ListItem.itemTemplate.content.cloneNode(
      true
    ) as HTMLUListElement;
    (this._element.querySelector(
      ".item__text"
    ) as HTMLElement).innerText = text;
    (this._element.querySelector(".item") as HTMLElement).setAttribute(
      "id",
      index
    );
    (this._element.querySelector(
      ".item__delete"
    ) as HTMLElement).addEventListener("click", deleteHandler);
  }
  getElement(): HTMLUListElement {
    return this._element;
  }
}
