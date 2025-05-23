import { CardProps } from '@/interfaces/card/CardInterfaces';
import './../../styles/card.css';
import clsx from 'clsx';
import Link from 'next/link';

export default function Card({ title, subtitle, xp, link }: CardProps) {
  const content = (
    <div className={clsx('card', link && 'cursor-pointer')}>
      <h1>{title}</h1>
      <div className="card-bottom">
        <h2 className="card-subtitle">{subtitle}</h2>
        <h2 className="card-xp">&nbsp;{xp}</h2>
      </div>
    </div>
  );

  return link ? <Link href={link}>{content}</Link> : content;
}
