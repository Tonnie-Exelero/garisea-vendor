export interface AdminVendorMessage {
  id: string;
  user: any;
  vendor: any;
  senderId: string;
  type: string;
  message: string;
  timeSent: string;
  isSent: boolean;
  isSeen: boolean;
}
