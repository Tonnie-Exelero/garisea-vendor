// ** Types
import { Dispatch } from "redux";
import { ThemeColor } from "src/@core/layouts/types";
import { UserNode } from "./userTypes";
import { VendorNode } from "./vendorTypes";

export type StatusType = "online" | "offline";

export type StatusObjType = {
  online: ThemeColor;
  offline: ThemeColor;
};

export type ProfileUserType = {
  id: string;
  role: string;
  about: string;
  avatar: string;
  fullName: string;
  status: StatusType;
  settings: {
    isNotificationsOn: boolean;
    isTwoStepAuthVerificationEnabled: boolean;
  };
};

export type MsgFeedbackType = {
  isSent: boolean;
  isSeen: boolean;
};

export type ChatType = {
  message: string;
  senderId: number;
  time: Date | string;
  feedback: MsgFeedbackType;
};

export type ChatsObj = {
  id: number;
  userId: number;
  chat: ChatType[];
  unseenMsgs: number;
  lastMessage?: ChatType;
};

export type ContactType = {
  id: number | string;
  role: string;
  about: string;
  avatar?: string;
  fullName: string;
  status: StatusType;
  avatarColor?: ThemeColor;
};

export type ChatsArrType = {
  id: number;
  role: string;
  about: string;
  chat: ChatsObj;
  avatar?: string;
  fullName: string;
  status: StatusType;
  avatarColor?: ThemeColor;
};

export type AdminVendorContactArrType = {
  id: string;
  user: Partial<UserNode>;
  vendor: Partial<VendorNode>;
  lastMessageTime: string;
};

export type AdminVendorContactEdgeType = {
  cursor: string;
  node: AdminVendorContactArrType;
};

export type SelectedChatType = null | {
  chat: ChatsObj;
  contact: ChatsArrType;
};

export type ChatStoreType = {
  chats: ChatsArrType[] | null;
  contacts: ContactType[] | null;
  userProfile: ProfileUserType | null;
  selectedChat: SelectedChatType;
};

export type SendMsgParamsType = {
  chat?: ChatsObj;
  message: string;
  contact?: ChatsArrType;
};

export type ChatContentType = {
  hidden: boolean;
  mdAbove: boolean;
  authedVendor: any;
  sidebarWidth: number;
  dispatch: Dispatch<any>;
  statusObj: StatusObjType;
  userProfileRightOpen: boolean;
  handleLeftSidebarToggle: () => void;
  getInitials: (val: string) => string;
  handleUserProfileRightSidebarToggle: () => void;
};

export type ChatSidebarLeftType = {
  hidden: boolean;
  mdAbove: boolean;
  authedVendor: any;
  adminVendorContacts?: any;
  vendorCustomerContacts?: any;
  sidebarWidth: number;
  userStatus: StatusType;
  dispatch: Dispatch<any>;
  leftSidebarOpen: boolean;
  statusObj: StatusObjType;
  userProfileLeftOpen: boolean;
  handleLeftSidebarToggle: () => void;
  getInitials: (val: string) => string;
  setUserStatus: (status: StatusType) => void;
  handleUserProfileLeftSidebarToggle: () => void;
  formatDateToMonthShort: (value: string, toTimeForCurrentDay: boolean) => void;
};

export type UserProfileLeftType = {
  hidden: boolean;
  store: ChatStoreType;
  sidebarWidth: number;
  userStatus: StatusType;
  statusObj: StatusObjType;
  userProfileLeftOpen: boolean;
  setUserStatus: (status: StatusType) => void;
  handleUserProfileLeftSidebarToggle: () => void;
};

export type UserProfileRightType = {
  currAdmin?: any;
  currCustomer?: any;
  hidden: boolean;
  sidebarWidth: number;
  statusObj: StatusObjType;
  userProfileRightOpen: boolean;
  getInitials: (val: string) => string;
  handleUserProfileRightSidebarToggle: () => void;
};

export type SendMsgComponentType = {
  dispatch: Dispatch<any>;
  authedVendor: any;
  recipient: any;
  handleRefresh: () => void;
};

export type ChatLogType = {
  hidden: boolean;
  data: {
    edges: MessageEdgeType[];
    pageInfo: any;
    totalCount: number;
    admin?: any;
    customer?: any;
  };
};

export type MessageType = {
  id: string;
  user: { id: string };
  vendor: { id: string };
  senderId: string;
  type: string;
  message: string;
  timeSent: string | Date;
  isSent: boolean;
  isSeen: boolean;
};

export type MessageEdgeType = {
  cursor: string;
  node: MessageType;
};

export type ChatLogChatType = {
  id: string;
  msg: string;
  time: string | Date;
  isSent: boolean;
  isSeen: boolean;
};

export type FormattedChatsType = {
  senderId: string;
  messages: ChatLogChatType[];
};

export type MessageGroupType = {
  senderId: string;
  messages: ChatLogChatType[];
};
