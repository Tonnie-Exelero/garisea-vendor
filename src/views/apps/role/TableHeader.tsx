// ** React Imports
import { useState } from "react";

// ** MUI Imports
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

interface TableHeaderProps {
  value: string;
  handleFilter: (val: string) => void;
  handleRefresh: () => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, handleRefresh } = props;

  // ** States
  const [filterValue, setFilterValue] = useState<string>("");
  const [valLengthError, setValLengthError] = useState<boolean>(false);

  return (
    <Box
      sx={{
        px: 5,
        pb: 2,
        pt: 4,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton onClick={handleRefresh}>
        <Icon fontSize={30} icon="bx:refresh" />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
      </Box>
    </Box>
  );
};

export default TableHeader;
