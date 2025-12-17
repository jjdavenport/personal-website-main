import {
  Wrapper,
  Container,
  Header,
  Nav,
  Stack,
  Projects,
  Form,
} from "@/components/content";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <Wrapper>
      <Toaster position="top-center" />
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
