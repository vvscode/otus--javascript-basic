import { List } from "./components/List";
import { Form } from "./components/Form";

type Props = {
  ul: HTMLUListElement;
  textInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
};
export class ToDoListView {
  private list: List;
  private form: Form;
  constructor({ ul, textInput, submitButton }: Props) {
    this.list = new List(ul);
    this.form = new Form(textInput, submitButton);
  }

  setDeleteHanlder(cb: (event: any) => void) {
    this.list.setDeleteHanlder(cb);
  }

  setAddHandler(cb: (value: string) => void) {
    this.form.setAddHandler(cb);
  }

  render(data: string[]) {
    this.list.render(data);
  }
}
