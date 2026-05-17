declare module "*.mdx" {
  import type { ComponentProps, FC } from "react";
  const Component: FC<ComponentProps<"div">>;
  export default Component;
  export const meta: unknown;
}
