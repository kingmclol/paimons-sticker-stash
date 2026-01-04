export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-full px-4 sm:w-xl sm:p-0 md:w-2xl lg:w-4xl">
      <div className="grid h-full grid-rows-[auto_1fr] py-4">{children}</div>
    </div>
  );
}
