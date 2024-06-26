// ** React Imports
import { useState, SyntheticEvent } from "react";

// ** MUI Imports
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box, { BoxProps } from "@mui/material/Box";

// ** Types
import { SendMsgComponentType } from "src/types/apps/chatTypes";

// ** Others
import { addAdminVendorMessage } from "@src/store/apps/shared/adminVendorMessage/single";
import apolloClient from "@src/lib/apollo";
import {
  CREATE_CONTACT,
  GET_CONTACTS_BY_IDS,
  UPDATE_CONTACT,
} from "@src/api/shared/adminVendorContact";
import { sendEmail } from "@src/configs/email";
import Notification from "@emails/Notification";
import { encryptData } from "@core/utils/encryption";

// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: "space-between",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const Form = styled("form")(({ theme }) => ({
  padding: theme.spacing(0, 5, 5),
}));

const SendMsgForm = (props: SendMsgComponentType) => {
  // ** Props
  const { dispatch, authedVendor, recipient, handleRefresh } = props;

  // ** State
  const [msg, setMsg] = useState<string>("");

  const isContactExists = async (vendorId: string, userId: string) => {
    const { data } = await apolloClient.query({
      query: GET_CONTACTS_BY_IDS,
      variables: {
        pl: encryptData({ vendorId, userId }),
      },
      fetchPolicy: "no-cache",
    });

    const {
      contactsByAdminVendorIds: { edges, totalCount },
    }: any = data;

    return { edges, totalCount };
  };

  const addContact = async (
    vendorId: string,
    userId: string,
    latestMessageTime: string
  ) => {
    return await apolloClient.query({
      query: CREATE_CONTACT,
      variables: {
        pl: encryptData({ vendorId, userId, latestMessageTime }),
      },
      fetchPolicy: "no-cache",
    });
  };

  const updateContact = async (id: string, latestMessageTime: string) => {
    return await apolloClient.query({
      query: UPDATE_CONTACT,
      variables: {
        pl: encryptData({ id, latestMessageTime }),
      },
      fetchPolicy: "no-cache",
    });
  };

  const handleSendMsg = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Check if contact exists
    const contactData = await isContactExists(authedVendor.id, recipient.id);

    const { edges, totalCount }: any = contactData;

    const currentTime = new Date().toISOString();

    // If exists, update lastMessageTime
    // else, create one.
    if (totalCount === 0) {
      await addContact(authedVendor.id, recipient.id, currentTime);
    }

    if (totalCount > 0) {
      await updateContact(edges[0].node.id, currentTime);
    }

    // Then now create the message entry
    if (msg.trim().length) {
      const payload = {
        vendorId: authedVendor.id,
        userId: recipient.id,
        senderId: authedVendor.id,
        type: "text",
        message: msg.trim(),
        timeSent: currentTime,
        isSent: true,
        isSeen: false,
      };

      await dispatch(addAdminVendorMessage({ ...payload }));
      handleRefresh();
    }

    // Send email notification
    const url = "https://admin.garisea.com/apps/chat";

    const payload = {
      name: recipient.firstName,
      to: recipient.email,
      subject: `New Message from ${
        authedVendor.organization.nicename || authedVendor.organization.name
      }`,
      template: Notification({ url, name: recipient.firstName }),
    };

    sendEmail({ ...payload });
    // End Send email notification

    setMsg("");
  };

  return (
    <Form onSubmit={handleSendMsg}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={msg}
            size="small"
            placeholder="Type your message here…"
            onChange={(e) => setMsg(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input": { pl: 0 },
              "& fieldset": { border: "0 !important" },
              "& .Mui-focused": { boxShadow: "none !important" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  );
};

export default SendMsgForm;
