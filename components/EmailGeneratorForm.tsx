"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, EmailSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CopyButton } from "./CopyButton";

interface EmailResponse {
  email: string;
}

interface ErrorResponse {
  error: string;
}

export function EmailGeneratorForm() {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      recipientName: "",
      purpose: "Meeting Request",
      keyPoints: "",
    },
  });

  const onSubmit = async (data: EmailSchema) => {
    try {
      setIsLoading(true);
      setGeneratedEmail("");

      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to generate email");
      }

      const successData: EmailResponse = await response.json();
      setGeneratedEmail(successData.email);
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

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Purpose</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Meeting Request">
                      Meeting Request
                    </SelectItem>
                    <SelectItem value="Follow Up">Follow Up</SelectItem>
                    <SelectItem value="Thank You">Thank You</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keyPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Points</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter key points separated by commas"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Email"}
          </Button>
        </form>
      </Form>
      {generatedEmail && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-muted rounded-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Email</h2>
            <CopyButton text={generatedEmail} />
          </div>
          <div className="whitespace-pre-wrap text-foreground">
            {generatedEmail}
          </div>
        </motion.div>
      )}
    </div>
  );
}
 