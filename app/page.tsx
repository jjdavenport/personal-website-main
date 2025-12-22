import {
  Wrapper,
  Container,
  Header,
  Nav,
  Stack,
  Projects,
  Form,
  Footer,
} from "@/components/content";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/hooks/theme-provider";
import { headers } from "next/headers";
import dynamic from "next/dynamic";

const MobileProjects = dynamic(() =>
  import("@/components/content").then((mod) => ({ default: mod.Projects })),
);
const MobileFooter = dynamic(() =>
  import("@/components/content").then((mod) => ({ default: mod.Footer })),
);

const DialogForm = dynamic(() =>
  import("@/components/content").then((mod) => ({ default: mod.FormDialog })),
);

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";

  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    );

  return (
    <ThemeProvider>
      <Toaster />
      <Nav />
      <Wrapper>
        <Container>
          <Header />
          <Stack />
          {isMobile ? <MobileProjects /> : <Projects />}
          <Form>
            <DialogForm />
          </Form>
        </Container>
        {isMobile ? <MobileFooter /> : <Footer />}
      </Wrapper>
    </ThemeProvider>
  );
}
