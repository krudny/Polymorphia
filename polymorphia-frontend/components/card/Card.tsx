import { CardProps } from '@/interfaces/card/CardInterfaces';
import './../../styles/card.css';
import clsx from 'clsx';

export default function Card({ title, subtitle, xp, link }: CardProps) {
  return (
    <div className={clsx("card", link && "cursor-pointer")}>
      <h1>{title}</h1>
      <div className="flex flex-row justify-between gap-3 items-end">
        <h2 className="card-subtitle">{subtitle}</h2>
        <h2 className="card-xp">{xp}</h2>
      </div>
    </div>
  );
}
