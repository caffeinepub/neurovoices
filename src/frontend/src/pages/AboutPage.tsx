import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  Heart,
  Lightbulb,
  Megaphone,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const values = [
  {
    icon: Shield,
    title: "Safety first",
    desc: "Complete anonymity. No accounts, no tracking of who you are. Your words belong to you.",
  },
  {
    icon: Heart,
    title: "Radical empathy",
    desc: "We lead with compassion. Every story is valid. Every struggle is real.",
  },
  {
    icon: Megaphone,
    title: "Raising awareness",
    desc: "The more we talk openly about neurological conditions, the less power stigma has.",
  },
  {
    icon: Lightbulb,
    title: "Education & understanding",
    desc: "Personal stories do what clinical papers cannot - they create genuine human understanding.",
  },
];

export function AboutPage() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !actor) return;
    setSubmitting(true);
    setError("");
    try {
      await actor.subscribe(name.trim(), email.trim());
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              <Heart className="w-3.5 h-3.5" />
              Stay connected
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Stay Connected
            </h1>
            <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          </motion.div>

          {/* Stay Connected Section - above purpose paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-primary/8 border border-primary/20 px-8 py-10 mb-16"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Stay connected to Beyond Neural
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If this space resonated with you, you can choose to receive:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-foreground">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                One real story every couple of weeks
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Occasional reflections and gentle prompts
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mb-8 italic">
              No spam. Just something honest, once in a while.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center py-6 gap-3"
                data-ocid="subscribe.success_state"
              >
                <CheckCircle2 className="w-10 h-10 text-primary" />
                <p className="text-lg font-semibold text-foreground">
                  You&apos;ll hear from us soon.
                </p>
                <p className="text-muted-foreground">
                  Until then, you&apos;re always welcome here.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="space-y-4 max-w-md"
                data-ocid="subscribe.panel"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="sub-name" className="text-foreground">
                    Name{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="sub-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-ocid="subscribe.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sub-email" className="text-foreground">
                    Email <span className="text-destructive text-xs">*</span>
                  </Label>
                  <Input
                    id="sub-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-ocid="subscribe.input"
                  />
                </div>
                {error && (
                  <p
                    className="text-sm text-destructive"
                    data-ocid="subscribe.error_state"
                  >
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={submitting || !email.trim()}
                  className="w-full sm:w-auto"
                  data-ocid="subscribe.submit_button"
                >
                  {submitting ? "Subscribing..." : "Stay in touch"}
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 mb-16"
          >
            <p className="text-xl text-foreground leading-relaxed font-medium">
              The purpose of Beyond Neural is to dismantle the invisible
              barriers that people with neurological conditions face in their
              careers, social lives, and self-perception. We believe that a
              brain&apos;s &ldquo;wiring&rdquo; should never be a source of
              shame or a hurdle to professional excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              What we stand for
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-xl p-6 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
