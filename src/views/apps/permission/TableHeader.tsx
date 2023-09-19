// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index";
import { addPermission } from "@src/store/apps/admin/permission";
import toast from "react-hot-toast";
import { subjectsList } from "@src/configs/permissions";
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
  const [selectSubjects, setSelectSubjects] = useState<string[]>([]);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const ability = useContext(AbilityContext);

  const resetData = () => {
    setName("");
    setSlug("");
    setDescription("");
    setSelectSubjects([]);
  };

  useEffect(() => {
    resetData();
  }, []);

  const handleDialogToggle = () => setOpen(!open);

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectSubjects.some((subject) => subject === event.target.value)) {
      const updatedList = selectSubjects.filter(
        (subject) => subject !== event.target.value
      );
      return setSelectSubjects(updatedList);
    }
    return setSelectSubjects((prev) => [...prev, event.target.value]);
  };

  const handleCreatePermission = async (e: any) => {
    setOpen(false);
    e.preventDefault();

    const subjectsString = selectSubjects.toString();

    const permissionData = {
      name,
      slug,
      description,
      subjects: subjectsString,
    };

    const resultAction = await dispatch(addPermission({ ...permissionData }));

    if (addPermission.fulfilled.match(resultAction)) {
      // permission will have a type signature of Permission as we passed that as the Returned parameter in createAsyncThunk
      const permission = resultAction.payload;
      const { createPermission }: any = permission;

      toast.success(
        `Permission ${createPermission.name} created successfully!`
      );
    } else {
      toast.error(`Error creating permission: ${resultAction.error}`);
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
          {ability?.can("create", "permissions") && (
            <Button
              sx={{ mb: 2 }}
              variant="contained"
              onClick={handleDialogToggle}
            >
              Add Permission
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
          Add New Permission
        </DialogTitle>
        <DialogContent sx={{ pb: 18, px: 18 }}>
          <Typography sx={{ color: "text.secondary" }}>
            Permissions you may use and assign to your users.
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
            <Box sx={{ width: "100%", display: "flex" }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">Assign Subjects</FormLabel>
                <FormGroup sx={{ display: "flex" }}>
                  {subjectsList.map((subject, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={selectSubjects.includes(subject)}
                            onChange={handleSubjectChange}
                            name={subject}
                            value={subject}
                          />
                        }
                        label={subject}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Box>
            <Box
              className="demo-space-x"
              sx={{ "& > :last-child": { mr: "0 !important" } }}
            >
              <Button
                size="large"
                onClick={(e) => handleCreatePermission(e)}
                variant="contained"
                sx={{ mr: 5 }}
              >
                Create Permission
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
