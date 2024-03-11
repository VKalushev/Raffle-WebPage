import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import GoogleUser from '@models/google_user';
import CredentialsUser from '@models/credentials_user';
import { connectToDB, getUserFromDatabase } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        try {
          // Check if user exists in the database
          const user = await CredentialsUser.findOne({ username });
          
          if (user) {
            // If user exists, check if the password matches
            if (user.password === password) {
              // Return the user object if authentication is successful
              return user;
            } else {
              // Return null if the password is incorrect
              return null;
            }
          } else {
            // Return null if user does not exist
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          // Return null if an error occurs
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await GoogleUser.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        
        // check if user already exists
        const userExists = await GoogleUser.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await GoogleUser.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
