import type { MDXProviderComponentsProp } from '@mdx-js/react';

import { Link } from './link';
import { Text } from './text';

const components: MDXProviderComponentsProp = {
  p: Text,
  a: Link,
};

export { components };
