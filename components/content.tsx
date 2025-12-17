"use client";

import { ReactNode, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, MapPin } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex h-screen flex-col">{children}</div>
    </>
  );
};

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex flex-col gap-4 px-4 md:px-0">{children}</main>
    </>
  );
};

export const Nav = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <>
      <nav className="sticky top-0 flex flex-col">
        <div className="flex justify-end p-4 md:px-0 md:py-0">
          <Button
            className="relative flex w-8 items-center justify-center"
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
  return (
    <>
      <header>
        <h1 className="text-2xl">Hi, I'm Jordan</h1>
        <div className="flex gap-4">
          <h2>Frontend Developer</h2>
          <MapPin className="size-5" />
          <div className="flex gap-2">
            <h3>United Kingdom</h3>
            <Image
              width={20}
              height={20}
              src="/flag-for-united-kingdom_1f1ec-1f1e7.png"
              alt="united kingdom flag"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export const Stack = () => {
  return (
    <>
      <section>
        <span>Tech Stack</span>
      </section>
    </>
  );
};

const StackButton = () => {
  return (
    <>
      <button></button>
    </>
  );
};

export const Projects = () => {
  return (
    <>
      <section className="flex flex-col gap-4">
        <ProjectCard
          title="React Input CLI"
          description="CLI based on shadcn's component library CLI with formatted input components based on Cleave JS"
        />
        <ProjectCard
          title="Blog"
          description="Simple blog based on jekyll with posts written in json instead of markdown"
        />
        <ProjectCard
          title="Personal website"
          description="Single page personal website with a contact form"
        />
      </section>
    </>
  );
};

const ProjectCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <Card className="rounded-none">
        <CardContent>
          <span>{title}</span>
          <p>{description}</p>
          <div></div>
        </CardContent>
      </Card>
    </>
  );
};

export const Form = () => {
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
  return (
    <>
      <span>Get in touch</span>
      <Card className="rounded-none">
        <CardContent>
          <form onSubmit={handleSubmit} action="POST" noValidate>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Contact</FieldLegend>
                <FieldGroup>
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
                        setInput((prev) => ({ ...prev, name: e.target.value }))
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
                        setInput((prev) => ({ ...prev, email: e.target.value }))
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
                  <Button>Send</Button>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
