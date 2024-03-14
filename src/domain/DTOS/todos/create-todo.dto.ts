export class CreateTodoDTO {
  private constructor(public readonly name: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {
    const { name } = props;
    if (!name) return ["name is required", undefined];
    return [undefined, new CreateTodoDTO(name)];
  }
}
