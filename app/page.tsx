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

export default function Home() {
  return (
    <ThemeProvider>
      <Wrapper>
        <Toaster />
        <Nav />
        <Container>
          <Header />
          <Stack />
          <Projects />
          <Form />
        </Container>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}
