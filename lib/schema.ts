import { z } from "zod";

export const emailSchema = z.object({
  recipientName: z.string().min(2, "Name must be at least 2 characters"),
  purpose: z.enum(["Meeting Request", "Follow Up", "Thank You"]),
  keyPoints: z.string().min(2, "Please provide at least 2 key points"),
});

export const toneConverterSchema = z.object({
  emailText: z.string().min(10, "Email text must be at least 10 characters"),
  tone: z.enum(["formal", "casual", "friendly"]),
});

export const coldEmailSchema = z.object({
  recipientName: z
    .string()
    .min(2, "Recipient name must be at least 2 characters"),
  recipientCompany: z
    .string()
    .min(2, "Recipient company must be at least 2 characters"),
  yourName: z.string().min(2, "Your name must be at least 2 characters"),
  yourCompany: z.string().min(2, "Your company must be at least 2 characters"),
  productService: z
    .string()
    .min(2, "Product/Service must be at least 2 characters"),
  keyBenefits: z
    .string()
    .min(10, "Key benefits must be at least 10 characters"),
  callToAction: z
    .string()
    .min(2, "Call to action must be at least 2 characters"),
});

export const subjectLineSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type EmailSchema = z.infer<typeof emailSchema>;
export type ToneConverterSchema = z.infer<typeof toneConverterSchema>;
export type ColdEmailSchema = z.infer<typeof coldEmailSchema>;
export type SubjectLineSchema = z.infer<typeof subjectLineSchema>;
