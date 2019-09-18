import Dexie from 'dexie';

export type Message = {
  id?: number;
  name: string;
  date: number;
  text: string;
  avatar?: string;
};

class ChatDatabase extends Dexie {
  public messages: Dexie.Table<Message, number>; // id is number in this case

  public constructor() {
    super('MessageDatabase');
    this.version(1).stores({
      messages: '++id,name,date,text'
    });

    this.messages = this.table('messages');
  }
}

export const db = new ChatDatabase();
