import { Search } from '@/components/search';

const PokemonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="py-6 px-2 max-w-4xl mx-auto">
      <Search />
      {children}
    </main>
  );
};

export default PokemonLayout;
