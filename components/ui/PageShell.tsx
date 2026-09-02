import { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col gap-4 p-4 pb-24 sm:max-w-lg sm:p-6 sm:pb-28">
      <div className="bg-ambient" />
      {children}
    </div>
  );
}