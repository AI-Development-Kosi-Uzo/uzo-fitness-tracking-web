import type { PerformedExercise } from '../../types'
import type { PerformedExercisesRepository } from '../contracts'

export class RemotePerformedExercisesRepository implements PerformedExercisesRepository {
	async list() {
		return Promise.reject<PerformedExercise[]>(new Error('RemotePerformedExercisesRepository.list not wired'))
	}
	async getById(id: string) {
		void id
		return Promise.reject<PerformedExercise | undefined>(new Error('RemotePerformedExercisesRepository.getById not wired'))
	}
	async listByWorkoutSessionId(workoutSessionId: string) {
		void workoutSessionId
		return Promise.reject<PerformedExercise[]>(new Error('RemotePerformedExercisesRepository.listByWorkoutSessionId not wired'))
	}
}