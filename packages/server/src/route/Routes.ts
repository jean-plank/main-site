import { RateLimiter } from './RateLimiter'
import { ContactController } from '../controllers/ContactController'
import { Route } from '../models/Route'
import { MsDuration } from '../models/MsDuration'

export const Routes = (rateLimiter: RateLimiter, contactController: ContactController): Route[] => [
  ['post', '/contact', rateLimiter.limit(2, MsDuration.minutes(1))(contactController.submitForm)]
]