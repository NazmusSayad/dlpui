use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "create_download_sessions_table",
        sql: "CREATE TABLE IF NOT EXISTS download_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            links TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'draft',
            progress INTEGER NOT NULL DEFAULT 0,
            error TEXT,
            title TEXT
        );",
        kind: MigrationKind::Up,
    }]
}