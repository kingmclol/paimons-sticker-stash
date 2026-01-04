function StickyTop({
  children,
  extraClasses,
}: {
  children: React.ReactNode;
  extraClasses?: string;
}) {
  return <div className={`sticky top-16 z-20 ${extraClasses}`}>{children}</div>;
}

export default StickyTop;
