import { List } from "./components/List";
import { Form } from "./components/Form";

type Props = {
  ul: HTMLUListElement;
  textInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
};
export class ToDoListView {
  _list: List;
  _form: Form;
  constructor({ ul, textInput, submitButton }: Props) {
    this._list = new List(ul);
    this._form = new Form(textInput, submitButton);
  }

  setDeleteHanlder(cb: (event: any) => void) {
    this._list.setDeleteHanlder(cb);
  }

  setAddHandler(cb: (value: string) => void) {
    this._form.setAddHandler(cb);
  }

  render(data: string[]) {
    this._list.render(data);
  }
}
