import { Button } from './ui/button';
import { cn } from '../utils/cn';
import { useThemeContext } from './theme-provider';

export const SelectedFlyout = ({
  handleDownloadClick,
  handleUnselectClick,
  countOfItems,
}: {
  handleUnselectClick: () => void;
  handleDownloadClick: () => void;
  countOfItems: number;
}) => {
  const isThemeDark = useThemeContext();

  return (
    <div className="flex mt-4">
      <div
        className={cn(
          'flex flex-col gap-3 border border-solid p-3 rounded-2xl',
          isThemeDark ? 'text-white' : 'text-slate-900'
        )}
      >
        <p>{`${countOfItems} ${countOfItems > 1 ? 'items' : 'item'} ${countOfItems > 1 ? 'are selected' : 'is select'}`}</p>
        <div className="space-x-2">
          <Button onClick={handleUnselectClick}>Unselect</Button>
          <Button onClick={handleDownloadClick}>Download</Button>
        </div>
      </div>
    </div>
  );
};
