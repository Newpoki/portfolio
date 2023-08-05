import { Footer } from "../../footer/footer";

type Props = {
  children: React.ReactNode;
};
export default function ProjectsLayout({ children }: Props) {
  return (
    <>
      {children}

      <Footer />
    </>
  );
}
