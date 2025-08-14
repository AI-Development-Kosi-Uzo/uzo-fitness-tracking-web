export type FeatureSupport = 'supported' | 'unsupported'
export type PermissionState = 'prompt' | 'granted' | 'denied' | 'unknown'

export interface FeaturePermissionStatus {
  support: FeatureSupport
  state: PermissionState
}

export function detectNotificationSupport(): FeatureSupport {
  return typeof Notification !== 'undefined' ? 'supported' : 'unsupported'
}

export function getNotificationPermissionState(): PermissionState {
  if (typeof Notification === 'undefined') return 'unknown'
  const state = Notification.permission
  if (state === 'granted' || state === 'denied') return state
  return 'prompt'
}

export async function requestNotificationPermission(): Promise<PermissionState> {
  if (typeof Notification === 'undefined') return 'unknown'
  try {
    const result = await Notification.requestPermission()
    if (result === 'granted' || result === 'denied') return result
    return 'prompt'
  } catch {
    return 'unknown'
  }
}

export function detectCameraSupport(): FeatureSupport {
  const hasMediaDevices = typeof navigator !== 'undefined' && !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia
  return hasMediaDevices ? 'supported' : 'unsupported'
}

export async function requestCameraPermission(): Promise<PermissionState> {
  if (detectCameraSupport() === 'unsupported') return 'unknown'
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    // Immediately stop any acquired tracks; we only want permission state
    stream.getTracks().forEach((t) => t.stop())
    return 'granted'
  } catch (err) {
    // If the user denies or the device blocks, treat as denied; otherwise unknown
    return 'denied'
  }
}

export function getCameraPermissionState(): PermissionState {
  // Avoid background prompts; best-effort read via Permissions API when available
  // Many browsers do not expose 'camera' in types; use defensive checks only if present
  const navAny = navigator as unknown as { permissions?: { query: (d: PermissionDescriptor) => Promise<{ state: PermissionState }> } }
  if (!navAny.permissions?.query) return 'unknown'
  // We cannot synchronously return the queried value, so this helper keeps API surface symmetric
  // and the actual state should be refreshed by calling `refreshCameraPermissionState` below.
  return 'unknown'
}

export async function refreshCameraPermissionState(): Promise<PermissionState> {
  const navAny = navigator as unknown as { permissions?: { query: (d: PermissionDescriptor) => Promise<{ state: PermissionState }> } }
  if (!navAny.permissions?.query) return 'unknown'
  try {
    // Casting because TS lib may not include 'camera' in PermissionName union across environments
    const result = await navAny.permissions.query({ name: 'camera' as unknown as PermissionName })
    if (result.state === 'granted' || result.state === 'denied' || result.state === 'prompt') return result.state
    return 'unknown'
  } catch {
    return 'unknown'
  }
}


