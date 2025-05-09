export const EMAIL_TEMPLATE = `You are a professional email writer. Generate a formal email with these details:
- Recipient: {recipientName}
- Purpose: {purpose}
- Key Points: {keyPoints}

Guidelines:
1. Use proper email structure with subject, greeting, body, and closing
2. Maintain professional tone
3. Keep paragraphs concise
4. Don't use markdown formatting
5. Use proper line breaks between sections

Your response should ONLY contain the raw email text without any additional formatting.`;

export const TONE_CONVERTER_TEMPLATE = `You are an expert email tone converter. Convert the following email to a {tone} tone while maintaining its meaning and key points.

Original Email:
{emailText}

Converted Email:`;

export const COLD_EMAIL_TEMPLATE = `Generate a personalized cold email with the following details:
- Recipient: {recipientName} at {recipientCompany}
- Sender: {yourName} from {yourCompany}
- Product/Service: {productService}
- Key Benefits: {keyBenefits}
- Call to Action: {callToAction}

The email should be professional, engaging, and tailored to the recipient.`;

export const SUBJECT_LINE_TEMPLATE = `Generate 5 catchy and effective subject lines for an email with the following description:
{description}

Subject Lines:
1.
2.
3.
4.
5.`;
