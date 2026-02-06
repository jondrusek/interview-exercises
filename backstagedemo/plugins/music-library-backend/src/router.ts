import { HttpAuthService } from '@backstage/backend-plugin-api';
import { InputError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { MusicLibraryService } from './services/TodoListService/types';

export async function createRouter({
  httpAuth,
  musicLibraryService,
}: {
  httpAuth: HttpAuthService;
  musicLibraryService: MusicLibraryService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  const songSchema = z.object({
    title: z.string(),
    entityRef: z.string().optional(),
  });

  router.post('/songs', async (req, res) => {
    const parsed = songSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new InputError(parsed.error.toString());
    }

    const result = await musicLibraryService.addSongAsync(parsed.data, {
      credentials: await httpAuth.credentials(req, { allow: ['user'] }),
    });

    res.status(201).json(result);
  });

  router.get('/songs', async (_req, res) => {
    res.json(await musicLibraryService.listSongsAsync());
  });

  router.get('/songs/:id', async (req, res) => {
    res.json(await musicLibraryService.getSongByIdAsync({ id: req.params.id }));
  });

  return router;
}
