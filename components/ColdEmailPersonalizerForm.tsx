"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coldEmailSchema, ColdEmailSchema } from "@/lib/schema";
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CopyButton } from "./CopyButton";

interface ColdEmailResponse {
  email: string;
}

interface ErrorResponse {
  error: string;
}

export function ColdEmailPersonalizerForm() {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ColdEmailSchema>({
    resolver: zodResolver(coldEmailSchema),
    defaultValues: {
      recipientName: "",
      recipientCompany: "",
      yourName: "",
      yourCompany: "",
      productService: "",
      keyBenefits: "",
      callToAction: "",
    },
  });

  const onSubmit = async (data: ColdEmailSchema) => {
    try {
      setIsLoading(true);
      setGeneratedEmail("");

      const response = await fetch("/api/generate-cold-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to generate cold email");
      }

      const successData: ColdEmailResponse = await response.json();
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
            name="recipientCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yourName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yourCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Company</FormLabel>
                <FormControl>
                  <Input placeholder="XYZ Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product/Service</FormLabel>
                <FormControl>
                  <Input placeholder="AI Email Tool" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keyBenefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Benefits</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List key benefits (e.g., saves time, increases efficiency)"
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
            name="callToAction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call to Action</FormLabel>
                <FormControl>
                  <Input placeholder="Schedule a demo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Cold Email"}
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
            <h2 className="text-xl font-semibold">Generated Cold Email</h2>
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
 