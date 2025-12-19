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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";
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

const stackItems = [
  { src: "/react-1-logo-svgrepo-com.svg", title: "React" },
  { src: "/next-js.svg", srcDark: "/next-js-dark.svg", title: "Next.js" },
  { src: "/javascript-svgrepo-com.svg", title: "Javascript" },
  { src: "/html-5-svgrepo-com.svg", title: "HTML" },
  { src: "/css-3-svgrepo-com.svg", title: "CSS" },
  { src: "/Vitest--Streamline-Svg-Logos.svg", title: "Vitest" },
  { src: "/node-js-svgrepo-com.svg", title: "Node.js" },
  { src: "/typescript-svgrepo-com.svg", title: "Typescript" },
  {
    src: "/express-svgrepo-com.svg",
    srcDark: "/express-svgrepo-com-dark.svg",
    title: "Express",
  },
  {
    src: "/github-svgrepo-com.svg",
    srcDark: "/github-svgrepo-com-dark.svg",
    title: "Github",
  },
  { src: "/git-icon-logo-svgrepo-com.svg", title: "Git" },
  { src: "/vitejs-svgrepo-com.svg", title: "Vite" },
  { src: "/jest-svgrepo-com.svg", title: "Jest" },
  { src: "/tailwind-svgrepo-com.svg", title: "Tailwind" },
  { src: "/react-router-svgrepo-com.svg", title: "React router" },
  { src: "/sass-svgrepo-com.svg", title: "Sass" },
  { src: "/scss-svgrepo-com.svg", title: "SCSS" },
  { src: "/postgresql-icon.svg", title: "PostgresSQL" },
  {
    src: "/prisma-svgrepo-com.svg",
    srcDark: "/prisma-svgrepo-com-dark.svg",
    title: "Prisma",
  },
  { src: "/supabase-logo-icon.png", title: "Supabase" },
  {
    src: "/shadcn-ui-seeklogo.svg",
    srcDark: "/shadcn-ui-seeklogo-dark.svg",
    title: "shadcn/ui",
  },
  {
    src: "/aws-svgrepo-com.svg",
    srcDark: "/aws-svgrepo-com-dark.svg",
    title: "aws",
  },
];

export const Stack = () => {
  const { darkMode } = useTheme();
  const [hovered, setHovered] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      <span className="text-lg">Tech Stack</span>
      <ul
        className="flex flex-wrap gap-2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHovered(null);
        }}
      >
        {stackItems.map((item, index) => (
          <StackButton
            key={item.title}
            src={darkMode && item.srcDark ? item.srcDark : item.src}
            title={item.title}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            isHovering={isHovering}
          />
        ))}
      </ul>
    </section>
  );
};

const StackButton = ({
  src,
  title,
  index,
  hovered,
  setHovered,
  isHovering,
}: {
  src: string;
  title: string;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  isHovering: boolean;
}) => {
  return (
    <li onMouseEnter={() => setHovered(index)}>
      <Card
        className={cn(
          "flex w-fit rounded-none py-2 transition-all duration-300 ease-out",
          isHovering &&
            hovered !== null &&
            hovered !== index &&
            "scale-[0.98] blur-sm",
        )}
      >
        <CardContent className="flex items-center gap-2">
          <Image height={20} width={20} src={src} alt={title} />
          <span>{title}</span>
        </CardContent>
      </Card>
    </li>
  );
};

export const Projects = () => {
  const { darkMode } = useTheme();
  const [hovered, setHovered] = useState<number | null>(null);

  const projectsData = [
    {
      title: "React Input CLI",
      description:
        "CLI based on shadcn's component library CLI with formatted input components based on Cleave JS.",
      tech: [
        { src: "/javascript-svgrepo-com.svg", title: "Javascript" },
        { src: "/react-1-logo-svgrepo-com.svg", title: "React" },
        { src: "/typescript-svgrepo-com.svg", title: "Typescript" },
        { src: "/vitejs-svgrepo-com.svg", title: "Vite" },
        { src: "/tailwind-svgrepo-com.svg", title: "Tailwind" },
      ],
    },
    {
      title: "Blog",
      description:
        "Static React site with react router for page routing based on jekyll with posts written in json instead of markdown.",
      tech: [
        { src: "/react-1-logo-svgrepo-com.svg", title: "React" },
        { src: "/typescript-svgrepo-com.svg", title: "Typescript" },
        { src: "/vitejs-svgrepo-com.svg", title: "Vite" },
        { src: "/tailwind-svgrepo-com.svg", title: "Tailwind" },
        { src: "/react-router-svgrepo-com.svg", title: "React router" },
      ],
    },
    {
      title: "Personal website",
      description:
        "Simple next personal website with shadcn components and supabase postgres database for storing messages.",
      tech: [
        { src: "/next-js.svg", srcDark: "/next-js-dark.svg", title: "Next.js" },
        { src: "/typescript-svgrepo-com.svg", title: "Typescript" },
        { src: "/tailwind-svgrepo-com.svg", title: "Tailwind" },
        { src: "/postgresql-icon.svg", title: "PostgresSQL" },
        {
          src: "/shadcn-ui-seeklogo.svg",
          srcDark: "/shadcn-ui-seeklogo-dark.svg",
          title: "shadcn/ui",
        },
      ],
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4">
      <h4 className="text-lg">Projects</h4>
      <ul className="flex w-full flex-col gap-4 md:flex-row">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          >
            {project.tech.map((tech) => (
              <ProjectButton
                key={tech.title}
                src={darkMode && tech.srcDark ? tech.srcDark : tech.src}
                title={tech.title}
              />
            ))}
          </ProjectCard>
        ))}
      </ul>
    </section>
  );
};

const ProjectCard = ({
  title,
  description,
  children,
  index,
  hovered,
  setHovered,
}: {
  title: string;
  description: string;
  children: ReactNode;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <li
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <Card
        className={cn(
          "h-full w-full rounded-none transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm",
        )}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">{children}</ul>
        </CardContent>
      </Card>
    </li>
  );
};

const ProjectButton = ({ src, title }: { src: string; title: string }) => {
  return (
    <li>
      <Card className="flex w-fit rounded-none py-2">
        <CardContent className="flex items-center gap-2 px-2">
          <Image height={15} width={15} src={src} alt={title} />
          <span className="text-xs">{title}</span>
        </CardContent>
      </Card>
    </li>
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

  const [vanish, setVanish] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  );

  const handleBlur = (value: string, key: keyof typeof error) => {
    if (!value) {
      setError((prev) => ({
        ...prev,
        [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
      }));
      return;
    }

    if (
      key === "email" &&
      !value.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      setError((prev) => ({
        ...prev,
        email: "Valid email address required",
      }));
      return;
    }

    setError((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: Partial<typeof error> = {};

    (Object.keys(input) as (keyof typeof input)[]).forEach((key) => {
      if (!input[key]) {
        errors[key] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (
      input.email &&
      !input.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      errors.email = "Valid email address required";
    }

    if (Object.keys(errors).length) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    const toastId = toast.loading("Sending message");

    try {
      const { error } = await supabase.from("messages").insert({
        name: input.name,
        email: input.email,
        message: input.message,
      });

      if (error) {
        toast.error("Failed to send message", { id: toastId });
        return;
      }

      setVanish(true);
      toast.success("Message sent", { id: toastId });

      setTimeout(() => {
        setInput({ name: "", email: "", message: "" });
        setVanish(false);
        setDialogOpen(false);
      }, 600);
    } catch {
      toast.error("Server or database error", { id: toastId });
    }
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);

    if (!open) {
      setError({ name: "", email: "", message: "" });
      setVanish(false);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <span className="text-lg">Get in touch</span>
      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
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
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <div className="flex h-5 justify-between">
                    <FieldLabel htmlFor="name">
                      Name <span className="text-red-600">*</span>
                    </FieldLabel>
                    <span className="text-sm font-medium text-red-600">
                      {error.name}
                    </span>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    value={input.name}
                    vanishOnClear={vanish}
                    onClearComplete={() =>
                      setInput((prev) => ({ ...prev, name: "" }))
                    }
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    onBlur={() => handleBlur(input.name, "name")}
                    className={
                      error.name
                        ? "border-2 border-red-600 focus-visible:ring-red-600"
                        : undefined
                    }
                  />
                </Field>
                <Field>
                  <div className="flex h-5 justify-between">
                    <FieldLabel htmlFor="email">
                      Email <span className="text-red-600">*</span>
                    </FieldLabel>
                    <span className="text-sm font-medium text-red-600">
                      {error.email}
                    </span>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    placeholder="johnsmith@mail.com"
                    value={input.email}
                    vanishOnClear={vanish}
                    onClearComplete={() =>
                      setInput((prev) => ({ ...prev, email: "" }))
                    }
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    onBlur={() => handleBlur(input.email, "email")}
                    className={
                      error.email
                        ? "border-2 border-red-600 focus-visible:ring-red-600"
                        : undefined
                    }
                  />
                </Field>
                <Field>
                  <div className="flex h-5 justify-between">
                    <FieldLabel htmlFor="message">
                      Message <span className="text-red-600">*</span>
                    </FieldLabel>
                    <span className="text-sm font-medium text-red-600">
                      {error.message}
                    </span>
                  </div>

                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={input.message}
                    vanishOnClear={vanish}
                    onClearComplete={() =>
                      setInput((prev) => ({ ...prev, message: "" }))
                    }
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    onBlur={() => handleBlur(input.message, "message")}
                    className={
                      error.message
                        ? "border-2 border-red-600 focus-visible:ring-red-600"
                        : undefined
                    }
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
