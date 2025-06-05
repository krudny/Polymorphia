import ProgressBar from '@/components/progressbar/ProgressBar';
import { RewardsInfoProps } from '@/interfaces/course/event-section/EventSectionInterfaces';
import { API_STATIC_URL } from '@/services/api';
import Image from 'next/image';
import '../../../styles/event-section.css';

export default function RewardsInfo({ grade, maxXp }: RewardsInfoProps) {
  return (
    <section className="gradable-event-section">
      <h1>Nagroda</h1>
      {grade !== undefined ? (
        <>
          <div className="gradable-event-section-xp">
            <h2>Punkty doświadczenia</h2>
            <div className="gradable-event-section-progress-bar">
              <ProgressBar
                minXP={0}
                currentXP={Number(grade?.gainedXp)}
                maxXP={Number(maxXp)}
                numSquares={2}
                segmentSizes={[0, 100, 0]}
              />
            </div>
          </div>
          <div className="gradable-event-section-chest">
            <h2>Skrzynki</h2>
            {grade.chests.length > 0 ? (
              <div className="gradable-event-section-chests-inner ">
                {grade?.chests.map((chest) => (
                  <div
                    className="gradable-event-section-chests-image-wrapper"
                    key={chest.assignedId}
                  >
                    <Image
                      src={`${API_STATIC_URL}/${chest.chest.imageUrl}`}
                      alt={chest.chest.name}
                      fill
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xl 2xl:text-2xl">
                Nie przydzielono żadnej skrzynki.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-xl 2xl:text-2xl">
          To wydarzenie nie zostało jeszcze ocenione.
        </div>
      )}
    </section>
  );
}
