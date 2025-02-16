import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';
import { z } from 'zod';

import { getSessionToken, supabase, writeLogs } from '@/libs/supabase';

const schema = z.object({
  name: z.string().min(1, { message: 'Name required' }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id && !query.slug) {
        const { data } = await supabase.from('book_genres').select(`*`).order('id');
        res.status(200).json(data);
        return;
      } else if (query.slug && query.seo) {
        const { data } = await supabase.from('book_genres').select(`name`).eq('slug', query.slug).single();
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
        return;
      } else {
        let column = query.id ? 'id' : 'slug';
        let param = query.id ? query.id : query.slug;
        const { data: genres } = await supabase.from('book_genres').select(`*`).eq(column, param).order('id');
        const { data: books_genres } = await supabase
          .from('book_books_genres')
          .select(`*`)
          .eq('genre_id', genres[0].id)
          .order('id');
        const { data: books } = await supabase
          .from('book_books')
          .select(`id, slug, title, published, image, book_authors (id, slug, name, image)`)
          .order('id');

        const books_by_genres = [];
        for (const book of books) {
          for (const genre of books_genres) {
            if (genre.book_id == book.id) {
              books_by_genres.push({
                ...book,
              });
            }
          }
        }
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...genres[0], books_by_genres });
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        const isValid = schema.safeParse(body);
        if (!isValid.success) {
          res.status(422).json({ message: isValid?.error?.issues });
          return;
        } else {
          let nameSlug = slug(body.name);
          const { data: isSlugExist } = await supabase.from('book_genres').select(`*`).eq('slug', nameSlug).order('id');
          // if slug already exist, add genres.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: genres } = await supabase.from('book_genres').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${genres.length + 1}`;
          }
          const { error } = await supabase.from('book_genres').insert([
            {
              slug: nameSlug,
              name: body.name,
              link: body.link,
            },
          ]);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'genre');
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add genre' });
          return;
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        const isValid = schema.safeParse(body);
        if (!isValid.success) {
          res.status(422).json({ message: isValid?.error?.issues });
          return;
        } else {
          const { error } = await supabase
            .from('book_genres')
            .update({
              name: body.name,
              link: body.link,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'genre', body.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update genre' });
          return;
        }
      }
      break;

    case 'DELETE':
      // Check session
      const sessionDelete = await getSessionToken(res, header, token);
      if (sessionDelete) {
        if (!query.id) {
          res.status(422).json({ message: 'Id required' });
          return;
        } else {
          const { error } = await supabase.from('book_genres').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ message: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'genre', query.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete genre' });
          return;
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
