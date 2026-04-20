import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PortfolioForge" },
      { name: "description", content: "Get in touch with the PortfolioForge team — feedback, partnerships, support." },
      { property: "og:title", content: "Contact — PortfolioForge" },
      { property: "og:description", content: "Reach out for feedback, partnerships, or support." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill out all fields");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setName(""); setEmail(""); setMessage("");
      toast.success("Message sent! We'll be in touch soon.");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold">Get in <span className="text-gradient">touch</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Drop us a line.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
            <Card className="p-5">
              <Mail className="h-5 w-5 text-primary mb-2" />
              <div className="font-semibold">Email</div>
              <a href="mailto:hello@portfolioforge.app" className="text-sm text-muted-foreground hover:text-foreground">hello@portfolioforge.app</a>
            </Card>
            <Card className="p-5">
              <MessageSquare className="h-5 w-5 text-primary mb-2" />
              <div className="font-semibold">Support</div>
              <p className="text-sm text-muted-foreground">Replies within 24 hours on weekdays.</p>
            </Card>
          </div>

          <Card className="p-6 md:col-span-2 shadow-card">
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="grid gap-2">
                <Label>Message</Label>
                <Textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" />
              </div>
              <Button type="submit" variant="hero" disabled={sending}>
                <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
