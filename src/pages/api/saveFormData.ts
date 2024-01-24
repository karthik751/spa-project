// pages/api/saveFormData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formData = req.body;

    const filePath = path.join(process.cwd(), 'db.json');

    try {
      // Read existing data
      const existingData = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        : [];

      // Append new data
      existingData.push(formData);

      // Write to file
      fs.writeFileSync(filePath, JSON.stringify(existingData));

      res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'Error saving form data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
