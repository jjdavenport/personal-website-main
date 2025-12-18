"use client";

import { ReactNode, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sun, Moon, MapPin, Mail } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useTheme } from "@/hooks/theme-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center">{children}</div>
    </>
  );
};

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex w-full max-w-4xl flex-1 flex-col justify-evenly gap-10 px-4 pb-10 md:gap-4 lg:px-0">
        {children}
      </main>
    </>
  );
};

export const Nav = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <>
      <nav className="sticky top-0 z-40 flex w-full flex-col items-center backdrop-blur-lg">
        <div className="flex w-full max-w-4xl justify-end p-4 md:px-4 md:py-4 lg:px-0">
          <Button
            aria-label={darkMode ? "light mode" : "dark mode"}
            className="relative flex h-10 w-10 items-center justify-center"
            onClick={() => setDarkMode(!darkMode)}
          >
            <Sun
              className={`${
                darkMode ? "scale-0 opacity-0" : "scale-100 opacity-100"
              } absolute transition-all duration-300 ease-in-out`}
            />
            <Moon
              className={`${
                darkMode ? "scale-100 opacity-100" : "scale-0 opacity-0"
              } absolute transition-all duration-300 ease-in-out`}
            />
          </Button>
        </div>
        <Separator />
      </nav>
    </>
  );
};

export const Header = () => {
  const words = "Hi, I'm Jordan";
  return (
    <>
      <header className="flex flex-col gap-4 md:gap-0">
        <TextGenerateEffect words={words} />
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-sm md:text-base">Frontend Developer</h2>
          <MapPin className="size-5" />
          <h3 className="text-sm md:text-base">United Kingdom</h3>
        </div>
      </header>
    </>
  );
};

export const Stack = () => {
  const { darkMode } = useTheme();
  return (
    <>
      <section className="flex flex-col gap-4">
        <span className="text-lg">Tech Stack</span>
        <ul className="flex flex-wrap gap-2">
          <StackButton src="/react-1-logo-svgrepo-com.svg" title="React" />
          <StackButton
            src={darkMode ? "/next-js-dark.svg" : "/next-js.svg"}
            title="Next.js"
          />
          <StackButton src="/javascript-svgrepo-com.svg" title="Javascript" />
          <StackButton src="/html-5-svgrepo-com.svg" title="HTML" />
          <StackButton src="/css-3-svgrepo-com.svg" title="CSS" />
          <StackButton src="/Vitest--Streamline-Svg-Logos.svg" title="Vitest" />
          <StackButton src="/node-js-svgrepo-com.svg" title="Node.js" />
          <StackButton src="/typescript-svgrepo-com.svg" title="Typescript" />
          <StackButton
            src={
              darkMode
                ? "/express-svgrepo-com-dark.svg"
                : "/express-svgrepo-com.svg"
            }
            title="Express"
          />
          <StackButton
            src={
              darkMode
                ? "/github-svgrepo-com-dark.svg"
                : "/github-svgrepo-com.svg"
            }
            title="Github"
          />
          <StackButton src="/git-icon-logo-svgrepo-com.svg" title="Git" />
          <StackButton src="/vitejs-svgrepo-com.svg" title="Vite" />
          <StackButton src="/jest-svgrepo-com.svg" title="Jest" />
          <StackButton src="/tailwind-svgrepo-com.svg" title="Tailwind" />
          <StackButton
            src="/react-router-svgrepo-com.svg"
            title="React router"
          />
          <StackButton src="/sass-svgrepo-com.svg" title="Sass" />
          <StackButton src="/scss-svgrepo-com.svg" title="SCSS" />
          <StackButton src="/postgresql-icon.svg" title="PostgresSQL" />
          <StackButton
            src={
              darkMode
                ? "/prisma-svgrepo-com-dark.svg"
                : "/prisma-svgrepo-com.svg"
            }
            title="Prisma"
          />
          <StackButton src="/supabase-logo-icon.png" title="Supabase" />
          <StackButton
            src={
              darkMode
                ? "/shadcn-ui-seeklogo-dark.svg"
                : "/shadcn-ui-seeklogo.svg"
            }
            title="shadcn/ui"
          />
        </ul>
      </section>
    </>
  );
};

const StackButton = ({ src, title }: { src: string; title: string }) => {
  return (
    <>
      <li>
        <Card className="flex w-fit rounded-none py-2">
          <CardContent className="flex items-center gap-2">
            <Image height={20} width={20} src={src} alt={title} />
            <span>{title}</span>
          </CardContent>
        </Card>
      </li>
    </>
  );
};

const ProjectButton = ({ src, title }: { src: string; title: string }) => {
  return (
    <>
      <li>
        <Card className="flex w-fit rounded-none py-2">
          <CardContent className="flex items-center gap-2 px-2">
            <Image height={15} width={15} src={src} alt={title} />
            <span className="text-xs">{title}</span>
          </CardContent>
        </Card>
      </li>
    </>
  );
};

export const Projects = () => {
  const { darkMode } = useTheme();
  return (
    <>
      <section className="flex w-full flex-col gap-4">
        <h4 className="text-lg">Projects</h4>
        <ul className="flex w-full flex-col gap-4 md:flex-row">
          <ProjectCard
            title="React Input CLI"
            description="CLI based on shadcn's component library CLI with formatted input components based on Cleave JS."
          >
            <ProjectButton
              src="/javascript-svgrepo-com.svg"
              title="Javascript"
            />
            <ProjectButton src="/react-1-logo-svgrepo-com.svg" title="React" />
            <ProjectButton
              src="/typescript-svgrepo-com.svg"
              title="Typescript"
            />
            <ProjectButton src="/vitejs-svgrepo-com.svg" title="Vite" />
            <ProjectButton src="/tailwind-svgrepo-com.svg" title="Tailwind" />
          </ProjectCard>
          <ProjectCard
            title="Blog"
            description="Static React site with react router for page routing based on jekyll with posts written in json instead of markdown."
          >
            <ProjectButton src="/react-1-logo-svgrepo-com.svg" title="React" />
            <ProjectButton
              src="/typescript-svgrepo-com.svg"
              title="Typescript"
            />
            <ProjectButton src="/vitejs-svgrepo-com.svg" title="Vite" />
            <ProjectButton src="/tailwind-svgrepo-com.svg" title="Tailwind" />
            <ProjectButton
              src="/react-router-svgrepo-com.svg"
              title="React router"
            />
          </ProjectCard>
          <ProjectCard
            title="Personal website"
            description="Simple next personal website with shadcn components and supabase postgres database for storing messages."
          >
            <ProjectButton
              src={darkMode ? "/next-js-dark.svg" : "/next-js.svg"}
              title="Next.js"
            />
            <ProjectButton
              src="/typescript-svgrepo-com.svg"
              title="Typescript"
            />
            <ProjectButton src="/tailwind-svgrepo-com.svg" title="Tailwind" />
            <ProjectButton src="/postgresql-icon.svg" title="PostgresSQL" />
            <ProjectButton
              src={
                darkMode
                  ? "/shadcn-ui-seeklogo-dark.svg"
                  : "/shadcn-ui-seeklogo.svg"
              }
              title="shadcn/ui"
            />
          </ProjectCard>
        </ul>
      </section>
    </>
  );
};

const ProjectCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => {
  return (
    <>
      <Card className="w-full rounded-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">{children}</ul>
        </CardContent>
      </Card>
    </>
  );
};

export const Form = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    message: "",
  });
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  );

  const handleBlur = (input: string, error: string) => {
    if (input === "") {
      setError((prev) => ({
        ...prev,
        [error]: `${error.charAt(0).toUpperCase() + error.slice(1)} is required`,
      }));
      return;
    }

    if (
      error === "email" &&
      !input.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      setError((prev) => ({
        ...prev,
        [error]: "Valid email address required",
      }));
      return;
    }

    setError((prev) => ({ ...prev, [error]: "" }));
    return;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: Partial<{ name: string; email: string; message: string }> =
      {};

    Object.keys(input).forEach((key) => {
      if (input[key as keyof typeof input] === "") {
        errors[key as keyof typeof input] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (
      input.email &&
      !input.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      errors.email = "Valid email address required";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    const toastId = toast.loading("Sending Message");

    try {
      const { error } = await supabase.from("messages").insert({
        name: input.name,
        email: input.email,
        message: input.message,
      });

      if (!error) {
        setInput({ name: "", email: "", message: "" });
        setDialogOpen(false);
        toast.success("Message sent", { id: toastId });
      } else {
        toast.error("Failed to send message", { id: toastId });
      }
    } catch {
      toast.error("Failed to send message, database or server error", {
        id: toastId,
      });
    }
  };

  const handleDialog = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setError({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <span className="text-lg">Get in touch</span>
        <Dialog open={dialogOpen} onOpenChange={handleDialog}>
          <DialogTrigger asChild>
            <Button aria-label="contact" className="w-16">
              <Mail />
            </Button>
          </DialogTrigger>
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="rounded-none"
          >
            <DialogHeader>
              <DialogTitle>Contact</DialogTitle>
              <DialogDescription>
                Enter your information below to get in touch
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} action="POST" noValidate>
              <FieldGroup>
                <FieldSet>
                  <Field>
                    <div className="flex h-5 justify-between">
                      <FieldLabel htmlFor="name">
                        Name <span className="text-red-600">*</span>
                      </FieldLabel>
                      <span className="text-sm font-medium text-red-600 transition-all duration-75">
                        {error.name}
                      </span>
                    </div>
                    <Input
                      className={
                        error.name !== ""
                          ? "focus-visible:ring-offset-background border-2 border-red-600 ring-2 ring-transparent transition-all duration-75 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                          : undefined
                      }
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      value={input.name}
                      onBlur={() => handleBlur(input.name, "name")}
                      id="name"
                      name="name"
                      placeholder="John Smith"
                    />
                  </Field>
                  <Field>
                    <div className="flex h-5 justify-between">
                      <FieldLabel htmlFor="email">
                        Email <span className="text-red-600">*</span>
                      </FieldLabel>
                      <span className="text-sm font-medium text-red-600 transition-all duration-75">
                        {error.email}
                      </span>
                    </div>
                    <Input
                      className={
                        error.email !== ""
                          ? "focus-visible:ring-offset-background border-2 border-red-600 ring-2 ring-transparent transition-all duration-75 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                          : undefined
                      }
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      value={input.email}
                      onBlur={() => handleBlur(input.email, "email")}
                      placeholder="johnsmith@mail.com"
                      id="email"
                      name="email"
                    />
                  </Field>
                  <Field>
                    <div className="flex h-5 justify-between">
                      <FieldLabel htmlFor="message">
                        Message <span className="text-red-600">*</span>
                      </FieldLabel>
                      <span className="text-sm font-medium text-red-600 transition-all duration-75">
                        {error.message}
                      </span>
                    </div>
                    <Textarea
                      placeholder="Message"
                      className={
                        error.message !== ""
                          ? "focus-visible:ring-offset-background border-2 border-red-600 ring-2 ring-transparent transition-all duration-75 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                          : undefined
                      }
                      onChange={(e) =>
                        setInput((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      value={input.message}
                      onBlur={() => handleBlur(input.message, "message")}
                      id="message"
                      name="message"
                    />
                  </Field>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Send</Button>
                  </DialogFooter>
                </FieldSet>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export const Footer = () => {
  const { darkMode } = useTheme();
  return (
    <footer className="flex w-full flex-col items-center">
      <Separator />
      <div className="flex w-full max-w-4xl justify-end p-4">
        <Link
          className="flex gap-2 hover:underline"
          target="_blank"
          href="https://github.com/jjdavenport"
        >
          <Image
            width={20}
            height={20}
            src={
              darkMode
                ? "/github-svgrepo-com-dark.svg"
                : "/github-svgrepo-com.svg"
            }
            alt="github logo"
            priority
          />
          jjdavenport
        </Link>
      </div>
    </footer>
  );
};
