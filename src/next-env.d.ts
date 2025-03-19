
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// It's used to help TypeScript recognize Next.js types
// without modifying the protected tsconfig.json file

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
  };
  
  export function useParams(): { [key: string]: string | string[] };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}
