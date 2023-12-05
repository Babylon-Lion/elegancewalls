import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    email: string;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
  interface DefaultUser extends User {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
    accessToken: string;
  }
}
