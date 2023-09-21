// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Dashboards",
      icon: "bx:home-circle",
      badgeContent: "new",
      badgeColor: "error",
      children: [
        {
          title: "Analytics",
          action: "read",
          subject: "analytics-dash",
          path: "/dashboards/analytics",
        },
        {
          title: "CRM",
          action: "read",
          subject: "crm-dash",
          path: "/dashboards/crm",
        },
        {
          title: "eCommerce",
          action: "read",
          subject: "ecommerce-dash",
          path: "/dashboards/ecommerce",
        },
      ],
    },
    {
      sectionTitle: "Apps & Pages",
      subject: "apps-pages",
    },
    {
      title: "Email",
      icon: "bx:envelope",
      subject: "email",
      path: "/apps/email",
    },
    {
      title: "Chat",
      icon: "bx:message",
      subject: "chat",
      path: "/apps/chat",
    },
    {
      title: "Calendar",
      icon: "bx:calendar",
      subject: "calendar",
      path: "/apps/calendar",
    },
    {
      title: "Invoice",
      icon: "bx:food-menu",
      subject: "invoice",
      children: [
        {
          title: "List",
          path: "/apps/invoice/list",
        },
        {
          title: "Preview",
          path: "/apps/invoice/preview",
        },
        {
          title: "Edit",
          path: "/apps/invoice/edit",
        },
        {
          title: "Add",
          path: "/apps/invoice/add",
        },
      ],
    },
    {
      title: "Users",
      icon: "bx:user",
      path: "/apps/users/list",
      action: "read",
      subject: "users",
    },
    {
      title: "Vendors",
      icon: "bx:user",
      path: "/apps/vendors/list",
      action: "read",
      subject: "vendors",
    },
    {
      title: "Customers",
      icon: "bx:user",
      path: "/apps/customers/list",
      action: "read",
      subject: "customers",
    },
    {
      title: "Organizations",
      icon: "bx:building",
      path: "/apps/organizations/list",
      action: "read",
      subject: "organizations",
    },
    {
      title: "Roles & Permissions",
      icon: "bx:check-shield",
      children: [
        {
          title: "Roles",
          path: "/apps/roles",
          action: "read",
          subject: "roles",
        },
        {
          title: "Permissions",
          path: "/apps/permissions",
          action: "read",
          subject: "permissions",
        },
      ],
    },
    {
      title: "Inventory",
      icon: "bx:dock-top",
      children: [
        {
          title: "Brands",
          path: "/apps/brands",
          action: "read",
          subject: "brands",
        },
        {
          title: "Models",
          path: "/apps/models",
          action: "read",
          subject: "models",
        },
        {
          title: "Vehicles",
          path: "/apps/vehicles/list",
          action: "read",
          subject: "vehicles",
        },
      ],
    },
    {
      title: "Account",
      icon: "bx:bxs-user-account",
      children: [
        {
          title: "Profile",
          action: "read",
          subject: "profile",
          path: "/account/user/profile",
        },
        {
          title: "Settings",
          action: "read",
          subject: "profile",
          path: "/account/settings/account",
        },
      ],
    },
    {
      title: "Pages",
      icon: "bx:dock-top",
      action: "read",
      subject: "pages",
      children: [
        {
          title: "FAQ",
          path: "/pages/faq",
        },
        {
          title: "Help Center",
          path: "/pages/help-center",
        },
        {
          title: "Pricing",
          path: "/pages/pricing",
        },
        {
          title: "Miscellaneous",
          children: [
            {
              openInNewTab: true,
              title: "Coming Soon",
              path: "/pages/misc/coming-soon",
            },
            {
              openInNewTab: true,
              title: "Under Maintenance",
              path: "/pages/misc/under-maintenance",
            },
            {
              openInNewTab: true,
              title: "Page Not Found - 404",
              path: "/pages/misc/404-not-found",
            },
            {
              openInNewTab: true,
              title: "Not Authorized - 401",
              path: "/pages/misc/401-not-authorized",
            },
            {
              openInNewTab: true,
              title: "Server Error - 500",
              path: "/pages/misc/500-server-error",
            },
          ],
        },
      ],
    },
    {
      title: "Auth Pages",
      icon: "bx:lock-open-alt",
      children: [
        {
          title: "Login",
          children: [
            {
              openInNewTab: true,
              title: "Login v1",
              path: "/pages/auth/login-v1",
            },
            {
              openInNewTab: true,
              title: "Login v2",
              path: "/pages/auth/login-v2",
            },
            {
              openInNewTab: true,
              title: "Login With AppBar",
              path: "/pages/auth/login-with-appbar",
            },
          ],
        },
        {
          title: "Register",
          children: [
            {
              openInNewTab: true,
              title: "Register v1",
              path: "/pages/auth/register-v1",
            },
            {
              openInNewTab: true,
              title: "Register v2",
              path: "/pages/auth/register-v2",
            },
            {
              openInNewTab: true,
              title: "Register Multi-Steps",
              path: "/pages/auth/register-multi-steps",
            },
          ],
        },
        {
          title: "Verify Email",
          children: [
            {
              openInNewTab: true,
              title: "Verify Email v1",
              path: "/pages/auth/verify-email-v1",
            },
            {
              openInNewTab: true,
              title: "Verify Email v2",
              path: "/pages/auth/verify-email-v2",
            },
          ],
        },
        {
          title: "Forgot Password",
          children: [
            {
              openInNewTab: true,
              title: "Forgot Password v1",
              path: "/pages/auth/forgot-password-v1",
            },
            {
              openInNewTab: true,
              title: "Forgot Password v2",
              path: "/pages/auth/forgot-password-v2",
            },
          ],
        },
        {
          title: "Reset Password",
          children: [
            {
              openInNewTab: true,
              title: "Reset Password v1",
              path: "/pages/auth/reset-password-v1",
            },
            {
              openInNewTab: true,
              title: "Reset Password v2",
              path: "/pages/auth/reset-password-v2",
            },
          ],
        },
        {
          title: "Two Steps",
          children: [
            {
              openInNewTab: true,
              title: "Two Steps v1",
              path: "/pages/auth/two-steps-v1",
            },
            {
              openInNewTab: true,
              title: "Two Steps v2",
              path: "/pages/auth/two-steps-v2",
            },
          ],
        },
      ],
    },
    {
      title: "Wizard Examples",
      icon: "bx:spreadsheet",
      children: [
        {
          title: "Checkout",
          path: "/pages/wizard-examples/checkout",
        },
        {
          title: "Property Listing",
          path: "/pages/wizard-examples/property-listing",
        },
        {
          title: "Create Deal",
          path: "/pages/wizard-examples/create-deal",
        },
      ],
    },
    {
      icon: "bx:window-open",
      title: "Dialog Examples",
      path: "/pages/dialog-examples",
    },
    {
      sectionTitle: "User Interface",
    },
    {
      title: "Typography",
      icon: "bx:text",
      path: "/ui/typography",
    },
    {
      title: "Icons",
      path: "/ui/icons",
      icon: "bx:crown",
    },
    {
      title: "Icons Test",
      path: "/ui/icons-test",
      icon: "bx:crown",
    },
    {
      title: "Cards",
      icon: "bx:collection",
      children: [
        {
          title: "Basic",
          path: "/ui/cards/basic",
        },
        {
          title: "Advanced",
          path: "/ui/cards/advanced",
        },
        {
          title: "Statistics",
          path: "/ui/cards/statistics",
        },
        {
          title: "Widgets",
          path: "/ui/cards/widgets",
        },
        {
          title: "Gamification",
          path: "/ui/cards/gamification",
        },
        {
          title: "Actions",
          path: "/ui/cards/actions",
        },
      ],
    },
    {
      badgeContent: "19",
      title: "Components",
      icon: "bx:box",
      badgeColor: "primary",
      children: [
        {
          title: "Accordion",
          path: "/components/accordion",
        },
        {
          title: "Alerts",
          path: "/components/alerts",
        },
        {
          title: "Avatars",
          path: "/components/avatars",
        },
        {
          title: "Badges",
          path: "/components/badges",
        },
        {
          title: "Buttons",
          path: "/components/buttons",
        },
        {
          title: "Button Group",
          path: "/components/button-group",
        },
        {
          title: "Chips",
          path: "/components/chips",
        },
        {
          title: "Dialogs",
          path: "/components/dialogs",
        },
        {
          title: "List",
          path: "/components/list",
        },
        {
          title: "Menu",
          path: "/components/menu",
        },
        {
          title: "Pagination",
          path: "/components/pagination",
        },
        {
          title: "Progress",
          path: "/components/progress",
        },
        {
          title: "Ratings",
          path: "/components/ratings",
        },
        {
          title: "Snackbar",
          path: "/components/snackbar",
        },
        {
          title: "Swiper",
          path: "/components/swiper",
        },
        {
          title: "Tabs",
          path: "/components/tabs",
        },
        {
          title: "Timeline",
          path: "/components/timeline",
        },
        {
          title: "Toasts",
          path: "/components/toast",
        },
        {
          title: "Tree View",
          path: "/components/tree-view",
        },
        {
          title: "More",
          path: "/components/more",
        },
        {
          title: "Test",
          path: "/components/test",
        },
      ],
    },
    {
      sectionTitle: "Forms & Tables",
    },
    {
      title: "Form Elements",
      icon: "bx:detail",
      children: [
        {
          title: "Text Field",
          path: "/forms/form-elements/text-field",
        },
        {
          title: "Select",
          path: "/forms/form-elements/select",
        },
        {
          title: "Checkbox",
          path: "/forms/form-elements/checkbox",
        },
        {
          title: "Radio",
          path: "/forms/form-elements/radio",
        },
        {
          title: "Custom Inputs",
          path: "/forms/form-elements/custom-inputs",
        },
        {
          title: "Textarea",
          path: "/forms/form-elements/textarea",
        },
        {
          title: "Autocomplete",
          path: "/forms/form-elements/autocomplete",
        },
        {
          title: "Date Pickers",
          path: "/forms/form-elements/pickers",
        },
        {
          title: "Switch",
          path: "/forms/form-elements/switch",
        },
        {
          title: "File Uploader",
          path: "/forms/form-elements/file-uploader",
        },
        {
          title: "Editor",
          path: "/forms/form-elements/editor",
        },
        {
          title: "Slider",
          path: "/forms/form-elements/slider",
        },
        {
          title: "Input Mask",
          path: "/forms/form-elements/input-mask",
        },
        {
          title: "Test",
          path: "/forms/form-elements/test",
        },
      ],
    },
    {
      icon: "bx:detail",
      title: "Form Layouts",
      path: "/forms/form-layouts",
    },
    {
      title: "Form Validation",
      path: "/forms/form-validation",
      icon: "bx:list-check",
    },
    {
      title: "Form Wizard",
      path: "/forms/form-wizard",
      icon: "bx:carousel",
    },
    {
      title: "Table",
      icon: "bx:table",
      path: "/tables/mui",
    },
    {
      title: "Mui DataGrid",
      icon: "bx:grid",
      path: "/tables/data-grid",
    },
    {
      sectionTitle: "Charts & Misc",
    },
    {
      title: "Charts",
      icon: "bx:chart",
      children: [
        {
          title: "Apex",
          path: "/charts/apex-charts",
        },
        {
          title: "Recharts",
          path: "/charts/recharts",
        },
        {
          title: "ChartJS",
          path: "/charts/chartjs",
        },
      ],
    },
    {
      path: "/acl",
      action: "read",
      subject: "acl-page",
      icon: "bx:shield",
      title: "Access Control",
    },
    {
      title: "Others",
      icon: "bx:dots-horizontal-rounded",
      children: [
        {
          title: "Menu Levels",
          children: [
            {
              title: "Menu Level 2.1",
            },
            {
              title: "Menu Level 2.2",
              children: [
                {
                  title: "Menu Level 3.1",
                },
                {
                  title: "Menu Level 3.2",
                },
              ],
            },
          ],
        },
        {
          title: "Disabled Menu",
          disabled: true,
        },
        {
          title: "Raise Support",
          externalLink: true,
          openInNewTab: true,
          path: "https://themeselection.com/support",
        },
        {
          title: "Documentation",
          externalLink: true,
          openInNewTab: true,
          path: "https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/documentation/",
        },
      ],
    },
  ];
};

export default navigation;
