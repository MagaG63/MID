export class CreateCommentDto {
  forum_id: number;
  author_id: number;
  content: string;
  parent_id?: number;
  likes_count?: number;
  status?: string;
}
