import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Condition } from "../backend";
import type { Comment } from "../backend.d";
import { useActor } from "./useActor";

export { Condition };
export type { Comment };

export const CONDITION_LABELS: Record<Condition, string> = {
  [Condition.asd]: "Autism Spectrum Disorder",
  [Condition.ocd]: "OCD",
  [Condition.anxiety]: "Anxiety",
  [Condition.adhd]: "ADHD",
  [Condition.ptsd]: "PTSD",
  [Condition.dyslexia]: "Dyslexia",
  [Condition.bipolar]: "Bipolar Disorder",
  [Condition.depression]: "Depression",
  [Condition.schizophrenia]: "Schizophrenia",
  [Condition.epilepsy]: "Epilepsy",
  [Condition.autism]: "Autism",
  [Condition.parkinson]: "Parkinson's",
  [Condition.others]: "Others",
};

export const CONDITION_COLORS: Record<Condition, string> = {
  [Condition.asd]: "bg-violet-100 text-violet-700",
  [Condition.ocd]: "bg-rose-100 text-rose-700",
  [Condition.anxiety]: "bg-amber-100 text-amber-700",
  [Condition.adhd]: "bg-sky-100 text-sky-700",
  [Condition.ptsd]: "bg-orange-100 text-orange-700",
  [Condition.dyslexia]: "bg-teal-100 text-teal-700",
  [Condition.bipolar]: "bg-purple-100 text-purple-700",
  [Condition.depression]: "bg-slate-100 text-slate-700",
  [Condition.schizophrenia]: "bg-pink-100 text-pink-700",
  [Condition.epilepsy]: "bg-red-100 text-red-700",
  [Condition.autism]: "bg-indigo-100 text-indigo-700",
  [Condition.parkinson]: "bg-emerald-100 text-emerald-700",
  [Condition.others]: "bg-gray-100 text-gray-700",
};

export function useGetStories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStoriesByCondition(condition: Condition | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stories", condition],
    queryFn: async () => {
      if (!actor) return [];
      if (!condition) return actor.getStories();
      return actor.getStoriesByCondition(condition);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      condition,
      text,
    }: {
      title: string;
      condition: Condition;
      text: string;
      age?: string;
      gender?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitStory(title, condition, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}

export function useGetCommentsByStory(storyId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Comment[]>({
    queryKey: ["comments", storyId?.toString()],
    queryFn: async () => {
      if (!actor || storyId === null) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getCommentsByStory(storyId) as Promise<Comment[]>;
    },
    enabled: !!actor && !isFetching && storyId !== null,
  });
}

export function useSubmitComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      storyId,
      text,
    }: { storyId: bigint; text: string }) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).submitComment(storyId, text) as Promise<void>;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.storyId.toString()],
      });
    },
  });
}
