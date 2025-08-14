import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../data/queryKeys'
import { MemoryWorkoutPlansRepository } from '../../data/repositories/memory/workoutPlans.repo'
import { MemoryWorkoutSessionsRepository } from '../../data/repositories/memory/workoutSessions.repo'
import { paths } from '../paths'

const plansRepo = new MemoryWorkoutPlansRepository()
const sessionsRepo = new MemoryWorkoutSessionsRepository()

export const LogPage = () => {
	const { data: activePlan } = useQuery({ queryKey: queryKeys.activeWorkoutPlan(), queryFn: () => plansRepo.getActive() })
	const { data: today } = useQuery({ queryKey: queryKeys.todaysWorkoutSession(), queryFn: () => sessionsRepo.getToday() })

	return (
		<div className="p-4 space-y-3">
			<h1 className="text-2xl font-semibold tracking-tight">Log</h1>
			{activePlan ? (
				<div className="space-y-2">
					<div className="text-sm">Active plan: <span className="font-medium">{activePlan.customName}</span></div>
					{today ? (
						<Link to={paths.logSession} className="inline-block px-3 py-2 rounded bg-blue-600 text-white text-sm">Continue today’s session: {today.title}</Link>
					) : (
						<div className="text-sm text-gray-600">No session scheduled for today.</div>
					)}
				</div>
			) : (
				<div className="text-sm text-gray-600">No active plan</div>
			)}
		</div>
	)
}