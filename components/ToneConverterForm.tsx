"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toneConverterSchema, ToneConverterSchema } from "@/lib/schema";
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

interface ToneConverterResponse {
  convertedEmail: string;
}

interface ErrorResponse {
  error: string;
}

export function ToneConverterForm() {
  const [convertedEmail, setConvertedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ToneConverterSchema>({
    resolver: zodResolver(toneConverterSchema),
    defaultValues: { emailText: "", tone: "formal" },
  });

  const onSubmit = async (data: ToneConverterSchema) => {
    try {
      setIsLoading(true);
      setConvertedEmail("");

      const response = await fetch("/api/convert-tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to convert tone");
      }

      const successData: ToneConverterResponse = await response.json();
      setConvertedEmail(successData.convertedEmail);
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
            name="emailText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your email here"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Tone</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Converting..." : "Convert Tone"}
          </Button>
        </form>
      </Form>
      {convertedEmail && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-muted rounded-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Converted Email</h2>
            <CopyButton text={convertedEmail} />
          </div>
          <div className="whitespace-pre-wrap text-foreground">
            {convertedEmail}
          </div>
        </motion.div>
      )}
    </div>
  );
}
 