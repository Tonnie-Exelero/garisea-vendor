// ** React Imports
import { ReactNode, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Types
import type { ACLObj, AppAbility } from "src/configs/acl";

// ** Context Imports
import { AbilityContext } from "src/layouts/components/acl/Can";

// ** Config Import
import { buildAbilityFor } from "src/configs/acl";

// ** Component Import
import NotAuthorized from "pages/401";
import Spinner from "src/@core/components/spinner";
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";

interface AclGuardProps {
  children: ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  aclAbilities: ACLObj;
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const {
    aclAbilities,
    children,
    guestGuard = false,
    authGuard = true,
  } = props;

  // ** Hooks
  const auth = useAuth();
  const router = useRouter();

  // ** Vars
  let ability: AppAbility;

  useEffect(() => {
    if (
      auth.vendor &&
      auth.vendor.role &&
      !guestGuard &&
      router.route === "/"
    ) {
      router.replace("/home");
    }
  }, [auth.vendor, guestGuard, router]);

  // User is logged in, build ability for the vendor based on his role
  if (auth.vendor && !ability) {
    const actions = ["create", "read", "update", "delete"];
    const subjects = ["profile", "vehicles", "organizations"];

    ability = buildAbilityFor(
      auth.vendor.role,
      actions.toString(),
      subjects.toString()
    );

    if (router.route === "/") {
      return <Spinner />;
    }
  }

  // If guest guard or no guard is true or any error page
  if (
    guestGuard ||
    router.route === "/404" ||
    router.route === "/500" ||
    !authGuard
  ) {
    // If vendor is logged in and his ability is built
    if (auth.vendor && ability) {
      return (
        <AbilityContext.Provider value={ability}>
          {children}
        </AbilityContext.Provider>
      );
    } else {
      // If vendor is not logged in (render pages like login, register etc..)
      return <>{children}</>;
    }
  }

  // Check the access of current vendor and render pages
  if (
    ability &&
    auth.vendor &&
    ability.can(aclAbilities.action, aclAbilities.subject)
  ) {
    if (router.route === "/") {
      return <Spinner />;
    }

    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  // Render Not Authorized component if the current vendor has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  );
};

export default AclGuard;
