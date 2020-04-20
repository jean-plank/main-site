import { ContactController } from '../controllers/ContactController'
import { Route } from '../models/Route'

export const Routes = (contactController: ContactController): Route[] => [
  ['post', '/contact', contactController.submitForm]
]
