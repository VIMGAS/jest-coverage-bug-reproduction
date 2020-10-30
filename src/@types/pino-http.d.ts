import { Request } from "express";

declare namespace PinoHttp {
  export interface GenReqId {
    (req: IncomingMessage): ReqId;
  }
}

declare module 'http' {
  export interface IncomingMessage {
    id: PinoHttp.ReqId;
    log: Logger;
    identifier: string;
  }
}