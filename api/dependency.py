from database.setup import SessionLocal

async def get_db():
    with SessionLocal() as db:
        try:
            yield db
        finally:
            db.close()