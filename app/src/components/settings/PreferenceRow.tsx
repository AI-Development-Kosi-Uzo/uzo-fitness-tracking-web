import type { ReactNode } from 'react'

export default function PreferenceRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3">
      <div className="text-sm text-text">{label}</div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}


