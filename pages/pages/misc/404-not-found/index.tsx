// ** React Imports
import { ReactNode } from "react";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Component Import
import Error404 from "pages/404";

const Error = () => <Error404 />;

Error.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Error;
