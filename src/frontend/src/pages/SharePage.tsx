import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  CONDITION_LABELS,
  Condition,
  useSubmitStory,
} from "../hooks/useQueries";

const ALL_CONDITIONS = Object.values(Condition);

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
  { value: "prefer_not", label: "Prefer not to disclose" },
];

export function SharePage() {
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState<Condition | "">("");
  const [text, setText] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending, isError } = useSubmitStory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!condition) return;
    await mutateAsync({
      title,
      condition: condition as Condition,
      text,
      age,
      gender,
    });
    setSubmitted(true);
    setTitle("");
    setCondition("");
    setText("");
    setAge("");
    setGender("");
  };

  if (submitted) {
    return (
      <div className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          data-ocid="share.success_state"
          className="max-w-md mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Story shared!
          </h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your courage. Your story is now part of the community
            and may help someone feel less alone today.
          </p>
          <Button
            data-ocid="share.secondary_button"
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="border-border hover:bg-secondary"
          >
            Share another story
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                <Lock className="w-3.5 h-3.5" />
                Always anonymous
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Share your story
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your name will never be shown. Write as openly as you feel
              comfortable. There{"'s"} no right or wrong way to tell your story.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 shadow-soft space-y-6"
          >
            <div className="space-y-2">
              <Label
                htmlFor="story-title"
                className="text-sm font-medium text-foreground"
              >
                Give your story a title
              </Label>
              <Input
                id="story-title"
                data-ocid="share.input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Finding my way with ADHD"
                required
                minLength={3}
                className="border-border"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="story-age"
                  className="text-sm font-medium text-foreground"
                >
                  Age{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="story-age"
                  data-ocid="share.input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 28"
                  className="border-border"
                  type="number"
                  min={1}
                  max={120}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="story-gender"
                  className="text-sm font-medium text-foreground"
                >
                  Gender{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger
                    id="story-gender"
                    data-ocid="share.select"
                    className="border-border"
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="story-condition"
                className="text-sm font-medium text-foreground"
              >
                Related condition
              </Label>
              <Select
                value={condition}
                onValueChange={(v) => setCondition(v as Condition)}
                required
              >
                <SelectTrigger
                  id="story-condition"
                  data-ocid="share.select"
                  className="border-border"
                >
                  <SelectValue placeholder="Select a condition" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_CONDITIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CONDITION_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="story-text"
                className="text-sm font-medium text-foreground"
              >
                Your story
              </Label>
              <Textarea
                id="story-text"
                data-ocid="share.textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience, journey, or what you'd want others to know\u2026"
                required
                minLength={50}
                rows={8}
                className="border-border resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Minimum 50 characters. Be as detailed as you feel comfortable
                with.
              </p>
            </div>

            {isError && (
              <div
                data-ocid="share.error_state"
                className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3"
              >
                Something went wrong. Please try again.
              </div>
            )}

            <Button
              type="submit"
              data-ocid="share.submit_button"
              disabled={isPending || !condition}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-12 text-base"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sharing\u2026
                </>
              ) : (
                "Share anonymously"
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
