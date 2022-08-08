import "ws";

declare module "ws" {
  export interface WebSocket {
    id?: string;
  }
}
