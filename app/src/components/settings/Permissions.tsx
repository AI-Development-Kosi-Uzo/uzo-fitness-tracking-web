import { useEffect, useState } from 'react'
import type { FeatureSupport, PermissionState } from '../../utils/permissions'
import {
  detectCameraSupport,
  detectNotificationSupport,
  getNotificationPermissionState,
  requestCameraPermission,
  requestNotificationPermission,
  refreshCameraPermissionState,
} from '../../utils/permissions'

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-md border border-border px-2 py-0.5 text-[12px] text-muted">
      {children}
    </span>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3">
      <div className="text-sm text-text">{label}</div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

export default function Permissions() {
  const [notificationSupport, setNotificationSupport] = useState<FeatureSupport>('unsupported')
  const [notificationState, setNotificationState] = useState<PermissionState>('unknown')
  const [cameraSupport, setCameraSupport] = useState<FeatureSupport>('unsupported')
  const [cameraState, setCameraState] = useState<PermissionState>('unknown')

  useEffect(() => {
    setNotificationSupport(detectNotificationSupport())
    setNotificationState(getNotificationPermissionState())
    setCameraSupport(detectCameraSupport())
    refreshCameraPermissionState().then(setCameraState).catch(() => {})
  }, [])

  const handleRequestNotifications = async () => {
    const state = await requestNotificationPermission()
    setNotificationState(state)
  }

  const handleRequestCamera = async () => {
    const state = await requestCameraPermission()
    setCameraState(state)
  }

  return (
    <div>
      <Row label="Notifications">
        <Badge>{notificationSupport === 'supported' ? 'Supported' : 'Unsupported'}</Badge>
        <Badge>{notificationState}</Badge>
        <button
          className="rounded-md bg-primary px-3 py-1 text-white disabled:opacity-50"
          onClick={handleRequestNotifications}
          disabled={notificationSupport === 'unsupported' || notificationState === 'granted'}
        >
          Request
        </button>
      </Row>
      <Row label="Camera">
        <Badge>{cameraSupport === 'supported' ? 'Supported' : 'Unsupported'}</Badge>
        <Badge>{cameraState}</Badge>
        <button
          className="rounded-md bg-primary px-3 py-1 text-white disabled:opacity-50"
          onClick={handleRequestCamera}
          disabled={cameraSupport === 'unsupported' || cameraState === 'granted'}
        >
          Request
        </button>
      </Row>
    </div>
  )
}


