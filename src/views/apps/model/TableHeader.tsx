// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Others
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/index";
import { addModel } from "@src/store/apps/admin/model";
import { fetchBrands } from "@src/store/apps/admin/brand";
import toast from "react-hot-toast";
import { AbilityContext } from "src/layouts/components/acl/Can";

interface TableHeaderProps {
  value: string;
  handleFilter: (val: string) => void;
  handleRefresh: () => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, handleRefresh } = props;

  // ** State
  const [filterValue, setFilterValue] = useState<string>("");
  const [valLengthError, setValLengthError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [brandId, setBrandId] = useState<string>("");

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);
  const { brands } = useSelector((state: RootState) => state.brands);

  const resetData = () => {
    setName("");
    setSlug("");
    setDescription("");
    setBrandId("");
  };

  useEffect(() => {
    resetData();

    dispatch(fetchBrands({ first: 100 }));
  }, [dispatch, brands, open]);

  const handleDialogToggle = () => setOpen(!open);

  const handleCreateModel = async (e: any) => {
    setOpen(false);
    e.preventDefault();

    const modelData = {
      name,
      slug,
      description,
      brandId,
    };

    const resultAction = await dispatch(addModel({ ...modelData }));

    if (addModel.fulfilled.match(resultAction)) {
      // model will have a type signature of Model as we passed that as the Returned parameter in createAsyncThunk
      const model = resultAction.payload;
      const { createModel }: any = model;

      toast.success(`Model ${createModel.name} created successfully!`);
    } else {
      toast.error(`Error creating model: ${resultAction.error}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        <IconButton onClick={handleRefresh}>
          <Icon fontSize={30} icon="bx:refresh" />
        </IconButton>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2, color: "text.secondary" }}>
              Search
            </Typography>
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
          {ability?.can("create", "models") && (
            <Button
              sx={{ mb: 2 }}
              variant="contained"
              onClick={handleDialogToggle}
            >
              Add Model
            </Button>
          )}
        </Box>
      </Box>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleDialogToggle}
        open={open}
        sx={{
          "& .MuiDialogTitle-root + .MuiDialogContent-root": {
            pt: (theme) => `${theme.spacing(4)} !important`,
          },
        }}
      >
        <DialogTitle
          sx={{
            pt: 16,
            mx: "auto",
            textAlign: "center",
            fontSize: "1.625rem !important",
          }}
        >
          Add New Model
        </DialogTitle>
        <DialogContent sx={{ pb: 18, px: 18 }}>
          <Typography sx={{ color: "text.secondary" }}>
            Models associates with a brand.
          </Typography>
          <Box
            sx={{
              mt: 7,
              mx: "auto",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              autoFocus
              fullWidth
              id="name"
              aria-label="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
              }}
              type="text"
              sx={{ mb: 4 }}
              label="Name"
              placeholder="e.g. Manage Users"
            />
            <TextField
              fullWidth
              id="slug"
              aria-label="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              type="text"
              sx={{ mb: 4 }}
              label="Slug"
              placeholder="e.g. manage-users"
            />
            <TextField
              fullWidth
              id="description"
              aria-label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              sx={{ mb: 4 }}
              label="Description"
              placeholder="Describe it"
            />
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id="brand-select">Select Brand</InputLabel>
              <Select
                fullWidth
                value={brandId}
                id="brand"
                label="Select Brand"
                labelId="brand-select"
                onChange={(e) => setBrandId(e.target.value)}
                inputProps={{ placeholder: "Select Brand" }}
              >
                {brands.edges.map((brand, index) => {
                  const { id, name } = brand.node;

                  return (
                    <MenuItem key={index} value={id}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Box
              className="demo-space-x"
              sx={{ "& > :last-child": { mr: "0 !important" } }}
            >
              <Button
                size="large"
                onClick={(e) => handleCreateModel(e)}
                variant="contained"
                sx={{ mr: 5 }}
              >
                Create Model
              </Button>
              <Button
                type="reset"
                size="large"
                variant="outlined"
                color="secondary"
                onClick={handleDialogToggle}
              >
                Discard
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableHeader;
