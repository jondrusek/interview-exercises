import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { createMusicLibraryService } from './services/TodoListService';

/**
 * musicLibraryPlugin backend plugin
 *
 * @public
 */
export const musicLibraryPlugin = createBackendPlugin({
  pluginId: 'music-library',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        catalog: catalogServiceRef,
      },
      async init({ logger, httpAuth, httpRouter, catalog }) {
        const musicLibraryService = await createMusicLibraryService({
          logger,
          catalog,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            musicLibraryService,
          }),
        );
      },
    });
  },
});
