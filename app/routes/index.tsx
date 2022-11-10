import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return {
    title: "Logan McAnsh",
    description: "My neglected blog",
  };
};

export default function IndexPage() {
  return (
    <main className="grid h-screen px-4 text-xl place-items-center">
      <h1>
        Hi, I&apos;m{" "}
        <a href="https://mcan.sh" className="text-indigo-800">
          Logan
        </a>
        . I have nothing here anymore
      </h1>
    </main>
  );
}
