export interface Record<T> {
  id: string;
  data: T;

  toString(): string;

  toJSON(): T;
}
import fs = require('fs');
import { writeFile, readFile } from 'fs/promises';

// function read(filePath: string) {
//   const readableStream = fs.createReadStream(filePath, 'utf8');

//   readableStream.on('error', function (error) {
//     console.log(`error: ${error.message}`);
//   });

//   readableStream.on('data', (chunk) => {
//     const records = JSON.parse(chunk.toString());
//     console.log(records);
//     return Promise.resolve(records);
//   });
// }

// read('./f.csv');

export default class FlatFileDb {
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  filePath = './db.json';
  dbMap = new Map();
  getFilePath(): string {
    return this.filePath;
  }

  async checkFileExists(path: string): Promise<boolean> {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '');
    }
    return true;
  }

  async getAllRecords<T>(): Promise<Record<T>[]> {
    const records = JSON.parse(
      await readFile(this.filePath, 'utf8')
    ) as Record<T>[];
    records.forEach((record) => {
      this.dbMap.set(record.id, record);
    });
    return records;
  }

  async getRecordById<T>(id: string): Promise<Record<T>> {
    const record = (await this.getAllRecords<T>()).find(
      (record) => record.id === id
    );
    if (record) return record;

    throw new Error(`Record with id ${id} not found`);
  }

  async createRecord<T>(record: Record<T>): Promise<Record<T>> {
    const records = await this.getAllRecords();
    records.forEach((record) => {
      this.dbMap.set(record.id, record);
    });
    this.dbMap.set(record.id, record);
    await writeFile(this.filePath, JSON.stringify(records.concat(record)));
    return record;
  }

  async updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>> {
    const records = await this.getAllRecords();
    const recordIndex = records.findIndex((record) => record.id === id);
    if (recordIndex === -1) {
      throw new Error(`Record with id ${id} not found`);
    }
    records[recordIndex] = record;
    await writeFile(this.filePath, JSON.stringify(records));
    return record;
  }

  async deleteRecord<T>(id: string): Promise<Record<T>> {
    const records = await this.getAllRecords();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    this.dbMap.delete(id);
    await writeFile(
      this.filePath,
      JSON.stringify(records.filter((record) => record.id !== id))
    );
    return record as Record<T>;
  }
}
