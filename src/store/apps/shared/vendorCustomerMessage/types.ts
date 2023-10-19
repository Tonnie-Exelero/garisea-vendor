export interface VendorCustomerMessage {
  id: string;
  vendor: any;
  customer: any;
  vehicle: any;
  senderId: string;
  type: string;
  message: string;
  timeSent: string;
  isSent: boolean;
  isSeen: boolean;
}
