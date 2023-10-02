// ** React Imports
import React, { useContext, useState } from "react";

// ** MUI Imports
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

// ** Types
import { VehicleNode } from "src/types/apps/vehicleTypes";

// ** Others
import SpecificationsEditDialog from "../dialogs/SpecificationsEditDialog";
import { AbilityContext } from "src/layouts/components/acl/Can";

interface SpecificationsProps {
  vehicle: VehicleNode;
}

const Specifications: React.FC<SpecificationsProps> = ({ vehicle }) => {
  const {
    transmissionType,
    fuelType,
    engineCapacity,
    exteriorColor,
    upholstery,
    engineType,
    driveType,
    bodyType,
    interiorColor,
    steering,
    seats,
    doors,
  } = vehicle;

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  // ** Hooks
  const ability = useContext(AbilityContext);

  // Handle Edit dialog
  const handleEditDialogToggle = () => setOpenEdit(!openEdit);

  return (
    <>
      <Card>
        <CardHeader
          title="Specifications"
          action={
            ability?.can("update", "vehicles") && (
              <Button
                size="small"
                variant="contained"
                onClick={handleEditDialogToggle}
              >
                Edit
              </Button>
            )
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size="small" sx={{ width: "95%" }}>
                  <TableBody
                    sx={{
                      "& .MuiTableCell-root": {
                        pt: 2,
                        pb: 2,
                        border: 0,
                        pl: "0 !important",
                        pr: "0 !important",
                        "&:first-of-type": {
                          width: 150,
                        },
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Body:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {bodyType && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {bodyType}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Engine:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {engineType && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {engineType}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Engine Capacity:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {engineCapacity && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {engineCapacity}cc
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Transmission:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {transmissionType && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {transmissionType}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Drive:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {driveType && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {driveType}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Fuel:
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {fuelType && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {fuelType}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size="small" sx={{ width: "95%" }}>
                  <TableBody
                    sx={{
                      "& .MuiTableCell-root": {
                        pt: 2,
                        pb: 2,
                        border: 0,
                        pl: "0 !important",
                        pr: "0 !important",
                        "&:first-of-type": {
                          width: 150,
                        },
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Exterior Color:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {exteriorColor && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {exteriorColor}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Interior Color:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {interiorColor && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {interiorColor}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Upholstery:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {upholstery && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {upholstery}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          Steering:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {steering && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {steering}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          No. of Seats:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {seats && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {seats}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.53,
                            whiteSpace: "nowrap",
                            color: "text.secondary",
                          }}
                        >
                          No.of Doors:
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {doors && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {doors}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        scroll="body"
        maxWidth="md"
        open={openEdit}
        onClose={handleEditDialogToggle}
        aria-labelledby="vehicle-view-edit"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            p: [2, 10],
          },
          "& .MuiDialogTitle-root + .MuiDialogContent-root": {
            pt: (theme) => `${theme.spacing(2)} !important`,
          },
        }}
        aria-describedby="vehicle-view-edit-description"
      >
        <SpecificationsEditDialog
          vehicle={vehicle}
          handleEditDialogToggle={handleEditDialogToggle}
        />
      </Dialog>
    </>
  );
};

export default Specifications;
