import { IncomingMessage, ServerResponse } from 'http';
import { Blog } from './interface';
import { FlatFileDb, Record } from 'ff-db-liba';

export default class BlogController {
  constructor(private flatFileService: FlatFileDb) {
    this.flatFileService = flatFileService;
  }

  public async handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;
    const [, , id] = url.split('/');
    switch (method) {
      case 'GET':
        if (id) {
          // res.end(await this.getRequestBlog(id));
        } else {
          res.end(await this.getAllBlogs());
        }
        break;
      case 'POST':
        // res.end(await this.createBlog(req));
        break;
      case 'PUT':
        // return await this.updateBlog(req);
        break;
      case 'DELETE':
        // return await this.deleteBlog(id);
        break;
      default:
        res.end('Not implemented');
    }
  }

  /**
   * @path /blog/list
   * @apiName GetAllBlogs
   * @apiGroup Blog
   * getAllBlogs
   */
  public async getAllBlogs(): Promise<Record<Blog>[]> {
    return await this.flatFileService.getAllRecords();
  }

  /**
   * @api {get} /blog/:id Get blog by id
   * @apiName GetBlogById
   * @apiGroup Blog
   * getBlogById
   */
  public async getBlogById(id: string): Promise<Record<Blog>> {
    return await this.flatFileService.getRecordById(id);
  }
}
