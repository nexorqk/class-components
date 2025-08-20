import { useParams, useRouter } from 'next/navigation';

import { cn } from '../../utils/cn';
import { getCurrentPagesArray } from '../../utils/page-counter';
import { getParamsPageValue } from '@/utils/get-params-value';

type Props = {
  countOfitems: number;
};

export const Pagination = ({ countOfitems }: Props) => {
  const countOfPage = Math.floor(countOfitems / 20);
  const pagesArray = Array.from(
    { length: countOfPage },
    (_, index) => 1 + index
  );

  const router = useRouter();
  const params = useParams();

  const currentPage = getParamsPageValue(params.page);

  const currentPagesArray = getCurrentPagesArray(pagesArray, currentPage);

  const handlePageClick = (page: number) => {
    router.push(
      `/pokemon/list/${page}${params.pokemonName ? `/${params.pokemonName}` : ''}`
    );
  };

  return (
    <div>
      <ul className="flex gap-3 mt-3">
        {currentPagesArray[1] > 10
          ? currentPagesArray.map((number) => (
              <Number
                onClick={handlePageClick}
                key={number}
                number={number}
                currentPage={currentPage}
              />
            ))
          : currentPagesArray.map((number) => (
              <Number
                onClick={handlePageClick}
                key={number}
                number={number}
                currentPage={currentPage}
              />
            ))}
      </ul>
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
    <li
      className={cn(
        number === currentPage ? 'text-amber-600' : 'text-blue-500',
        'cursor-pointer px-4 py-1 border rounded-2xl',
        number !== currentPage && 'hover:text-blue-800 transition-colors'
      )}
      onClick={() => onClick(number)}
    >
      {number}
    </li>
  );
};
