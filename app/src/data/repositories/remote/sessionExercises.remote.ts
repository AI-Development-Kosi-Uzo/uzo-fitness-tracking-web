import type { CompletedSet, SessionExercise } from '../../types'
import type { SessionExercisesRepository } from '../contracts'

export class RemoteSessionExercisesRepository implements SessionExercisesRepository {
	async listBySessionId(sessionId: string) {
		void sessionId
		return Promise.reject<SessionExercise[]>(new Error('RemoteSessionExercisesRepository.listBySessionId not wired'))
	}
	async getById(id: string) {
		void id
		return Promise.reject<SessionExercise | undefined>(new Error('RemoteSessionExercisesRepository.getById not wired'))
	}
	async create(input: Omit<SessionExercise, 'id' | 'totalVolume' | 'volumeChange' | 'volumeChangePercentage'>) {
		void input
		return Promise.reject<SessionExercise>(new Error('RemoteSessionExercisesRepository.create not wired'))
	}
	async update(id: string, updates: Partial<Omit<SessionExercise, 'id'>>) {
		void id; void updates
		return Promise.reject<SessionExercise>(new Error('RemoteSessionExercisesRepository.update not wired'))
	}
	async remove(id: string) {
		void id
		return Promise.reject<void>(new Error('RemoteSessionExercisesRepository.remove not wired'))
	}
	async listCompletedSets(sessionExerciseId: string) {
		void sessionExerciseId
		return Promise.reject<CompletedSet[]>(new Error('RemoteSessionExercisesRepository.listCompletedSets not wired'))
	}
}