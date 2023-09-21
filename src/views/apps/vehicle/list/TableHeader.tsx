// ** React Imports
import { useContext } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import { Box, Button, IconButton } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Others
import { AbilityContext } from "src/layouts/components/acl/Can";

interface TableHeaderProps {
  handleRefresh: () => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleRefresh } = props;

  // ** Hooks
  const ability = useContext(AbilityContext);

  return (
    <Box
      sx={{
        p: 6,
        gap: 4,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton onClick={handleRefresh}>
        <Icon fontSize={30} icon="bx:refresh" />
      </IconButton>
      <Box
        sx={{ gap: 4, display: "flex", flexWrap: "wrap", alignItems: "center" }}
      >
        {ability?.can("create", "vehicles") && (
          <Button
            component={Link}
            variant="contained"
            href={`/apps/vehicles/add`}
          >
            Add
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TableHeader;
