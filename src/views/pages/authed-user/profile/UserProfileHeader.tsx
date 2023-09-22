// ** React Imports
import React, { useState, useEffect } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Third Party Imports
import axios from "axios";

// ** Icon Imports
import Icon from "@components/icon";

// ** Types
import { ProfileHeaderType } from "src/@fake-db/types";

// ** Others
import CustomAvatar from "@components/mui/avatar";
import { getInitials } from "@utils/get-initials";
import { ThemeColor } from "@core/layouts/types";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

interface UserProfileHeaderProps {
  user: any;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  const { firstName, lastName, image, address, city, country, avatarColor } =
    user;
  // ** State
  const [data, setData] = useState<ProfileHeaderType | null>(null);

  useEffect(() => {
    axios.get("/pages/profile-header").then((response) => {
      setData(response.data);
    });
  }, []);

  const designationIcon = data?.designationIcon || "bx:briefcase";

  return data !== null ? (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image={data.coverImg}
        sx={{
          height: { xs: 150, md: 250 },
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: "flex",
          alignItems: "flex-end",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {image ? (
          <CustomAvatar
            skin="light"
            variant="rounded"
            src={image || data.profileImg}
            alt={firstName + " " + lastName}
            sx={{
              width: 120,
              height: 120,
              fontWeight: 600,
              fontSize: "3rem",
              border: (theme) => `5px solid ${theme.palette.common.white}`,
            }}
          />
        ) : (
          <CustomAvatar
            skin="light"
            variant="rounded"
            color={avatarColor as ThemeColor}
            sx={{
              width: 120,
              height: 120,
              fontWeight: 600,
              fontSize: "3rem",
              border: (theme) => `5px solid ${theme.palette.common.white}`,
            }}
          >
            {getInitials(firstName + " " + lastName)}
          </CustomAvatar>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            ml: { xs: 0, md: 6 },
            alignItems: "flex-end",
            flexWrap: ["wrap", "nowrap"],
            justifyContent: ["center", "space-between"],
          }}
        >
          <Box
            sx={{
              mb: [6, 0],
              display: "flex",
              flexDirection: "column",
              alignItems: ["center", "flex-start"],
            }}
          >
            <Typography variant="h5" sx={{ mb: 4, fontSize: "1.375rem" }}>
              {firstName + " " + lastName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: ["center", "flex-start"],
              }}
            >
              <Box
                sx={{
                  mr: 4,
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "text.secondary" },
                }}
              >
                <Icon icon="bx:map" />
                <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
                  {address}, {city}, {country}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  ) : null;
};

export default UserProfileHeader;
