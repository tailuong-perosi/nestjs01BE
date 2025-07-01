import { ClientSession, Model, Document } from "mongoose";

export class BaseRepository<T extends Document> {

  constructor(protected readonly model: Model<T>) {}

  async findAll(){
    try {
      
      // const result = 
    } catch (error) {
      return Promise.reject({
        code: error.code,
        message: error.message,
      });
    }
  }

  async insert(
    params: {
      update: any;
      session?: ClientSession;
    },
  ): Promise<T> {
    try {
      const { update, session } = params;
      const doc = new this.model(update);
      if (session) {
        doc.$session(session);
      }
      const newDocument = await doc.save();
      return newDocument;
    } catch (error) {
      return Promise.reject({
        code: error.code,
        message: error.message,
      });
    }
  }
  async startSession(): Promise<ClientSession> {
    return this.model.startSession();
  }
}