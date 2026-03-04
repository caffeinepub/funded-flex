import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  public type OldUserProfile = {
    name : Text;
  };

  public type OldContactSubmission = {
    name : Text;
    email : Text;
    phoneNumber : Text;
  };

  public type NewUserProfile = {
    name : Text;
    address : Text;
    phoneNumber : Text;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    phoneNumber : Text;
    address : Text;
    orderItems : Text;
    totalPrice : Text;
  };

  public type NewContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  public type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
    submissions : Map.Map<Principal, OldContactSubmission>;
  };

  public type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    contactSubmissions : Map.Map<Nat, NewContactSubmission>;
    orders : Map.Map<Nat, Order>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldProfile) {
        {
          oldProfile with
          address = "";
          phoneNumber = "";
        };
      }
    );

    let newContactSubmissions = old.submissions.map<Principal, OldContactSubmission, NewContactSubmission>(
      func(_principal, oldSubmission) {
        {
          name = oldSubmission.name;
          email = oldSubmission.email;
          message = oldSubmission.phoneNumber;
        };
      }
    );

    {
      userProfiles = newUserProfiles;
      contactSubmissions = Map.empty<Nat, NewContactSubmission>();
      orders = Map.empty<Nat, Order>();
    };
  };
};
