import List "mo:core/List";
import Time "mo:core/Time";

module {
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

  type Comment = {
    id : Nat;
    storyId : Nat;
    text : Text;
    timestamp : Int;
  };

  type Story = {
    id : Nat;
    title : Text;
    condition : Condition;
    text : Text;
    timestamp : Int;
  };

  type OldActor = {
    storyList : List.List<Story>;
    storyCount : Nat;
    commentList : List.List<Comment>;
    commentCount : Nat;
  };

  type Subscriber = {
    name : Text;
    email : Text;
    timestamp : Int;
  };

  type NewActor = {
    storyList : List.List<Story>;
    storyCount : Nat;
    commentList : List.List<Comment>;
    commentCount : Nat;
    subscribers : List.List<Subscriber>;
    adminPassword : Text;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      subscribers = List.empty<Subscriber>();
      adminPassword = "admin";
    };
  };
};
