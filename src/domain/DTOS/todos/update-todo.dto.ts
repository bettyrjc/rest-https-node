export class UpdateTodoDTO {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};
    if (this.name) returnObject.name = this.name;
    if (this.completedAt) returnObject.completedAt = this.completedAt;
    return returnObject;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { name, completedAt, id } = props;
    if (!id || isNaN(id)) return ["id is required", undefined];

    let newCompletedAt = completedAt;
    if (!name) return ["name is required", undefined];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === "Invalid Date")
        return ["completedAt must be a valid date", undefined];
    }

    return [undefined, new UpdateTodoDTO(id, name, newCompletedAt)];
  }
}
