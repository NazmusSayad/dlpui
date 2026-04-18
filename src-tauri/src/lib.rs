use tauri::Manager;

pub mod db;
pub mod tray;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
      use tauri_plugin_dialog::DialogExt;
      app.dialog().message("App is already running.").title("App").show(|_| {});
    }))
    .plugin(tauri_plugin_autostart::init(
      tauri_plugin_autostart::MacosLauncher::LaunchAgent,
      None,
    ))
    .setup(|app| {
      let state = db::init_database(app.handle())?;
      app.manage(state);
      
      if let Err(e) = tray::create_tray(app.handle()) {
        eprintln!("Tray error: {}", e);
      }
      
      Ok(())
    })
    .on_window_event(|window, event| {
      if let tauri::WindowEvent::CloseRequested { api, .. } = event {
        let _ = window.hide();
        api.prevent_close();
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}