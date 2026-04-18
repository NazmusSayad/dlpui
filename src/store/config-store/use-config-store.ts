import { create } from 'zustand'
import { readUserConfig, writeUserConfig } from './config-fs'
import { settingsSchema, userSchema } from './config-schema'

interface Settings {
  startOnLogin: boolean
  ignoreClipboard: boolean
  computeTechnology: 'auto' | 'cpu' | 'cuda' | 'vulkan' | 'metal'
}

interface User {
  name?: string
}

interface State {
  user: User
  settings: Settings
}

interface Actions {
  setSettings: (settings: Settings) => void
  updateSettings: (updates: Partial<Settings>) => void
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
}

async function getInitialState(): Promise<State> {
  const userConfig = await readUserConfig()

  return {
    user: userConfig?.user ?? userSchema.parse({}),
    settings: userConfig?.settings ?? settingsSchema.parse({}),
  }
}

const initialState = await getInitialState()

export const useConfigStore = create<State & Actions>((set) => ({
  user: initialState.user,
  settings: initialState.settings,

  setSettings(settings: Settings) {
    set({ settings })
  },

  updateSettings(updates: Partial<Settings>) {
    set((prev) => ({
      settings: { ...prev.settings, ...updates },
    }))
  },

  setUser(user: User) {
    set({ user })
  },

  updateUser(updates: Partial<User>) {
    set((prev) => ({
      user: { ...prev.user, ...updates },
    }))
  },
}))

let configWriteQueue = Promise.resolve()

useConfigStore.subscribe((state: State) => {
  configWriteQueue = configWriteQueue
    .then(async () => {
      await writeUserConfig({
        user: state.user,
        settings: state.settings,
      })
    })
    .catch((error) => {
      console.error('failed to persist config state', error)
    })
})