import { z } from 'zod';

export const emailSchema = z.object({
    recipientName: z.string().min(2, "Name must be at least 2 characters"),
    purpose: z.enum(["Meeting Request", "Follow Up", "Thank You"]),
    keyPoints: z.string().min(2,"Please provide at least 2 key points"),
})

export type EmailSchema = z.infer<typeof emailSchema>;