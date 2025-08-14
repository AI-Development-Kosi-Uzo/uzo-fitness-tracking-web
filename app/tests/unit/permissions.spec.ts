import { describe, it, expect } from 'vitest'
import {
  detectNotificationSupport,
  getNotificationPermissionState,
  detectCameraSupport,
} from '../../src/utils/permissions'

describe('permissions utils', () => {
  it('detectNotificationSupport returns a string', () => {
    const support = detectNotificationSupport()
    expect(['supported', 'unsupported']).toContain(support)
  })

  it('getNotificationPermissionState returns a string state', () => {
    const state = getNotificationPermissionState()
    expect(['prompt', 'granted', 'denied', 'unknown']).toContain(state)
  })

  it('detectCameraSupport returns a string', () => {
    const support = detectCameraSupport()
    expect(['supported', 'unsupported']).toContain(support)
  })
})


