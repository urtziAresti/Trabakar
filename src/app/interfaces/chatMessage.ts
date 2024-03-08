export interface ChatMessage {
  destinataryID: string,
  originaryID: string;
  message_timestamp: Date;
  messageText: string;
}
