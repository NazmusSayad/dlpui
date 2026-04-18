import * as path from '@tauri-apps/api/path'
import { exists, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs'
import { TSettingsSchema, TUserSchema } from './config-schema'

const CONFIG_FILE_NAME = 'config.json'

export interface ConfigFile {
  user: TUserSchema
  settings: TSettingsSchema
}

export async function readUserConfig(): Promise<ConfigFile | null> {
  const home = await path.appConfigDir()
  const configPath = await path.join(home, CONFIG_FILE_NAME)

  if (!(await exists(configPath))) {
    return null
  }

  const base = await readTextFile(configPath)
  try {
    return JSON.parse(base)
  } catch (error) {
    console.error('error parsing config', error)
    return { user: {}, settings: { startOnLogin: false, ignoreClipboard: false, computeTechnology: 'auto' } }
  }
}

export async function writeUserConfig(config: ConfigFile) {
  const home = await path.appConfigDir()
  const configPath = await path.join(home, CONFIG_FILE_NAME)

  await writeTextFile(configPath, JSON.stringify(config, null, 2))
}