from pydantic_settings import BaseSettings, SettingsConfigDict

# BaseSettings 創建設定類別
# SettingsConfigDict 定義配置類型 (跟 BaseSettings 從屬關係)
# DB_NAME: str 當沒有預設值時，為必選的 會從.env去撈，給預設值就是可選的 
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    PROJECT_NAME: str = "Pos System"
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str 

#修飾一個方法後，會讓它像屬性一樣讀取 呼叫時不用()
#asyncpg維持非同步查詢
# return 資料庫總類/名稱:密碼＠host:資料庫名稱
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"      



settings = Settings() #建立全域共用實例

