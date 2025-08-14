import type { CompletedSet } from '../../types'
import type { CompletedSetsRepository } from '../contracts'

export class RemoteCompletedSetsRepository implements CompletedSetsRepository {
	async listBySessionExerciseId(sessionExerciseId: string) {
		void sessionExerciseId
		return Promise.reject<CompletedSet[]>(new Error('RemoteCompletedSetsRepository.listBySessionExerciseId not wired'))
	}
	async getById(id: string) {
		void id
		return Promise.reject<CompletedSet | undefined>(new Error('RemoteCompletedSetsRepository.getById not wired'))
	}
	async create(input: Omit<CompletedSet, 'id'>) {
		void input
		return Promise.reject<CompletedSet>(new Error('RemoteCompletedSetsRepository.create not wired'))
	}
	async update(id: string, updates: Partial<Omit<CompletedSet, 'id'>>) {
		void id; void updates
		return Promise.reject<CompletedSet>(new Error('RemoteCompletedSetsRepository.update not wired'))
	}
	async remove(id: string) {
		void id
		return Promise.reject<void>(new Error('RemoteCompletedSetsRepository.remove not wired'))
	}
}