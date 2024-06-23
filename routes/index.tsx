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
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <p>
          <a href="/signin">Sign in</a>
          <a href="/signout">Sign out</a>
        </p>
        <p>Signed in: {props.data.userProfile ? "Yes" : "No"}</p>
        {props.data.userProfile
          ? (
            <>
              <p>User ID: {props.data.userProfile?.id}</p>
              <p>User Name: {props.data.userProfile?.name}</p>
              {props.data.userProfile?.picture && (
                <p>
                  User Picture: <img src={props.data.userProfile.picture}></img>
                </p>
              )}
              <Counter count={count} />
            </>
          )
          : null}
      </div>
    </div>
  );
}
