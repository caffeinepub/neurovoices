import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MessageCircle, Shield, Users } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Shield,
    title: "Anonymous & Safe",
    desc: "Your identity is never revealed. Share freely without fear of judgment.",
  },
  {
    icon: Heart,
    title: "With Compassion",
    desc: "Every story is received with empathy. This is a judgment-free community.",
  },
  {
    icon: Users,
    title: "You're Not Alone",
    desc: "Thousands of people live with neurological conditions. Your story matters.",
  },
  {
    icon: MessageCircle,
    title: "Leave Encouragement",
    desc: "Read others' stories and leave an anonymous word of support. A few kind words can mean the world to someone.",
  },
];

const sampleConditions = [
  "ADHD",
  "Anxiety",
  "Depression",
  "Autism Spectrum Disorder",
  "PTSD",
  "Bipolar Disorder",
  "Dyslexia",
  "Schizophrenia",
  "Epilepsy",
  "Autism",
  "Parkinson's",
  "& Many Others",
];

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, oklch(0.52 0.14 295 / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, oklch(0.54 0.10 188 / 0.12) 0%, transparent 50%)",
          }}
        />
        <div className="relative container mx-auto px-4 pt-20 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Heart className="w-3.5 h-3.5" />
                Breaking the stigma, one story at a time
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">Your </span>
              <span className="text-primary">neurological</span>
              <span className="block">
                <span className="text-primary">story</span>
                <span className="text-foreground"> deserves</span>
              </span>
              <span className="text-foreground"> to be heard.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              Beyond Neural is a safe, anonymous space for people living with
              neurological conditions to share experiences, find community, and
              remind each other: you are never alone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/share" data-ocid="home.primary_button">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-bloom"
                >
                  Share Your Story
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/stories" data-ocid="home.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-border hover:bg-secondary"
                >
                  Read Stories
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              A community built on understanding
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe that sharing experiences is one of the most powerful
              tools for healing and awareness.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-bloom transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Stories from every corner of neurodiversity
            </h2>
            <p className="text-muted-foreground">
              From ADHD to Parkinson's - all experiences welcome.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center">
            {sampleConditions.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to="/stories"
                  data-ocid="home.link"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary/15 hover:text-primary transition-colors"
                >
                  {c}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-primary px-8 py-16 text-center"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 50%, oklch(0.60 0.12 295) 0%, oklch(0.45 0.16 295) 100%)",
            }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to share your story?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Your words could be the light someone else needs today. 100%
              anonymous, always.
            </p>
            <Link to="/share" data-ocid="home.cta_button">
              <Button
                size="lg"
                className="bg-card text-foreground hover:bg-card/90 gap-2 shadow-lg"
              >
                Share Anonymously
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
