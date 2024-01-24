// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const image = files['image'];

      if (!image) {
        res.status(400).json({ error: 'No file provided' });
        return;
      }

      const uploadDir = path.join(process.cwd(), 'public');
      const imageUrl = `/${Date.now()}-${image.name}`;
      const imagePath = path.join(uploadDir, imageUrl);

      // Move the file to the specified directory
      await fs.rename(image.path, imagePath);

      res.status(200).json({ imageUrl });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
