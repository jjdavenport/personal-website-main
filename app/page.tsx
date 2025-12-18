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

export default function Home() {
  return (
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
  );
}
