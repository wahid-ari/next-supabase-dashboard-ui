import { NextApiRequest, NextApiResponse } from 'next';

import { getSessionToken, supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      const { data } = await supabase.from('book_sessions').select(`*, book_users (*)`).order('id');
      res.status(200).json(data);
      break;

    case 'DELETE':
      // Check session
      const sessionDelete = await getSessionToken(res, header, token);
      if (sessionDelete) {
        if (!query.id) {
          const { data } = await supabase.from('book_sessions').select(`*`).order('id');
          for (const item of data) {
            const { error } = await supabase.from('book_sessions').delete().eq('id', item.id);
            if (error) {
              res.status(422).json({ message: error.message });
              return;
            }
          }
          res.status(200).json({ message: 'Success delete all session' });
          return;
        } else {
          const { error } = await supabase.from('book_sessions').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete session' });
          return;
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
