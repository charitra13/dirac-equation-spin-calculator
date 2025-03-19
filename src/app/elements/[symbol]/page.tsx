
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { elements } from "@/data/elements";
import Header from "@/components/Header";
import ElementDetails from "@/components/ElementDetails";

export default function ElementPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = params.symbol as string;
  
  const element = elements.find(el => el.symbol.toLowerCase() === symbol.toLowerCase());
  
  useEffect(() => {
    if (!element) {
      router.push("/");
    }
  }, [element, router]);
  
  if (!element) return null;
  
  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="py-8">
        <ElementDetails
          element={element}
          isOpen={true}
          onClose={() => router.push("/")}
        />
      </main>
    </div>
  );
}
