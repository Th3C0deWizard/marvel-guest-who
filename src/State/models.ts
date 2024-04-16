export interface SimpleCharacter {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Character extends SimpleCharacter {
  description: string;
  comics: {
    name: string;
  }[];
  series: {
    name: string;
  }[];
  stories: {
    name: string;
  }[];
  events: {
    name: string;
  }[];
}

export interface ChatMessageType {
  message: string;
  itsMe: boolean;
}
