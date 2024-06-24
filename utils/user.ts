import { openKv } from "./kv.ts";
import { getSessionId } from "@deno/kv-oauth";

export type UserProfile = {
  id: string;
  name: string;
  picture?: string;
};

export const fetchUserFromSessionId = async (
  sessionId: string,
  opts: {
    kv?: Deno.Kv;
  } = {},
): Promise<UserProfile> => {
  const kv = opts.kv ?? await openKv();
  const userProfileId = await kv.get(["session_user_mapping", sessionId]);
  const userProfile = await kv.get([
    "user_profile",
    userProfileId.value as string,
  ]);
  return userProfile.value as UserProfile;
};

export const fetchUserFromRequest = async (
  req: Request,
  opts: {
    kv?: Deno.Kv;
  } = {},
): Promise<UserProfile> => {
  const sessionId = await getSessionId(req);
  if (sessionId === undefined) {
    throw new Error("Unauthorized");
  }
  return fetchUserFromSessionId(sessionId, opts);
};
