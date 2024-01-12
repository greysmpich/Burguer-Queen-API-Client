export interface Auth {
  accessToken: string | undefined;
  user: {
    email: string;
    role: string;
    id: number;
  };
}
