/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === "superadmin") return "/dashboards/analytics";
  else return "/home";
};

export default getHomeRoute;
