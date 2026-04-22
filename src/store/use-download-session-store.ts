import { combine } from 'zustand/middleware'

type DownloadSessionContent = {
  id: string
  name: string
  link: string
  progress: number
}

type DownloadSession = {
  id: string
  name: string
  contents: DownloadSessionContent[]
}

const initialState = {
  sessions: [] as DownloadSession[],
}

export const useDownloadSessionStore = combine(initialState, (set) => ({
  addSession: (session: DownloadSession) => {
    return set((state) => ({ sessions: [...state.sessions, session] }))
  },

  updateSession: (
    sessionId: string,
    updatedSession: Partial<DownloadSession>
  ) => {
    return set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId ? { ...session, ...updatedSession } : session
      ),
    }))
  },

  removeSession: (sessionId: string) => {
    return set((state) => ({
      sessions: state.sessions.filter((session) => session.id !== sessionId),
    }))
  },
}))
