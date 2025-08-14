import type { PropsWithChildren } from 'react'

export function Page({ children }: PropsWithChildren) {
	return (
		<div className="mx-auto max-w-[560px] min-h-dvh bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900">
			{children}
		</div>
	)
}