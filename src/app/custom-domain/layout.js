import Analytics from '@/components/Analytics';

export default function CustomDomainLayout({ children }) {
  return (
    <>
      <Analytics />
      {children}
    </>
  );
}
