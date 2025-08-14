import type { SessionExercise, WorkoutSession } from '../../types'
import type { WorkoutSessionsRepository } from '../contracts'

export class RemoteWorkoutSessionsRepository implements WorkoutSessionsRepository {
	async list() {
		return Promise.reject<WorkoutSession[]>(new Error('RemoteWorkoutSessionsRepository.list not wired'))
	}
	async getById(id: string) {
		void id
		return Promise.reject<WorkoutSession | undefined>(new Error('RemoteWorkoutSessionsRepository.getById not wired'))
	}
	async getToday() {
		return Promise.reject<WorkoutSession | undefined>(new Error('RemoteWorkoutSessionsRepository.getToday not wired'))
	}
	async create(input: Omit<WorkoutSession, 'id' | 'totalVolume'>) {
		void input
		return Promise.reject<WorkoutSession>(new Error('RemoteWorkoutSessionsRepository.create not wired'))
	}
	async update(id: string, updates: Partial<Omit<WorkoutSession, 'id'>>) {
		void id; void updates
		return Promise.reject<WorkoutSession>(new Error('RemoteWorkoutSessionsRepository.update not wired'))
	}
	async remove(id: string) {
		void id
		return Promise.reject<void>(new Error('RemoteWorkoutSessionsRepository.remove not wired'))
	}
	async listSessionExercises(sessionId: string) {
		void sessionId
		return Promise.reject<SessionExercise[]>(new Error('RemoteWorkoutSessionsRepository.listSessionExercises not wired'))
	}
}