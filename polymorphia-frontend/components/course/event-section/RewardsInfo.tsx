import ProgressBar from '@/components/progressbar/ProgressBar';
import { RewardsInfoProps } from '@/interfaces/course/EventSectionInterfaces';
import { API_STATIC_URL } from '@/services/api';
import Image from 'next/image';

export default function RewardsInfo({ grade, maxXp }: RewardsInfoProps) {
  return (
    <section className="gradable-event-section">
      <h1>Nagroda</h1>
      {grade !== undefined ? (
        <>
          <div className="flex flex-col">
            <h2>Punkty doświadczenia</h2>
            <div className="pt-7">
              <ProgressBar
                minXP={0}
                currentXP={Number(grade?.gainedXp)}
                maxXP={Number(maxXp)}
                numSquares={2}
                segmentSizes={[0, 100, 0]}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2>Skrzynki</h2>
            {grade.chests.length > 0 ? (
              <div className="flex flex-row gap-5 pt-3">
                {grade?.chests.map((chest) => (
                  <div className="rounded-xl shadow-lg w-30 h-30 relative" key={chest.assignedId}>
                    <Image
                      src={`${API_STATIC_URL}/${chest.chest.imageUrl}`}
                      alt={chest.chest.name}
                      className="rounded-xl"
                      fill
                    />
                  </div>
                ))}
              </div>
            ) : (
              'Nie przydzielono żadnej skrzynki.'
            )}
          </div>
        </>
      ) : (
        'To wydarzenie nie zostało jeszcze ocenione.'
      )}
    </section>
  );
}
