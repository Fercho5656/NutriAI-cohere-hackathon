interface IMenu {
  name: string;
  breakfast: Array<string>
  lunch: Array<string>
  snack: Array<string>
  dinner: Array<string>
}

export default interface IPlan {
  id?: number;
  menu: IMenu,
  created_at?: Date;
  user_id: string;
}