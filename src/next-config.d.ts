
declare module 'next/config' {
  export default function getConfig(): {
    publicRuntimeConfig: {
      [key: string]: any;
    };
    serverRuntimeConfig: {
      [key: string]: any;
    };
  };
}
