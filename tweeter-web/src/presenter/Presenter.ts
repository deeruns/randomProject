export interface View {
  displayErrorMessage: (message: string) => void;
}

export interface MessageView extends View {
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string
  ) => void;
  clearLastInfoMessage: () => void;
}

export class Presenter {
  private _view: View;

  public constructor(view: View) {
    this._view = view;
  }

  protected get view() {
    return this._view;
  }
}
