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
		<div style={{ padding: '16px' }}>
			<h1>Log</h1>
			{activePlan ? (
				<div style={{ marginTop: '8px' }}>
					<div>Active plan: {activePlan.customName}</div>
					{today ? (
						<Link to={paths.logSession}>Continue today’s session: {today.title}</Link>
					) : (
						<div>No session scheduled for today.</div>
					)}
				</div>
			) : (
				<div>No active plan</div>
			)}
		</div>
	)
}