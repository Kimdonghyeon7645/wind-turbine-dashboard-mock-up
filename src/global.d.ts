/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface GlobalThis {
    tb: any;
  }
}

declare module "threebox-plugin" {
  export const Threebox: any;
}
