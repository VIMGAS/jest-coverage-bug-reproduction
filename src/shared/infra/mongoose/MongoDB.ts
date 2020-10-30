import mongoose from 'mongoose';

class MongoDB {
  private client: mongoose.Mongoose | null = null;

  async connect(uri: string): Promise<mongoose.Mongoose> {
    this.client = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`⚡️ MongoDB Connected`);

    return this.client;
  }

  async disconnect(): Promise<void> {
    return this.client?.connection.close();
  }
}

export default new MongoDB();
