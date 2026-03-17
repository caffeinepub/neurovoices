import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { SiGmail, SiLinkedin } from "react-icons/si";

export function AboutUsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              <Heart className="w-3.5 h-3.5" />
              The story behind the mission
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Story Behind Beyond Neural
            </p>
            <div className="w-12 h-1 bg-primary rounded-full mt-6" />
          </motion.div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 mb-16"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              Beyond Neural was founded by{" "}
              <strong className="text-foreground">Khushbu Maheshwari</strong>, a
              Chartered Accountant who recognized a critical gap in the
              professional and social landscape. With a career built on
              precision and growth, Khushbu saw that while the world has made
              strides in diversity, neurological conditions remain shrouded in
              outdated stigma and silence.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              She started Beyond Neural as someone deeply moved by the gap
              between how neurological conditions are discussed in clinical
              spaces versus how they are <em>lived</em> every day. The
              statistics tell you one thing. A person sitting in the dark at
              2am, finally feeling understood because someone else wrote exactly
              what they felt - that is something different. That is what we are
              building here.
            </p>

            {/* Quote block */}
            <motion.blockquote
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl bg-primary/8 border-l-4 border-primary px-8 py-8 mt-8"
            >
              <p className="font-display text-2xl font-semibold text-foreground leading-relaxed">
                &ldquo;Diagnosis is a chapter, not the entire book.&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-8">
              Reach out - we&apos;d love to hear from you.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <motion.a
                href="https://www.linkedin.com/in/khushbuu-maheshwari"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about-us.link"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 bg-card rounded-2xl p-6 shadow-soft hover:shadow-bloom transition-shadow group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2]/20 transition-colors">
                  <SiLinkedin className="w-6 h-6 text-[#0A66C2]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">
                    Khushbu Maheshwari
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:truthbeyondneural@gmail.com"
                data-ocid="about-us.link"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 bg-card rounded-2xl p-6 shadow-soft hover:shadow-bloom transition-shadow group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 group-hover:bg-rose-200 transition-colors">
                  <SiGmail className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    truthbeyondneural@gmail.com
                  </p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
