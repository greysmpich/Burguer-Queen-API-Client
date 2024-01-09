export interface Auth {
  accesToken: string;
  user: {
    email: string;
    role: string;
    id: number;
  };
}
