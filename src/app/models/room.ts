import {User} from "./user";
import {Message} from "./message";

export interface Room {
  id: string;
  name: string;
  owner: string;
  users: User[];
  messages: Message[];
}
