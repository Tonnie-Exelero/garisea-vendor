// ** React Imports
import { useRef, useEffect, Ref, ReactNode, useCallback } from "react";
import { InView } from "react-intersection-observer";

// ** MUI Imports
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Components
import PerfectScrollbarComponent, {
  ScrollBarProps,
} from "react-perfect-scrollbar";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Imports
import { getInitials } from "src/@core/utils/get-initials";

// ** Types Imports
import {
  ChatLogType,
  ChatLogChatType,
  MessageGroupType,
  FormattedChatsType,
  MessageEdgeType,
} from "src/types/apps/chatTypes";

// ** Others
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { fetchMoreAdminVendorMessages } from "@src/store/apps/shared/adminVendorMessage";

const PerfectScrollbar = styled(PerfectScrollbarComponent)<
  ScrollBarProps & { ref: Ref<unknown> }
>(({ theme }) => ({
  padding: theme.spacing(5),
}));

const FetchMore = (props: any) => {
  const { authedVendor, customer, pageInfo } = props;

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const fetchMoreMessages = useCallback(async () => {
    await dispatch(
      fetchMoreAdminVendorMessages({
        vendorId: authedVendor.id,
        customerId: customer.id,
        before: pageInfo.startCursor,
        last: 50,
      })
    );
  }, []);

  return (
    <InView>
      {({ inView, ref }) => {
        inView && fetchMoreMessages();

        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress ref={ref} size={"2rem"} />
          </Box>
        );
      }}
    </InView>
  );
};

const ChatLog = (props: ChatLogType) => {
  // ** Props
  const {
    data: { edges, pageInfo, totalCount, customer },
    hidden,
  } = props;

  // ** Ref
  const chatArea = useRef(null);

  // ** Hooks
  const { authedVendor } = useSelector(
    (state: RootState) => state.authedVendor
  );

  useEffect(() => {}, [edges, pageInfo, totalCount, customer]);

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        // @ts-ignore
        chatArea.current.scrollTop = chatArea.current.scrollHeight;
      } else {
        // @ts-ignore
        chatArea.current._container.scrollTop =
          // @ts-ignore
          chatArea.current._container.scrollHeight;
      }
    }
  };

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog: MessageEdgeType[] | [] = [];
    if (edges) {
      chatLog = edges;
    }

    const formattedChatLog: FormattedChatsType[] = [];
    let chatMessageSenderId = authedVendor.id;
    let msgGroup: MessageGroupType = {
      senderId: chatMessageSenderId,
      messages: [],
    };
    chatLog.forEach((msg: MessageEdgeType, index: number) => {
      if (chatMessageSenderId === msg.node.senderId) {
        msgGroup.messages.push({
          time: msg.node.timeSent,
          msg: msg.node.message,
          isSent: msg.node.isSent,
          isSeen: msg.node.isSeen,
        });
      } else {
        chatMessageSenderId = msg.node.senderId;

        formattedChatLog.push(msgGroup);
        msgGroup = {
          senderId: msg.node.senderId,
          messages: [
            {
              time: msg.node.timeSent,
              msg: msg.node.message,
              isSent: msg.node.isSent,
              isSeen: msg.node.isSeen,
            },
          ],
        };
      }

      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });

    return formattedChatLog;
  };

  const renderMsgFeedback = (
    isSender: boolean,
    isSent: boolean,
    isSeen: boolean
  ) => {
    if (isSender) {
      if (isSent && !isSeen) {
        return (
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              "& svg": { mr: 2, color: "text.secondary" },
            }}
          >
            <Icon icon="bx:check" fontSize="1rem" />
          </Box>
        );
      } else if (isSent && isSeen) {
        return (
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              "& svg": {
                mr: 2,
                color: isSeen ? "success.main" : "text.secondary",
              },
            }}
          >
            <Icon icon="bx:check-all" fontSize="1rem" />
          </Box>
        );
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    if (edges && edges.length > 1 && pageInfo.hasNextPage === false) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges, pageInfo.hasNextPage]);

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map(
      (item: FormattedChatsType, index: number) => {
        const isSender = item.senderId !== customer.id;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: !isSender ? "row" : "row-reverse",
              mb: index !== formattedChatData().length - 1 ? 4 : undefined,
            }}
          >
            <div>
              <CustomAvatar
                skin="light"
                color={!isSender ? "info" : "success"}
                sx={{
                  width: "2rem",
                  height: "2rem",
                  fontSize: "0.875rem",
                  ml: isSender ? 3.5 : undefined,
                  mr: !isSender ? 3.5 : undefined,
                }}
                {...(customer.image && !isSender
                  ? {
                      src: customer.image,
                      alt: customer.firstName + " " + customer.lastName,
                    }
                  : {})}
                {...(isSender
                  ? {
                      src: authedVendor.image,
                      alt: authedVendor.firstName + " " + authedVendor.lastName,
                    }
                  : {})}
              >
                {customer.avatarColor
                  ? getInitials(customer.firstName + " " + customer.lastName)
                  : null}
              </CustomAvatar>
            </div>

            <Box
              className="chat-body"
              sx={{ maxWidth: ["calc(100% - 5.75rem)", "75%", "65%"] }}
            >
              {item.messages.map(
                (
                  chat: ChatLogChatType,
                  index: number,
                  { length }: { length: number }
                ) => {
                  const time = new Date(chat.time);

                  return (
                    <Box
                      key={index}
                      sx={{ "&:not(:last-of-type)": { mb: 3.5 } }}
                    >
                      <div>
                        <Typography
                          sx={{
                            boxShadow: 1,
                            borderRadius: 1,
                            maxWidth: "100%",
                            width: "fit-content",
                            fontSize: "0.875rem",
                            wordWrap: "break-word",
                            p: (theme) => theme.spacing(3, 4),
                            ml: isSender ? "auto" : undefined,
                            borderTopLeftRadius: !isSender ? 0 : undefined,
                            borderTopRightRadius: isSender ? 0 : undefined,
                            color: isSender ? "common.white" : "text.primary",
                            backgroundColor: isSender
                              ? "primary.main"
                              : "background.paper",
                          }}
                        >
                          {chat.msg}
                        </Typography>
                      </div>
                      {index + 1 === length ? (
                        <Box
                          sx={{
                            mt: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: isSender
                              ? "flex-end"
                              : "flex-start",
                          }}
                        >
                          {renderMsgFeedback(
                            isSender,
                            chat.isSent,
                            chat.isSeen
                          )}
                          <Typography variant="caption">
                            {time
                              ? new Date(time).toLocaleString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })
                              : null}
                          </Typography>
                        </Box>
                      ) : null}
                    </Box>
                  );
                }
              )}
            </Box>
          </Box>
        );
      }
    );
  };

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return (
        <Box
          ref={chatArea}
          sx={{ p: 5, height: "100%", overflowY: "auto", overflowX: "hidden" }}
        >
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Box sx={{ height: "calc(100% - 8.4375rem)" }}>
      <ScrollWrapper>
        {pageInfo.hasPreviousPage && (
          <FetchMore
            authedVendor={authedVendor}
            customer={customer}
            pageInfo={pageInfo}
          />
        )}
        {renderChats()}
      </ScrollWrapper>
    </Box>
  );
};

export default ChatLog;
