import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface SearchParamsHandlerProps {
  onAuth: (code: string) => void;
}

export default function SearchParamsHandler({ onAuth }: SearchParamsHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      onAuth(code);
    }
  }, [searchParams, onAuth]);

  return null;
}
