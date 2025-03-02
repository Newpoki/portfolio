type RootLayoutProps = {
  children: React.ReactNode;
};

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
