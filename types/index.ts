export interface Card {
  id: number;
  title: string;
  description?: string;
  favorite: boolean;
  color: string;
  emoji?: string;
  image: string;
}
