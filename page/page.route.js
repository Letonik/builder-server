import express from 'express';
import {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
} from './page.controller';

const pageRoute = express.Router();
pageRoute.post('/', create); //Create Page
pageRoute.post('/:pageId/content', changeContent); // HTML from Editor + здесь будет метод для img

pageRoute.put('/:pageId', update);

pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);
pageRoute.get('/', list); //List of pages
pageRoute.get('/:pageId/content', loadContent); //Load content of Page from DB for Grapes

export default pageRoute;
