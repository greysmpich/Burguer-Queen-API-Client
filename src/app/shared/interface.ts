export interface Auth {
  accessToken: string;
  user: {
    email: string;
    role: string;
    id: number;
  };
}
