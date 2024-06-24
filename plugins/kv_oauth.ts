/*
Note: this plugin uses the following KV paths:
- oauth_sessions / {sessionId} = OAuthSession
- session_tokens / {sessionId} = OAuthTokens
- session_user_mapping / {sessionId} = string (userProfile.id)
- user_profile / {userProfile.id} = UserProfile
*/

import { createGoogleOAuthConfig, createHelpers } from "@deno/kv-oauth";
import type { Plugin } from "$fresh/server.ts";
import { openKv } from "../utils/kv.ts";
import type { UserProfile } from "../utils/user.ts";

const { signIn, handleCallback, signOut, getSessionId: _getSessionId } =
  createHelpers(
    createGoogleOAuthConfig({
      redirectUri: Deno.env.get("GOOGLE_CALLBACK_URI") ?? "http://localhost:8000/callback",
      scope: "https://www.googleapis.com/auth/userinfo.profile",
    }),
  );

export default {
  name: "kv-oauth",
  routes: [
    {
      path: "/signin",
      async handler(req) {
        return await signIn(req);
      },
    },
    {
      path: "/callback",
      async handler(req) {
        const { response, sessionId, tokens } = await handleCallback(req);
        const userProfileResponse = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.accessToken}`,
        );
        const userProfile = await userProfileResponse.json();
        const kv = await openKv();
        await Promise.all([
          kv.set(["session_tokens", sessionId], tokens),
          kv.set(["session_user_mapping", sessionId], userProfile.id),
          kv.set(["user_profile", userProfile.id], userProfile as UserProfile),
        ]);
        return response;
      },
    },
    {
      path: "/signout",
      async handler(req) {
        return await signOut(req);
      },
    },
  ],
} as Plugin;
