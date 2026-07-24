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
    <div style={{borderBottom: '1px solid #ddd', paddingBottom: 10, marginBottom: 10}}>
      <button onClick={() => onToggle(id)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', fontSize: 13, fontWeight: 'bold', marginBottom: 8,
          background: 'none', border: 'none', cursor: 'pointer', color: '#333', padding: 0
        }}>
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
    <aside className="gs-sidebar" style={{width: '100%'}}>
      <h3 style={{fontWeight: 'bold', fontSize: 14, marginBottom: 12}}>Filters</h3>

      <Section title="Color" id="color" isOpen={openSections.color} onToggle={toggle}>
        <div style={{maxHeight: 160, overflowY: 'auto'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
            <input type="radio" name="color" checked={filters.color === ''} onChange={() => update({ color: '' })} style={{accentColor: '#005334'}} />
            All Colors
          </label>
          {colors.map(c => (
            <label key={c} style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
              <input type="radio" name="color" checked={filters.color === c} onChange={() => update({ color: c })} style={{accentColor: '#005334'}} />
              {c}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Shape / Cut" id="shape" isOpen={openSections.shape} onToggle={toggle}>
        <div style={{maxHeight: 160, overflowY: 'auto'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
            <input type="radio" name="shape" checked={filters.shape === ''} onChange={() => update({ shape: '' })} style={{accentColor: '#005334'}} />
            All Shapes
          </label>
          {shapes.map(s => (
            <label key={s} style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
              <input type="radio" name="shape" checked={filters.shape === s} onChange={() => update({ shape: s })} style={{accentColor: '#005334'}} />
              {s}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price Range (USD)" id="price" isOpen={openSections.price} onToggle={toggle}>
        <div style={{display: 'flex', gap: 8}}>
          <input type="number" placeholder="Min" value={filters.priceMin}
            onChange={(e) => update({ priceMin: e.target.value })}
            style={{width: '50%', padding: '4px 6px', border: '1px solid #ccc', borderRadius: 3, fontSize: 13}} />
          <input type="number" placeholder="Max" value={filters.priceMax}
            onChange={(e) => update({ priceMax: e.target.value })}
            style={{width: '50%', padding: '4px 6px', border: '1px solid #ccc', borderRadius: 3, fontSize: 13}} />
        </div>
      </Section>

      <Section title="Weight (Carats)" id="carat" isOpen={openSections.carat} onToggle={toggle}>
        <div style={{display: 'flex', gap: 8}}>
          <input type="number" placeholder="Min" value={filters.caratMin}
            onChange={(e) => update({ caratMin: e.target.value })}
            step="0.1" style={{width: '50%', padding: '4px 6px', border: '1px solid #ccc', borderRadius: 3, fontSize: 13}} />
          <input type="number" placeholder="Max" value={filters.caratMax}
            onChange={(e) => update({ caratMax: e.target.value })}
            step="0.1" style={{width: '50%', padding: '4px 6px', border: '1px solid #ccc', borderRadius: 3, fontSize: 13}} />
        </div>
      </Section>

      <Section title="Treatment" id="treatment" isOpen={openSections.treatment} onToggle={toggle}>
        <div>
          <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
            <input type="radio" name="treatment" checked={filters.treatment === ''} onChange={() => update({ treatment: '' })} style={{accentColor: '#005334'}} />
            All
          </label>
          {treatments.map(t => (
            <label key={t} style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 4}}>
              <input type="radio" name="treatment" checked={filters.treatment === t} onChange={() => update({ treatment: t })} style={{accentColor: '#005334'}} />
              {t}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Availability" id="stock" isOpen={openSections.stock} onToggle={toggle}>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer'}}>
          <input type="checkbox" checked={filters.inStock} onChange={(e) => update({ inStock: e.target.checked })} style={{accentColor: '#005334'}} />
          In Stock Only
        </label>
      </Section>
    </aside>
  )
}
