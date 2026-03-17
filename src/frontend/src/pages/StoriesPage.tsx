import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, Loader2, MessageCircle, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Story } from "../backend";
import { useActor } from "../hooks/useActor";
import {
  CONDITION_COLORS,
  CONDITION_LABELS,
  Condition,
  useGetCommentsByStory,
  useGetStoriesByCondition,
  useSubmitComment,
} from "../hooks/useQueries";

// All conditions shown in the feed tabs (matches Share form, excluding OCD)
const DISPLAYED_CONDITIONS = [
  Condition.epilepsy,
  Condition.autism,
  Condition.asd,
  Condition.parkinson,
  Condition.adhd,
  Condition.anxiety,
  Condition.depression,
  Condition.bipolar,
  Condition.ptsd,
  Condition.schizophrenia,
  Condition.dyslexia,
  Condition.others,
];

// OCD stories are excluded from display
const EXCLUDED_CONDITIONS = new Set([Condition.ocd]);

function timeAgo(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function StoryDialog({
  story,
  open,
  onClose,
}: {
  story: Story;
  open: boolean;
  onClose: () => void;
}) {
  const colorClass =
    CONDITION_COLORS[story.condition] ?? "bg-muted text-muted-foreground";
  const label = CONDITION_LABELS[story.condition] ?? story.condition;
  const { data: comments, isLoading: commentsLoading } = useGetCommentsByStory(
    open ? story.id : null,
  );
  const { mutate: submitComment, isPending } = useSubmitComment();
  const [commentText, setCommentText] = useState("");

  function handleSubmit() {
    const text = commentText.trim();
    if (!text) return;
    submitComment(
      { storyId: story.id, text },
      {
        onSuccess: () => {
          setCommentText("");
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="stories.dialog"
        className="max-w-2xl w-full p-0 overflow-hidden"
      >
        <ScrollArea className="max-h-[88vh]">
          <div className="p-6 md:p-8">
            <DialogHeader className="mb-5">
              <div className="mb-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
                >
                  {label}
                </span>
              </div>
              <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
                {story.title}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {timeAgo(story.timestamp)}
              </p>
            </DialogHeader>

            <p className="text-foreground/80 leading-relaxed text-base mb-8 whitespace-pre-wrap">
              {story.text}
            </p>

            {/* Comment section divider */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground text-lg">
                  Leave a word of encouragement
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                Read these anonymous voices sharing their lived experiences with
                neurological conditions - comment something to motivate them.
                Your message is posted anonymously.
              </p>

              {/* Comment input */}
              <div className="flex flex-col gap-3 mb-6">
                <Textarea
                  data-ocid="stories.textarea"
                  placeholder="Write something encouraging..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="resize-none min-h-[80px] text-sm"
                  disabled={isPending}
                />
                <Button
                  data-ocid="stories.submit_button"
                  onClick={handleSubmit}
                  disabled={isPending || !commentText.trim()}
                  className="self-end flex items-center gap-2"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isPending ? "Sending..." : "Send Anonymously"}
                </Button>
              </div>

              {/* Existing comments */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {comments && comments.length > 0
                      ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
                      : "Comments"}
                  </span>
                </div>

                {commentsLoading && (
                  <div
                    data-ocid="stories.loading_state"
                    className="flex items-center justify-center py-6"
                  >
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                )}

                {!commentsLoading && (!comments || comments.length === 0) && (
                  <p
                    data-ocid="stories.empty_state"
                    className="text-muted-foreground text-sm italic py-2"
                  >
                    Be the first to leave a word of encouragement.
                  </p>
                )}

                {comments && comments.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {comments.map((comment, i) => (
                      <div
                        key={String(comment.id)}
                        data-ocid={`stories.item.${i + 1}`}
                        className="bg-muted/50 rounded-xl px-4 py-3"
                      >
                        <p className="text-sm text-foreground leading-relaxed">
                          {comment.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {timeAgo(comment.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function StoryCard({
  story,
  index,
  onClick,
}: {
  story: Story;
  index: number;
  onClick: () => void;
}) {
  const colorClass =
    CONDITION_COLORS[story.condition] ?? "bg-muted text-muted-foreground";
  const label = CONDITION_LABELS[story.condition] ?? story.condition;
  const snippet =
    story.text.length > 220 ? `${story.text.slice(0, 220)}\u2026` : story.text;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      data-ocid={`stories.item.${index + 1}`}
      onClick={onClick}
      className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-bloom transition-all cursor-pointer hover:-translate-y-1 active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display text-lg font-semibold text-foreground leading-snug flex-1">
          {story.title}
        </h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">
          {timeAgo(story.timestamp)}
        </span>
      </div>
      <div className="mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
        >
          {label}
        </span>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
        {snippet}
      </p>
      <div className="flex items-center gap-1 text-primary/70 text-xs font-medium">
        <MessageCircle className="w-3.5 h-3.5" />
        <span>Click to read &amp; comment</span>
      </div>
    </motion.article>
  );
}

export function StoriesPage() {
  const [activeFilter, setActiveFilter] = useState<Condition | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const { isFetching: actorFetching } = useActor();
  const {
    data: rawStories,
    isLoading,
    isError,
  } = useGetStoriesByCondition(activeFilter);

  // Filter out excluded conditions (e.g. OCD)
  const stories = rawStories?.filter(
    (s) => !EXCLUDED_CONDITIONS.has(s.condition),
  );

  const showLoading = actorFetching || isLoading;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Community Stories
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Anonymous voices sharing their lived experiences with neurological
            conditions. Click a story to read it fully and leave a word of
            encouragement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            type="button"
            data-ocid="stories.tab"
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            All
          </button>
          {DISPLAYED_CONDITIONS.map((c) => (
            <button
              type="button"
              key={c}
              data-ocid="stories.tab"
              onClick={() => setActiveFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {CONDITION_LABELS[c]}
            </button>
          ))}
        </motion.div>

        {showLoading && (
          <div
            data-ocid="stories.loading_state"
            className="flex items-center justify-center py-20"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {isError && (
          <div data-ocid="stories.error_state" className="text-center py-20">
            <p className="text-muted-foreground">
              Unable to load stories. Please try again.
            </p>
          </div>
        )}

        {!showLoading && !isError && stories && stories.length === 0 && (
          <div data-ocid="stories.empty_state" className="text-center py-20">
            <BookOpen className="w-10 h-10 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No stories yet for this condition.
            </p>
            <Link to="/share" data-ocid="stories.primary_button">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Be the first to share
              </Button>
            </Link>
          </div>
        )}

        {!showLoading && !isError && stories && stories.length > 0 && (
          <AnimatePresence mode="wait">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stories.map((story, i) => (
                <StoryCard
                  key={String(story.id)}
                  story={story}
                  index={i}
                  onClick={() => setSelectedStory(story)}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {selectedStory && (
        <StoryDialog
          story={selectedStory}
          open={!!selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}
