// ** React Imports
import { useContext, useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Others
import { AbilityContext } from "src/layouts/components/acl/Can";

interface TableHeaderProps {
  value: string;
  toggle: (type: string) => void;
  handleFilter: (val: string) => void;
  handleRefresh: () => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, handleRefresh, toggle } = props;

  // ** State
  const [filterValue, setFilterValue] = useState<string>("");
  const [valLengthError, setValLengthError] = useState<boolean>(false);

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
        <Typography sx={{ mr: 2, color: "text.secondary" }}>Search</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            size="small"
            value={filterValue}
            sx={{ mr: 4, mb: 2 }}
            placeholder="Minimum 3 characters"
            onChange={(e) => setFilterValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={
                    filterValue.length > 2
                      ? () => {
                          setValLengthError(false);
                          handleFilter(filterValue);
                        }
                      : () => setValLengthError(true)
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <Icon icon="bx:search" />
                </InputAdornment>
              ),
            }}
          />
          {valLengthError && (
            <FormHelperText sx={{ color: "error.main" }}>
              Minimum of 3 characters
            </FormHelperText>
          )}
        </Box>
        {ability?.can("create", "customers") && (
          <Button onClick={() => toggle("Add")} variant="contained">
            Add
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TableHeader;
