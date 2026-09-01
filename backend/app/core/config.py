from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "C4 API"
    # Los valores por defecto servirán si no hay archivo .env, 
    # pero en producción se inyectan desde docker-compose
    DATABASE_URL: str = "mysql+pymysql://c4_user:c4_password@db:3306/c4_db"
    SECRET_KEY: str = "supersecretkey_change_in_production_9f8g7h6"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"

settings = Settings()

