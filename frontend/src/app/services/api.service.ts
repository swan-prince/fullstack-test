import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPost } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private api = 'http://localhost:3000/api/posts';
  contents = signal<IPost[]>([]);
  total = signal<number>(0);
  page = signal<number>(1);
  pageSize = signal<number>(2);
  filter = signal<string>('');  

  constructor(private http: HttpClient) {}

  loadAll() {
    const params = new HttpParams()
      .set('page', this.page().toString())
      .set('pageSize', this.pageSize().toString())
      .set('filter', this.filter());

    this.http.get<any>(this.api, { params }).subscribe((res) => {
      this.contents.set(res.data);
      this.total.set(res.total);
    });
  }

  add(content: IPost) {
    this.http.post(this.api, content).subscribe(() => this.loadAll());
  }

  like(id: number) {
    this.http.post(`${this.api}/${id}/like`, {}).subscribe(() => this.loadAll());
  }

  delete(id: number) {
    this.http.delete(`${this.api}/${id}`).subscribe(() => this.loadAll());
  }

  setFilter(value: string) {
    this.filter.set(value);
    this.page.set(1);
    this.loadAll();
  }

  nextPage() {
    const totalPages = Math.ceil(this.total() / this.pageSize());
    if (this.page() < totalPages) {
      this.page.update((p) => p + 1);
      this.loadAll();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadAll();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.total() / this.pageSize());
  }
}
