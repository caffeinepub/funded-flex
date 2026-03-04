import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
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

  public type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let orders = Map.empty<Nat, Order>();

  var nextOrderId = 0;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
    };
    contactSubmissions.add(nextOrderId, submission);
  };

  public shared ({ caller }) func placeOrder(
    customerName : Text,
    phoneNumber : Text,
    address : Text,
    orderItems : Text,
    totalPrice : Text,
  ) : async () {
    let order : Order = {
      id = nextOrderId;
      customerName;
      phoneNumber;
      address;
      orderItems;
      totalPrice;
    };
    orders.add(nextOrderId, order);
    nextOrderId += 1;
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray();
  };

  public query ({ caller }) func getOrder(id : Nat) : async Order {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("No order found with this ID") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getContactSubmission(id : Nat) : async ContactSubmission {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    switch (contactSubmissions.get(id)) {
      case (null) { Runtime.trap("No submission found with this ID") };
      case (?submission) { submission };
    };
  };
};
