"use client";

import { useState } from "react";
import { FiLoader, FiSend } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bubble, BubbleContent } from "@/components/ui/bubble";

export default function ContactForm() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState<"IDLE" | "SENDING">("IDLE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.custom(() => (
        <Bubble align="start">
          <BubbleContent className="bg-zinc-800 text-white border-zinc-700 border">
            Please fill in all fields
          </BubbleContent>
        </Bubble>
      ));
      return;
    }

    setStatus("SENDING");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_email: formData.email,
          message: formData.message,
          to_name: "Sahal",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );
      
      toast.custom(() => (
        <Bubble align="start">
          <BubbleContent className="bg-zinc-800 text-white border-zinc-700 border">
            <strong>Message sent successfully!</strong><br />
            I&apos;ll get back to you as soon as possible.
          </BubbleContent>
        </Bubble>
      ));
      
      setFormData({ email: "", message: "" });
      setStatus("IDLE");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      toast.custom(() => (
        <Bubble align="start">
          <BubbleContent className="bg-zinc-800 text-white border-zinc-700 border">
            <strong>Failed to send message</strong><br />
            Please try again later or reach out via social media.
          </BubbleContent>
        </Bubble>
      ));
      setStatus("IDLE");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="hello@example.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell me about your project..."
            className="resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={status === "SENDING"}
          className="w-full sm:w-auto self-start gap-2"
        >
          {status === "SENDING" ? (
            <>
              <FiLoader className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <FiSend />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
