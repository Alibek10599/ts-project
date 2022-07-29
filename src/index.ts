import { createServer } from 'http';
import BlogController from './controller';
import { FlatFileDb, Record } from 'ff-db-liba';
import * as path from 'path';
import { Blog } from 'interface';

const inputPath = path.join(__dirname, '../blogs.json');
const flatFileService = new FlatFileDb(inputPath);
const controller = new BlogController(flatFileService);

const blog: Record<Blog> = {
  id: '5',
  data: {
    id: '5',
    title: 'Fifth Blog',
    content:
      'This is the fifth blog Lorem ipsumdolor sit amet, consectetur adipiscing elit.',
    author: 'John Lennon',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  toJSON: () => {
    return {
      id: '5',
      title: 'Fifth Blog',
      content:
        'This is the fifth blog Lorem ipsumdolor sit amet, consectetur adipiscing elit.',
      author: 'John Lennon',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
};

console.log('Server running at http://localhost:8080/');
console.log(
  flatFileService.deleteRecord('2').then(() => {
    console.log('records');
  })
);
createServer(controller.handleRequest).listen(8080);
