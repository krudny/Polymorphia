import { CardProps } from '@/interfaces/card/CardInterfaces';
import './../../styles/card.css';
import clsx from 'clsx';

export default function Card({ title, subtitle, xp, onClick }: CardProps) {
  return (
    <div
      className={clsx(
        'card',
        onClick && 'cursor-pointer',
        onClick && 'card-hover'
      )}
      onClick={onClick}
    >
      <h1>{title}</h1>
      <div className="card-bottom">
        <h2 className="card-subtitle">{subtitle}</h2>
        <h2 className="card-xp">&nbsp;{xp}</h2>
      </div>
    </div>
  );
}
