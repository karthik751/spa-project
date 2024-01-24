// pages/api/getFormData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'db.json');

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = fs.existsSync(DATA_FILE_PATH)
      ? JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'))
      : [];

    res.status(200).json(formData);
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Error fetching form data' });
  }
}
