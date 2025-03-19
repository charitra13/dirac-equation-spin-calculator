
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">404 - Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="default">
            Return to Periodic Table
          </Button>
        </Link>
      </div>
    </div>
  );
}
