
"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

// This file acts as a bridge between old React Router and Next.js App Router
export default function LegacyApp() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the corresponding app directory route
    router.replace("/");
  }, [router]);
  
  return <div>Redirecting...</div>;
}
