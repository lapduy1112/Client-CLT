import { AbilityBuilder, PureAbility, ExtractSubjectType } from "@casl/ability";

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "User" | "Route" | "Permission" | "Role" | { type: string };
export type AppAbility = PureAbility<[Actions, Subjects]>;

const defineAbilitiesFor = (role: string) => {
  const { can, cannot, build } = new AbilityBuilder<
    PureAbility<[Actions, Subjects]>
  >(PureAbility);

  if (role === "sysadmin") {
    can("read", "User", "any");
    can("read", "Permission", "any");
    can("read", "Route", "any");
    can("read", "Role", "any");
    can("create", "User", "any");
    can("create", "Route", "any");
    can("create", "Role", "any");
    can("create", "Permission", "any");
    can("update", "User", "any");
    can("update", "Route", "any");
    can("update", "Permission", "any");
    can("delete", "User", "any");
    can("delete", "Role", "any");
    can("delete", "Route", "any");
    can("delete", "Permission", "any");
    can("manage", "Route", "any");
    can("manage", "User", "any");
    can("read", "User", "own");
    can("update", "User", "own");
    can("delete", "User", "own");
    can("read", "Route", "own");
    can("update", "Route", "own");
    can("delete", "Route", "own");
  } else if (role === "admin") {
    can("read", "User", "any");
    can("read", "Route", "any");
    can("create", "User", "any");
    can("create", "Route", "any");
    can("update", "User", "any");
    can("update", "Route", "any");
    can("delete", "User", "any");
    can("delete", "Route", "any");
    can("read", "User", "own");
    can("update", "User", "own");
    can("delete", "User", "own");
    can("read", "Route", "own");
    can("update", "Route", "own");
    can("delete", "Route", "own");
  } else if (role === "user") {
    can("read", "User", "own");
    can("read", "Route", "any");
    can("update", "User", "own");
    can("delete", "User", "own");
  }

  return build({
    detectSubjectType: (object) => object!.type as ExtractSubjectType<Subjects>,
    fieldMatcher: (subject: any, field: string) => {
      if (field === "own") {
        return subject.id === "ownUserId";
      }
      return true;
    },
  });
};

export { defineAbilitiesFor };
