import type { ProgressPhoto } from '../../types'
import type { ProgressPhotosRepository } from '../contracts'

export class RemoteProgressPhotosRepository implements ProgressPhotosRepository {
	async list() {
		return Promise.reject<ProgressPhoto[]>(new Error('RemoteProgressPhotosRepository.list not wired'))
	}
	async getById(id: string) {
		void id
		return Promise.reject<ProgressPhoto | undefined>(new Error('RemoteProgressPhotosRepository.getById not wired'))
	}
	async listByAngle(angle: 'front' | 'side' | 'back') {
		void angle
		return Promise.reject<ProgressPhoto[]>(new Error('RemoteProgressPhotosRepository.listByAngle not wired'))
	}
	async create(input: Omit<ProgressPhoto, 'id'>) {
		void input
		return Promise.reject<ProgressPhoto>(new Error('RemoteProgressPhotosRepository.create not wired'))
	}
	async update(id: string, updates: Partial<Omit<ProgressPhoto, 'id'>>) {
		void id; void updates
		return Promise.reject<ProgressPhoto>(new Error('RemoteProgressPhotosRepository.update not wired'))
	}
	async remove(id: string) {
		void id
		return Promise.reject<void>(new Error('RemoteProgressPhotosRepository.remove not wired'))
	}
}