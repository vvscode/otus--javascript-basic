export class Form {
  _textInput: HTMLInputElement;
  _submitButton: HTMLButtonElement;
  _handleAdd: () => void;
  constructor(textInput: HTMLInputElement, submitButton: HTMLButtonElement) {
    this._textInput = textInput;
    this._submitButton = submitButton;
    this._handleAdd = () => {};
  }
  static textInput = document.querySelector(".form__input");
  static submitButton = document.querySelector(".form__submit");
  setAddHandler(cb: (value: string) => void) {
    this._handleAdd = () => {
      cb(this._textInput.value);
      this._textInput.value = "";
    };
    this._submitButton.addEventListener("click", this._handleAdd.bind(this));
  }
}
