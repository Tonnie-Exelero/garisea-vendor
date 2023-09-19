// ** React Imports
import { useContext, useState } from "react";

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

// ** Custom Components Imports
import CustomChip from "@components/mui/chip";

// ** Others
import ExtraInfoEditDialog from "../dialogs/ExtraInfoEditDialog";
import { AbilityContext } from "src/layouts/components/acl/Can";

interface ExtraInfoProps {
  vehicle: VehicleNode;
}

const ExtraInfo: React.FC<ExtraInfoProps> = ({ vehicle }) => {
  const { vinNo, allowedPaymentModes, offerType, features, views, extraInfo } =
    vehicle;

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
          title="Extra Info"
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
            <Grid item xs={12}>
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
                          Vin No.:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {vinNo && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {vinNo}
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
                          Offer Type:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {offerType && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {offerType
                              .replace("-", " ")
                              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                letter.toUpperCase()
                              )}
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
                          Views:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {views && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {views}
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
                          Payment Modes:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {allowedPaymentModes && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {allowedPaymentModes
                              .split(",")
                              .map((mode, index) => (
                                <CustomChip
                                  rounded
                                  key={index}
                                  label={mode}
                                  skin="light"
                                  color={"warning"}
                                  sx={{
                                    mr: 2,
                                    mb: 2,
                                  }}
                                />
                              ))}
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
                          Features:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {features && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {features.split(",").map((mode, index) => (
                              <CustomChip
                                rounded
                                key={index}
                                label={mode}
                                skin="light"
                                color={"info"}
                                sx={{
                                  mr: 2,
                                  mb: 2,
                                }}
                              />
                            ))}
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
                          Extra:
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {extraInfo && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {extraInfo}
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
        <ExtraInfoEditDialog
          vehicle={vehicle}
          handleEditDialogToggle={handleEditDialogToggle}
        />
      </Dialog>
    </>
  );
};

export default ExtraInfo;
