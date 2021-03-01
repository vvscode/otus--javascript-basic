export class Form {
  constructor(
    private textInput: HTMLInputElement,
    private submitButton: HTMLButtonElement,
    private handleAdd = () => {}
  ) {}
  static textInput = document.querySelector(".form__input");
  static submitButton = document.querySelector(".form__submit");
  setAddHandler(cb: (value: string) => void) {
    this.handleAdd = () => {
      cb(this.textInput.value);
      this.textInput.value = "";
    };
    this.submitButton.addEventListener("click", this.handleAdd);
  }
}
