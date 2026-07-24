import { useState, useCallback, type ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { categories } from '../data/categories.ts'

export interface Filters {
  color: string
  shape: string
  priceMin: string
  priceMax: string
  caratMin: string
  caratMax: string
  treatment: string
  inStock: boolean
}

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  categoryColors?: string[]
}

const shapes = ['Oval', 'Round', 'Cushion', 'Pear', 'Emerald Cut', 'Rectangle', 'Cabochon', 'Freeform', 'Dome', 'Slice']
const treatments = ['Natural / Untreated', 'Heated', 'Treated']

function Section({ title, id, isOpen, onToggle, children }: { title: string; id: string; isOpen: boolean; onToggle: (id: string) => void; children: ReactNode }) {
  return (
    <div className="border-b border-border pb-3 mb-3">
      <button onClick={() => onToggle(id)} className="flex items-center justify-between w-full text-sm font-medium mb-2">
        {title}
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {isOpen && children}
    </div>
  )
}

export default function FilterSidebar({ filters, onChange, categoryColors }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    color: true, shape: true, price: true, carat: true, treatment: true, stock: true,
  })

  const toggle = useCallback((section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const update = (partial: Partial<Filters>) => {
    onChange({ ...filters, ...partial })
  }

  const colors = categoryColors || [...new Set(categories.flatMap(c => c.colors))]

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border border-border p-4">
        <h3 className="font-bold text-sm mb-4">Filters</h3>

        <Section title="Color" id="color" isOpen={openSections.color} onToggle={toggle}>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="color" checked={filters.color === ''} onChange={() => update({ color: '' })} className="accent-primary" />
              All Colors
            </label>
            {colors.map(c => (
              <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="color" checked={filters.color === c} onChange={() => update({ color: c })} className="accent-primary" />
                {c}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Shape / Cut" id="shape" isOpen={openSections.shape} onToggle={toggle}>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="shape" checked={filters.shape === ''} onChange={() => update({ shape: '' })} className="accent-primary" />
              All Shapes
            </label>
            {shapes.map(s => (
              <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="shape" checked={filters.shape === s} onChange={() => update({ shape: s })} className="accent-primary" />
                {s}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Price Range (USD)" id="price" isOpen={openSections.price} onToggle={toggle}>
          <div className="flex gap-2">
            <input type="number" placeholder="Min" value={filters.priceMin}
              onChange={(e) => update({ priceMin: e.target.value })}
              className="w-1/2 border border-border rounded px-2 py-1 text-sm" />
            <input type="number" placeholder="Max" value={filters.priceMax}
              onChange={(e) => update({ priceMax: e.target.value })}
              className="w-1/2 border border-border rounded px-2 py-1 text-sm" />
          </div>
        </Section>

        <Section title="Weight (Carats)" id="carat" isOpen={openSections.carat} onToggle={toggle}>
          <div className="flex gap-2">
            <input type="number" placeholder="Min" value={filters.caratMin}
              onChange={(e) => update({ caratMin: e.target.value })}
              step="0.1" className="w-1/2 border border-border rounded px-2 py-1 text-sm" />
            <input type="number" placeholder="Max" value={filters.caratMax}
              onChange={(e) => update({ caratMax: e.target.value })}
              step="0.1" className="w-1/2 border border-border rounded px-2 py-1 text-sm" />
          </div>
        </Section>

        <Section title="Treatment" id="treatment" isOpen={openSections.treatment} onToggle={toggle}>
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="treatment" checked={filters.treatment === ''} onChange={() => update({ treatment: '' })} className="accent-primary" />
              All
            </label>
            {treatments.map(t => (
              <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="treatment" checked={filters.treatment === t} onChange={() => update({ treatment: t })} className="accent-primary" />
                {t}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Availability" id="stock" isOpen={openSections.stock} onToggle={toggle}>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={filters.inStock} onChange={(e) => update({ inStock: e.target.checked })} className="accent-primary" />
            In Stock Only
          </label>
        </Section>
      </div>
    </aside>
  )
}
