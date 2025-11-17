export type MessageProps = {
  input: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  isLoading: boolean;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type Message = {
  id: string;              
  role: "user" | "assistant";
  content: string;          
  timestamp: number;       
}

export type Gender = 'male' | 'female';

export interface ResponseResult {
  text: string;
  gender?: Gender;
}
