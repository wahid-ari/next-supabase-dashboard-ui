import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data } = await supabase.from('book_logs').select(`*, book_users (username, name, type)`).order('id');
      res.status(200).json(data);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
