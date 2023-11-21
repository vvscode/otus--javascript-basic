type Props = {
  text: string;
  index: string;
  deleteHandler: (e: Event) => void;
};

export class ListItem {
  private element: HTMLUListElement;
  static itemTemplate: HTMLTemplateElement = document.querySelector(
    ".item_template"
  ) as HTMLTemplateElement;
  constructor({ text, index, deleteHandler }: Props) {
    this.element = ListItem.itemTemplate.content.cloneNode(
      true
    ) as HTMLUListElement;
    (this.element.querySelector(".item__text") as HTMLElement).innerText = text;
    (this.element.querySelector(".item") as HTMLElement).setAttribute(
      "id",
      index
    );
    (
      this.element.querySelector(".item__delete") as HTMLElement
    ).addEventListener("click", deleteHandler);
  }
  getElement(): HTMLUListElement {
    return this.element;
  }
}
