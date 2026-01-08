function StickyBottom({
  children,
  extraClasses = "",
}: {
  children: React.ReactNode;
  extraClasses?: string;
}) {
  return (
    <div className={`sticky bottom-4 z-20 ${extraClasses}`}>{children}</div>
  );
}

export default StickyBottom;
