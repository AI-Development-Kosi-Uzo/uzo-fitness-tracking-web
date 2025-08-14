import PreferenceRow from '../../components/settings/PreferenceRow'
import Permissions from '../../components/settings/Permissions'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-lg font-medium text-text">{title}</h2>
      {children}
    </section>
  )
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-xl font-semibold text-text">Settings</h1>

      <div className="flex flex-col gap-4">
        <Section title="Permissions">
          <Permissions />
        </Section>

        <Section title="Preferences">
          <PreferenceRow label="Dark mode (stub)">
            <input type="checkbox" />
          </PreferenceRow>
          <PreferenceRow label="Haptics (stub)">
            <input type="checkbox" />
          </PreferenceRow>
        </Section>

        <Section title="Data management">
          <div className="flex items-center justify-between py-1">
            <div className="text-sm text-text">Export data (placeholder)</div>
            <button className="rounded-md border border-border px-3 py-1">Export</button>
          </div>
          <div className="flex items-center justify-between py-1">
            <div className="text-sm text-text">Import data (placeholder)</div>
            <button className="rounded-md border border-border px-3 py-1">Import</button>
          </div>
        </Section>
      </div>
    </div>
  )
}


