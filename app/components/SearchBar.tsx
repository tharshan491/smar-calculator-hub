'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="search-bar-container">
      <div className="relative">
        {focused && <label className="search-label">Search calculator...</label>}
        <input
          type="text"
          placeholder="Search BMI, Loan, Compound Interest, Tip..."
          className="search-bar"
          onFocus={() => setFocused(true)}
          onBlur={() => !value && setFocused(false)}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onSearch(e.target.value)
          }}
        />
        <Search className="absolute right-4 top-4 w-5 h-5 text-muted pointer-events-none" />
      </div>
    </div>
  )
}
