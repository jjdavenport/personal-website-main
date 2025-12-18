import {
  Wrapper,
  Container,
  Header,
  Nav,
  Stack,
  Projects,
  Form,
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
    </Wrapper>
  );
}
