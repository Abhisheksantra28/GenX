"use client";

import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import { UserAvatar } from "@/components/UserAvatar";
import { AIAvatar } from "@/components/AIAvatar";
import { useProModalStore } from "@/hooks/useProModal";

interface ChatCompletion {
  role: string;
  parts: string;
}

const CodePage = () => {
  const proModal = useProModalStore();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletion[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletion = {
        role: "user",
        parts: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      const responseData = response.data;

      setMessages((curr) => [
        ...curr,
        { role: "user", parts: values.prompt },
        { role: "AI", parts: responseData },
      ]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Transform ideas into code effortlessly"
        icon={Code}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />

      <div className="px-4 lg:px-8 ">
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitHandler)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m=0 p-0 ">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Input your creative ideas here"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                size="icon"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Conversation not started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((msg) => (
              <div
                key={msg.parts}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  msg.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {msg.role === "user" ? <UserAvatar /> : <AIAvatar />}

                <ReactMarkdown
                  className="w-full h-full text-sm leading-7 overflow-hidden"
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),

                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                >
                  {msg.parts}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
