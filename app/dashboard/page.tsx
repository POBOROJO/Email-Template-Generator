"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmailGeneratorForm } from "@/components/EmailGeneratorForm";
import { ToneConverterForm } from "@/components/ToneConverterForm";
import { ColdEmailPersonalizerForm } from "@/components/ColdEmailPersonalizerForm";
import { SubjectLineGeneratorForm } from "@/components/SubjectLineGeneratorForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("email-generator");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Email Tools</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="email-generator">Email Generator</TabsTrigger>
            <TabsTrigger value="tone-converter">Tone Converter</TabsTrigger>
            <TabsTrigger value="cold-email-personalizer">
              Cold Email
            </TabsTrigger>
            <TabsTrigger value="subject-line-generator">
              Subject Lines
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email-generator">
            <EmailGeneratorForm />
          </TabsContent>
          <TabsContent value="tone-converter">
            <ToneConverterForm />
          </TabsContent>
          <TabsContent value="cold-email-personalizer">
            <ColdEmailPersonalizerForm />
          </TabsContent>
          <TabsContent value="subject-line-generator">
            <SubjectLineGeneratorForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
