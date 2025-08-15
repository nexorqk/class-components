import { useNavigate, useParams } from 'react-router';
import { cn } from '../../utils/cn';
import {
  getCurrentPagesArray,
  getOffsetByPage,
} from '../../utils/page-counter';

type Props = {
  countOfitems: number;
  setPokemon: (searchValue: string, offset?: number) => Promise<void>;
};

export const Pagination = ({ countOfitems, setPokemon }: Props) => {
  const countOfPage = Math.floor(countOfitems / 20);
  const pagesArray = Array.from(
    { length: countOfPage },
    (_, index) => 1 + index
  );

  const navigate = useNavigate();
  const { pokemonName, page } = useParams();

  const currentPage = parseInt(page || '1');

  const currentPagesArray = getCurrentPagesArray(pagesArray, currentPage);

  const handlePageClick = (page: number) => {
    const currentOffset = getOffsetByPage(page);
    navigate(`/pokemon/list/${page}${pokemonName ? `/${pokemonName}` : ''}`);

    setPokemon('', currentOffset);
  };

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
                  onClick={handlePageClick}
                  key={number}
                  number={number}
                  currentPage={currentPage}
                />
              </div>
            ))
          : currentPagesArray.map((number) => (
              <Number
                onClick={handlePageClick}
                key={number}
                number={number}
                currentPage={currentPage}
              />
            ))}
      </div>
    </div>
  );
};

const Number = ({
  number,
  currentPage,
  onClick,
}: {
  number: number;
  currentPage: number;
  onClick: (currentPage: number) => void;
}) => {
  return (
    <p
      className={cn(
        number === currentPage ? 'text-amber-600' : 'text-blue-500',
        'cursor-pointer px-4 py-1',
        number !== currentPage && 'hover:text-blue-800 transition-colors'
      )}
      onClick={() => onClick(number)}
    >
      {number}
    </p>
  );
};
