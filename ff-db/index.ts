import fs = require('fs');
import { writeFile, readFile } from 'fs/promises';

export interface Record<T> {
  id: string;
  data: T;
  toString(): string;
  toJSON(): T;
}
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

  async save(): Promise<void> {
    await writeFile(
      this.filePath,
      JSON.stringify(Object.fromEntries(this.dbMap))
    );
  }

  async getAllRecords<T>(): Promise<Record<T>[]> {
    const records = JSON.parse(
      await readFile(this.filePath, 'utf8')
    ) as Record<T>[];
    records.map((record) => {
      this.dbMap.set(record.id, record);
    });
    return records;
  }

  async getRecordById<T>(id: string): Promise<Record<T>> {
    const record = (await this.getAllRecords<T>()).find(
      (record) => record.id === id
    );
    if (!record) throw new Error(`Record with id ${id} not found`);
    return record;
  }

  async createRecord<T>(record: Record<T>): Promise<Record<T>> {
    await this.getAllRecords();
    this.dbMap.set(record.id, record);
    await this.save();
    return record;
  }

  async updateRecord<T>(id: string, record: Record<T>): Promise<Record<T>> {
    const records = await this.getAllRecords();
    const recordIndex = records.findIndex((record) => record.id === id);
    if (recordIndex === -1) {
      throw new Error(`Record with id ${id} not found`);
    }
    records[recordIndex] = record;
    this.dbMap = new Map(records.map((record) => [record.id, record]));
    await this.save();
    return record;
  }

  async deleteRecord(id: string): Promise<void> {
    const records = await this.getAllRecords();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    this.dbMap.delete(id);
    await this.save();
  }
}
