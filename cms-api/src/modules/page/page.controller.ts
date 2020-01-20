import * as express from 'express';

import { ContentCtrl } from '../content';
import { PageService } from './page.service';

import { PageModel, IPageDocument } from './models/page.model';

export class PageCtrl extends ContentCtrl<IPageDocument> {

  constructor() {
    super(PageModel);
    this.pageService = new PageService();
  }

  private pageService: PageService;

  get = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    this.pageService.getPopulatedContentById(req.params.id)
      .then(item => res.status(200).json(item))
      .catch(err => next(err));
  }

  getByUrl = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //need to check isPageDeleted = false
    this.pageService.getPublishedPageByUrl(req.query.url)
      .then(item => res.status(200).json(item))
      .catch(err => next(err));
  }

  getPublishedPageChildren = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    this.pageService.getPublishedPageChildren(req.params.parentId)
      .then(items => res.status(200).json(items))
      .catch(err => next(err));
  }

  getPageChildren = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    this.pageService.getPageChildren(req.params.parentId)
      .then(items => res.status(200).json(items))
      .catch(err => next(err));
  }

  //Override insert base
  insert = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const pageDocument = this.pageService.createModelInstance(req.body);

    return this.pageService.beginCreatePageFlow(pageDocument)
      .then(item => res.status(200).json(item))
      .catch(err => next(err))
  }

  update = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const pageDocument = this.pageService.createModelInstance(req.body);

    this.pageService.updateAndPublishPage(req.params.id, pageDocument)
      .then((savedPage: IPageDocument) => res.status(200).json(savedPage))
      .catch(error => next(error));
  }

  delete = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    this.pageService.beginDeletePageFlow(req.params.id)
      .then((savedPage: IPageDocument) => res.status(200).json(savedPage))
      .catch(error => next(error));
  }
}
