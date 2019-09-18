import { useReducer } from 'react';

const RECEIVE_MESSAGE = '@client/RECEIVE_MESSAGE' as const;
const RECEIVE_MESSAGES = '@client/RECEIVE_MESSAGES' as const;

type Message = {
  id: number;
  name: string;
  date: number;
  content: string;
  avatar: string;
};

export type Action =
  | {
      type: typeof RECEIVE_MESSAGE;
      payload: Message;
    }
  | {
      type: typeof RECEIVE_MESSAGES;
      payload: {
        messages: Message[];
      };
    };

type State = {
  messages: Message[];
};

const INITIA_STATE: State = {
  messages: []
};

export const useStore = () => {
  return useReducer((state: State, action: Action) => {
    switch (action.type) {
      case RECEIVE_MESSAGE:
        return { ...state, messages: [...state.messages, action.payload] };
      case RECEIVE_MESSAGES:
        return {
          ...state,
          messages: [...state.messages, ...action.payload.messages]
            .slice()
            .sort((a, b) => a.date - b.date)
        };
    }
  }, INITIA_STATE);
};
