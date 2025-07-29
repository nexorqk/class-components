import { cn } from '../../utils/cn';
import { getCurrentPage, getCurrentPagesArray } from '../../utils/page-counter';

type Props = {
  countOfitems: number;
  next: string | null;
  previous: string | null;
  setPokemon: (searchValue: string, offset?: number) => Promise<void>;
};

export const Pagination = ({ countOfitems, next, previous }: Props) => {
  const countOfPage = Math.floor(countOfitems / 20);
  const pagesArray = Array.from(
    { length: countOfPage },
    (_, index) => 1 + index
  );

  console.log(previous);

  const PREV = 'https://pokeapi.co/api/v2/pokemon?offset=333&limit=20';

  const currentPage = getCurrentPage(next, PREV, pagesArray.length);
  console.log(currentPage);

  const currentPagesArray = getCurrentPagesArray(pagesArray, currentPage);

  // TODO
  // const handlePageClick = () => {
  //   setPokemonData('Link with correct offset');
  // };

  return (
    <div className="mt-6 border-t">
      <div className="flex gap-3">
        {currentPagesArray[1] > 10
          ? currentPagesArray.map((number, index) => (
              <div key={number} className="relative">
                {(index === 0 || index === 9) && (
                  <div
                    className={cn(
                      'absolute',
                      index === 0 ? '-right-3' : '-left-3'
                    )}
                  >
                    ...
                  </div>
                )}
                <Number
                  key={number}
                  number={number}
                  currentPage={currentPage}
                />
              </div>
            ))
          : currentPagesArray.map((number) => (
              <Number key={number} number={number} currentPage={currentPage} />
            ))}
      </div>
    </div>
  );
};

const Number = ({
  number,
  currentPage,
}: {
  number: number;
  currentPage: number;
}) => {
  return (
    <p
      className={cn(
        number === currentPage ? 'text-amber-600' : 'text-blue-500'
      )}
    >
      {number}
    </p>
  );
};
