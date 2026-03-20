import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Text "mo:core/Text";



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

  var stories : [Story] = [];
  var nextStoryId = 0;

  var comments : [Comment] = [];
  var nextCommentId = 0;

  var subscribers : [Subscriber] = [];

  let adminPassword = "admin";

  public shared ({ caller }) func submitStory(title : Text, condition : Condition, text : Text) : async () {
    let timestamp = Time.now();
    let story : Story = {
      id = nextStoryId;
      title;
      condition;
      text;
      timestamp;
    };
    stories := stories.concat([story]);
    nextStoryId += 1;
  };

  public shared ({ caller }) func submitComment(storyId : Nat, text : Text) : async () {
    let timestamp = Time.now();
    let comment : Comment = {
      id = nextCommentId;
      storyId;
      text;
      timestamp;
    };
    comments := comments.concat([comment]);
    nextCommentId += 1;
  };

  public query ({ caller }) func getStories() : async [Story] {
    stories.sort(Story.compareByNewestFirst);
  };

  public query ({ caller }) func getStoriesByCondition(condition : Condition) : async [Story] {
    stories.filter(
      func(story) {
        story.condition == condition;
      }
    ).sort(Story.compareByNewestFirst);
  };

  public query ({ caller }) func getStoryCount() : async Nat {
    nextStoryId;
  };

  public query ({ caller }) func getStoryById(id : Nat) : async Story {
    let story = stories.find(func(story) { story.id == id });
    switch (story) {
      case (?found) { found };
      case (null) { Runtime.trap("Story not found") };
    };
  };

  public query ({ caller }) func getCommentsByStory(storyId : Nat) : async [Comment] {
    comments.filter(
      func(c) { c.storyId == storyId }
    ).sort(Comment.compareByNewestFirst);
  };

  public shared ({ caller }) func subscribe(name : Text, email : Text) : async () {
    subscribers := subscribers.concat([{
      name;
      email;
      timestamp = Time.now();
    }]);
  };

  public query ({ caller }) func getSubscribers(password : Text) : async [Subscriber] {
    if (password != adminPassword) {
      Runtime.trap("Unauthorized");
    };
    subscribers;
  };
};
