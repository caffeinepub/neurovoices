import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Condition = {
    #asd;
    #adhd;
    #anxiety;
    #depression;
    #bipolar;
    #ptsd;
    #ocd;
    #schizophrenia;
    #dyslexia;
    #epilepsy;
    #autism;
    #parkinson;
    #others;
  };

  type Story = {
    id : Nat;
    title : Text;
    condition : Condition;
    text : Text;
    timestamp : Int;
  };

  type Comment = {
    id : Nat;
    storyId : Nat;
    text : Text;
    timestamp : Int;
  };

  type Subscriber = {
    name : Text;
    email : Text;
    timestamp : Int;
  };

  module Story {
    public func compareByNewestFirst(story1 : Story, story2 : Story) : Order.Order {
      Int.compare(story2.timestamp, story1.timestamp);
    };
  };

  module Comment {
    public func compareByNewestFirst(c1 : Comment, c2 : Comment) : Order.Order {
      Int.compare(c2.timestamp, c1.timestamp);
    };
  };

  let storyList = List.empty<Story>();
  var storyCount = 0;

  let commentList = List.empty<Comment>();
  var commentCount = 0;

  let subscribers = List.empty<Subscriber>();

  let adminPassword = "admin";

  public shared ({ caller }) func submitStory(title : Text, condition : Condition, text : Text) : async () {
    let timestamp = Time.now();
    let story : Story = {
      id = storyCount;
      title;
      condition;
      text;
      timestamp;
    };
    storyList.add(story);
    storyCount += 1;
  };

  public shared ({ caller }) func submitComment(storyId : Nat, text : Text) : async () {
    let timestamp = Time.now();
    let comment : Comment = {
      id = commentCount;
      storyId;
      text;
      timestamp;
    };
    commentList.add(comment);
    commentCount += 1;
  };

  public query ({ caller }) func getStories() : async [Story] {
    storyList.toArray().sort(Story.compareByNewestFirst);
  };

  public query ({ caller }) func getStoriesByCondition(condition : Condition) : async [Story] {
    storyList.values().filter(
      func(story) {
        story.condition == condition;
      }
    ).toArray().sort(Story.compareByNewestFirst);
  };

  public query ({ caller }) func getStoryCount() : async Nat {
    storyCount;
  };

  public query ({ caller }) func getStoryById(id : Nat) : async Story {
    let stories = storyList.toArray();
    let story = stories.find(func(story) { story.id == id });
    switch (story) {
      case (?found) { found };
      case (null) { Runtime.trap("Story not found") };
    };
  };

  public query ({ caller }) func getCommentsByStory(storyId : Nat) : async [Comment] {
    commentList.values().filter(
      func(c) { c.storyId == storyId }
    ).toArray().sort(Comment.compareByNewestFirst);
  };

  public shared ({ caller }) func subscribe(name : Text, email : Text) : async () {
    subscribers.add({
      name;
      email;
      timestamp = Time.now();
    });
  };

  public query ({ caller }) func getSubscribers(password : Text) : async [Subscriber] {
    if (password != adminPassword) {
      Runtime.trap("Unauthorized");
    };
    subscribers.toArray();
  };
};
