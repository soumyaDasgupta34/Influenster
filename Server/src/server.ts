import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: `${process.cwd()}/.env` });

const DB: string = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
