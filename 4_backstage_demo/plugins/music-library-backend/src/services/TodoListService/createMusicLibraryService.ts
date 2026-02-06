import { LoggerService } from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import crypto from 'node:crypto';
import { SongItem, MusicLibraryService } from './types';

export async function createMusicLibraryService({
  logger,
  catalog,
}: {
  logger: LoggerService;
  catalog: typeof catalogServiceRef.T;
}): Promise<MusicLibraryService> {
  logger.info('Initializing Music Library Service');

  const storedSongs = new Array<SongItem>();

  return {
    async addSongAsync(input, options) {
      let title = input.title;

      if (input.entityRef) {
        const entity = await catalog.getEntityByRef(input.entityRef, options);
        if (!entity) {
          throw new NotFoundError(
            `No entity found for ref '${input.entityRef}'`,
          );
        }

        // TEMPLATE NOTE:
        // Here you could read any form of data from the entity. A common use case
        // is to read the value of a custom annotation for your plugin. You can
        // read more about how to add custom annotations here:
        // https://backstage.io/docs/features/software-catalog/extending-the-model#adding-a-new-annotation
        //
        // In this example we just use the entity title to decorate the todo item.

        const entityDisplay = entity.metadata.title ?? input.entityRef;
        title = `[${entityDisplay}] ${input.title}`;
      }

      const id = crypto.randomUUID();
      const createdBy = options.credentials.principal.userEntityRef;
      const newSong = {
        title,
        id,
        createdBy,
        createdAt: new Date().toISOString(),
      };

      storedSongs.push(newSong);

      logger.info('Created new song item', { id, title, createdBy });

      return newSong;
    },

    async listSongsAsync() {
      return { items: Array.from(storedSongs) };
    },

    async getSongByIdAsync(request: { id: string }) {
      const song = storedSongs.find(item => item.id === request.id);
      if (!song) {
        throw new NotFoundError(`No song found with id '${request.id}'`);
      }
      return song;
    },
  };
}
