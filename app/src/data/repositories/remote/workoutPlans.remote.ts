import type { WorkoutPlan } from '../../types'
import type { WorkoutPlansRepository } from '../contracts'

export class RemoteWorkoutPlansRepository implements WorkoutPlansRepository {
	async list() {
		return Promise.reject<WorkoutPlan[]>(new Error('RemoteWorkoutPlansRepository.list not wired'))
	}
	async getById(id: string) {
		void id
		return Promise.reject<WorkoutPlan | undefined>(new Error('RemoteWorkoutPlansRepository.getById not wired'))
	}
	async getActive() {
		return Promise.reject<WorkoutPlan | undefined>(new Error('RemoteWorkoutPlansRepository.getActive not wired'))
	}
	async create(input: Omit<WorkoutPlan, 'id'>) {
		void input
		return Promise.reject<WorkoutPlan>(new Error('RemoteWorkoutPlansRepository.create not wired'))
	}
	async update(id: string, updates: Partial<Omit<WorkoutPlan, 'id'>>) {
		void id; void updates
		return Promise.reject<WorkoutPlan>(new Error('RemoteWorkoutPlansRepository.update not wired'))
	}
	async remove(id: string) {
		void id
		return Promise.reject<void>(new Error('RemoteWorkoutPlansRepository.remove not wired'))
	}
}