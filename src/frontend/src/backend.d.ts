import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Subscriber {
    name: string;
    email: string;
    timestamp: bigint;
}
export interface Comment {
    id: bigint;
    storyId: bigint;
    text: string;
    timestamp: bigint;
}
export interface Story {
    id: bigint;
    title: string;
    text: string;
    timestamp: bigint;
    condition: Condition;
}
export enum Condition {
    asd = "asd",
    ocd = "ocd",
    parkinson = "parkinson",
    anxiety = "anxiety",
    epilepsy = "epilepsy",
    adhd = "adhd",
    ptsd = "ptsd",
    dyslexia = "dyslexia",
    others = "others",
    autism = "autism",
    bipolar = "bipolar",
    depression = "depression",
    schizophrenia = "schizophrenia"
}
export interface backendInterface {
    getCommentsByStory(storyId: bigint): Promise<Array<Comment>>;
    getStories(): Promise<Array<Story>>;
    getStoriesByCondition(condition: Condition): Promise<Array<Story>>;
    getStoryById(id: bigint): Promise<Story>;
    getStoryCount(): Promise<bigint>;
    getSubscribers(password: string): Promise<Array<Subscriber>>;
    submitComment(storyId: bigint, text: string): Promise<void>;
    submitStory(title: string, condition: Condition, text: string): Promise<void>;
    subscribe(name: string, email: string): Promise<void>;
}
