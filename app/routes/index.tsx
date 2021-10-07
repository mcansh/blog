import type { MetaFunction, RouteComponent } from 'remix';

const meta: MetaFunction = () => ({
  title: 'Logan McAnsh',
  description: 'My neglected blog',
});

const Index: RouteComponent = () => (
  <main className="grid h-screen px-4 text-xl place-items-center">
    <h1>
      Hi, I&apos;m{' '}
      <a href="https://mcan.sh" className="text-indigo-800">
        Logan
      </a>
      . I have nothing here anymore
    </h1>
  </main>
);

export default Index;
export { meta };
