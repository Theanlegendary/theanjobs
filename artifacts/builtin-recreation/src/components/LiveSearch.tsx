import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'wouter';

interface SearchResult {
  id: string;
  title: string;
  type: 'job' | 'company' | 'article';
  subtitle?: string;
  url: string;
}

export function LiveSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Software Engineer',
    'Product Manager',
    'Remote Jobs',
  ]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with debounce
    const timer = setTimeout(() => {
      // Mock search results
      const allResults: SearchResult[] = [
        {
          id: '1',
          title: 'Senior Software Engineer',
          type: 'job',
          subtitle: 'Google • San Francisco, CA',
          url: '/jobs/1',
        },
        {
          id: '2',
          title: 'Microsoft Corporation',
          type: 'company',
          subtitle: '15,000+ employees • Technology',
          url: '/companies/microsoft',
        },
        {
          id: '3',
          title: 'How to Ace Your Tech Interview',
          type: 'article',
          subtitle: 'Career Advice • 5 min read',
          url: '/articles/tech-interview-guide',
        },
      ];
      const mockResults = allResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(query.toLowerCase())
      );

      setResults(mockResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setRecentSearches((prev) => [
        searchQuery,
        ...prev.filter((s) => s !== searchQuery).slice(0, 4),
      ]);
      // Navigate to search results page
      window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'job':
        return 'bg-blue-100 text-blue-700';
      case 'company':
        return 'bg-purple-100 text-purple-700';
      case 'article':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          placeholder="Search jobs, companies, or articles..."
          className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {query.length < 2 ? (
            // Recent Searches
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Recent Searches</span>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>

              {/* Trending Searches */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Trending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React Developer', 'Data Scientist', 'UX Designer'].map((trend) => (
                    <button
                      key={trend}
                      onClick={() => {
                        setQuery(trend);
                        handleSearch(trend);
                      }}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            // Search Results
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <Link key={result.id} href={result.url}>
                  <div
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${getTypeColor(
                          result.type
                        )}`}
                      >
                        {result.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">
                          {result.title}
                        </div>
                        {result.subtitle && (
                          <div className="text-sm text-gray-600 truncate">{result.subtitle}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // No Results
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No results found</p>
              <p className="text-sm mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
