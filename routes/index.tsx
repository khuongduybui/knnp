import { useSignal } from "@preact/signals";
import { openKv } from "../utils/kv.ts";
import { fetchUserFromRequest, UserProfile } from "../utils/user.ts";
import Counter from "../islands/Counter.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

interface HomeParams {
  userProfile: UserProfile | null;
  counter: number;
}
export const handler: Handlers<HomeParams> = {
  async GET(req: Request, ctx: FreshContext) {
    const kv = await openKv();

    let userProfile: UserProfile | null;
    let counter;
    try {
      userProfile = await fetchUserFromRequest(req, { kv });
      counter = (await kv.get(["user_counter", userProfile.id]))
        .value as number ?? 0;
    } catch (error) {
      userProfile = null;
      counter = 0;
    }

    return ctx.render({ userProfile, counter });
  },
};

export default function Home(props: PageProps<HomeParams>) {
  const count = useSignal(props.data.counter);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100vw" }}>
        {props.data.userProfile
          ? (
            <>
              <a href="/signout">
                <wa-avatar
                  image={props.data.userProfile.picture}
                  label={props.data.userProfile.name}
                />
              </a>
            </>
          )
          : (
            <a href="/signin">
              <wa-avatar label="Sign in" />
            </a>
          )}
      </div>
      {props.data.userProfile && <Counter count={count} />}
    </div>
  );
}
