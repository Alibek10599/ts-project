import { IncomingMessage } from 'http';
import { Blog } from './interface';

export const getRequestBlog = async (req: IncomingMessage): Promise<Blog> =>
  new Promise((resolve, reject) => {
    let buffers = '';

    try {
      req.on('data', (chunk) => (buffers += chunk.toString()));

      req.on('end', () => {
        resolve(JSON.parse(buffers) as Blog);
      });
    } catch (error) {
      reject(error);
    }
  });
