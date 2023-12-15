import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hscores' }) 
export class Pontuacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'player_name' }) 
  playerName: string;

  @Column()
  score: number;
}