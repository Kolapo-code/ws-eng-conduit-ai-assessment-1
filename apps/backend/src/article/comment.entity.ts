import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { Article } from './article.entity';

@Entity()
export class Comment {
  @PrimaryKey()
  id!: number;

  @Property()
  body!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Article)
  article!: Article;

  constructor(author: User, article: Article, body: string) {
    this.author = author;
    this.article = article;
    this.body = body;
  }
}
