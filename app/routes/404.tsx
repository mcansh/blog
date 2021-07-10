import type { MetaFunction, RouteComponent } from 'remix';

const meta: MetaFunction = () => ({ title: "Ain't nothing here" });

const FourOhFour: RouteComponent = () => (
  <div>
    <h1>404</h1>
  </div>
);

export default FourOhFour;
export { meta };
