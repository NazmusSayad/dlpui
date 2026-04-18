use std::path::PathBuf;

use tauri::{AppHandle, Manager, Runtime};

pub struct Database {
  data_dir: PathBuf,
}

impl Database {
  pub fn new(data_dir: PathBuf) -> Self {
    Database { data_dir }
  }

  pub fn data_dir(&self) -> &PathBuf {
    &self.data_dir
  }
}

pub fn get_data_dir<R: Runtime>(app: &AppHandle<R>) -> Result<PathBuf, String> {
  app
    .path()
    .app_data_dir()
    .map_err(|e| format!("Failed to get app data dir: {e}"))
}

pub fn init_database<R: Runtime>(app: &AppHandle<R>) -> Result<Database, String> {
  let data_dir = get_data_dir(app)?;
  Ok(Database::new(data_dir))
}