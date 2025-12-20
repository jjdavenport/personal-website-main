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
      <Toaster />
      <Nav />
      <Wrapper>
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
