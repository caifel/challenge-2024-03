'use client';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useState } from 'react';

type Data = {
  name: string;
}[];

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const query = useQuery<Data>({
    queryKey: [
      'list',
      {
        searchValue,
      },
    ],
    // queryFn: () => Array.from({ length: searchValue.length }, (_, i) => i),
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${searchValue}?fields=name`,
        );
        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const renderInput = () => {
    return (
      <Input
        className="mt-4"
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />
    );
  };

  const renderContent = () => {
    if (query.isLoading) {
      return 'Loading...';
    }

    if (query.isError) {
      return 'Error';
    }

    if (query.isSuccess) {
      return (
        <ul>
          {query?.data?.map?.((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <Popover open>
        <PopoverTrigger>{renderInput()}</PopoverTrigger>
        <PopoverContent align="start">{renderContent()}</PopoverContent>
      </Popover>
    </div>
  );
};

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="p-24">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <span>Coding</span>
          <code className="font-mono font-bold ml-4">Challenge</code>
        </p>

        <SearchForm />
      </main>
    </QueryClientProvider>
  );
}
