import { Router } from 'express';
import { protectedAsyncRequestHandler } from '../../lib/util/protectedAsyncHandler';
import { HttpStatusCode } from '../../lib/util/http.enums';
import { EventsService } from './events.service';
import { EventLookUpKey } from './events.types';

export function getEventsRouter(): Router {
  const eventsRouter: Router = Router();

  eventsRouter.get(
    '/events',
    protectedAsyncRequestHandler( async (req, res) => {
      const events = await EventsService.get(req.params);
      res.status(HttpStatusCode.OK).json({ message: 'success', events });
    })
  );

  eventsRouter.get(
    '/events/:id',
    protectedAsyncRequestHandler( async (req, res) => {
      const event = await EventsService.getEvent(EventLookUpKey.ID, req.params.id);
      res.status(HttpStatusCode.OK).json({ message: 'success', event });
    })
  );

  eventsRouter.get(
    '/events/:slug',
    protectedAsyncRequestHandler( async (req, res) => {
      const event = await EventsService.getEvent(EventLookUpKey.SLUG, req.params.slug);
      res.status(HttpStatusCode.OK).json({ message: 'success', event });
    })
  );

  return eventsRouter;
}
