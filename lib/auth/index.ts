import { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getCustomerAccessToken } from '../shopify';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { type: 'text', label: 'Username' },
        password: { type: 'password', label: 'Password' }
      },
      async authorize(credentials) {
        const accessToken = await getCustomerAccessToken({
          input: {
            email: credentials?.username!,
            password: credentials?.password!
          }
        });
        if (accessToken.customerAccessTokenCreate.customerAccessToken.accessToken) {
          return {
            accessToken: accessToken.customerAccessTokenCreate.customerAccessToken.accessToken,
            email: credentials?.username!
          };
        } else {
          return null;
        }
      }
    })

    // ...add more providers here
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;

        token.accessToken = user.accessToken;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.email && token.accessToken) {
        //@ts-ignore
        session.user.email! = token?.email!;
        //@ts-ignore
        session.user.accessToken = token?.accessToken!;
      }
      return session;
    }
  }
};
