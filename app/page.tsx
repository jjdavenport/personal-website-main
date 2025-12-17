import {
  Wrapper,
  Container,
  Header,
  Nav,
  Stack,
  Projects,
  Form,
} from "@/components/content";

export default function Home() {
  return (
    <Wrapper>
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
