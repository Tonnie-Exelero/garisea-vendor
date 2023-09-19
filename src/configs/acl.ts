import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export type Subjects = string;
export type Actions = "manage" | "create" | "read" | "update" | "delete";

const createAbility = createMongoAbility<[Actions, Subjects]>();

export type AppAbility = typeof createAbility | undefined;

export const AppAbility = createMongoAbility as any;
export type ACLObj = {
  action: Actions;
  subject: string;
};

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, ability: string, subjects: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility);

  if (role === "superadmin") {
    can("manage", "all");
  } else {
    can(ability.split(","), subjects.split(","));
  }

  return rules;
};

export const buildAbilityFor = (
  role: string,
  ability: string,
  subjects: string
): AppAbility => {
  return new AppAbility(defineRulesFor(role, ability, subjects), {
    // https://casl.js.org/v6/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: (object) => object!.type,
  });
};

export const defaultACLObj: ACLObj = {
  action: "manage",
  subject: "all",
};

export default defineRulesFor;
