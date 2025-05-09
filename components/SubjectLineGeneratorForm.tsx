"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subjectLineSchema, SubjectLineSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CopyButton } from "./CopyButton";

interface SubjectLineResponse {
  subjectLines: string[];
}

interface ErrorResponse {
  error: string;
}

export function SubjectLineGeneratorForm() {
  const [subjectLines, setSubjectLines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SubjectLineSchema>({
    resolver: zodResolver(subjectLineSchema),
    defaultValues: { description: "" },
  });

  const onSubmit = async (data: SubjectLineSchema) => {
    try {
      setIsLoading(true);
      setSubjectLines([]);

      const response = await fetch("/api/generate-subject-lines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to generate subject lines");
      }

      const successData: SubjectLineResponse = await response.json();
      setSubjectLines(successData.subjectLines);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Join all subject lines into one text for copying all
  const allSubjectLines = subjectLines.join("\n");

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the email purpose or content (e.g., follow-up after a meeting)"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Subject Lines"}
          </Button>
        </form>
      </Form>
      {subjectLines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-muted rounded-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Suggested Subject Lines</h2>
            <CopyButton text={allSubjectLines} />
          </div>
          <ul className="list-disc pl-5 text-foreground">
            {subjectLines.map((line, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: line }}
                className="py-1"
              />
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
