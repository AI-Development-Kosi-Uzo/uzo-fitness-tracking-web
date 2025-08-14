import type { Exercise } from '../../types'
import type { ExercisesRepository } from '../contracts'

export class RemoteExercisesRepository implements ExercisesRepository {
	async list() {
		return Promise.reject<Exercise[]>(new Error('RemoteExercisesRepository.list not wired'))
	}
	async getById(id: string) {
		void id
		return Promise.reject<Exercise | undefined>(new Error('RemoteExercisesRepository.getById not wired'))
	}
	async create(input: Omit<Exercise, 'id'>) {
		void input
		return Promise.reject<Exercise>(new Error('RemoteExercisesRepository.create not wired'))
	}
	async update(id: string, updates: Partial<Omit<Exercise, 'id'>>) {
		void id; void updates
		return Promise.reject<Exercise>(new Error('RemoteExercisesRepository.update not wired'))
	}
	async remove(id: string) {
		void id
		return Promise.reject<void>(new Error('RemoteExercisesRepository.remove not wired'))
	}
}