import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { transporter } from "./email/transporter";
import { PrismaClient } from "@/generated/prisma";

export const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await transporter.sendMail({
          from: '"Bookly" <kinzinzombe07@gmail.com>', // Replace with your sender email
          to: email,
          subject: "🚀 Sign in to Bookly",
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h2 style="color: #4F46E5;">Hey there! 👋</h2>
              <p>You're one click away from booking brilliance with <strong>Bookly</strong>! Just hit the button below to log in:</p>
              <a 
                href="${url}" 
                style="
                  display: inline-block;
                  margin-top: 16px;
                  padding: 12px 24px;
                  background-color: #4F46E5;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: bold;
                "
              >
                Log In to Bookly
              </a>
              <p style="margin-top: 24px;">If you didn’t request this link, no worries—just ignore this email. Your account is safe 👍</p>
              <p style="margin-top: 16px;">Catch you soon,<br/>The Bookly Team ✨</p>
            </div>
          `,
        });
      },
    }),
    nextCookies(), // Psst, Kin...Make sure this is the last plugin
  ],
});
