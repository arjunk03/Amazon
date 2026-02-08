from sqlalchemy.orm import Session
from models.song import Song as SongModel
from schemas.song import Song as SongSchema

def get_song(db: Session, song_id: int):
    return db.query(SongModel).filter(SongModel.id == song_id).first()

def get_songs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(SongModel).offset(skip).limit(limit).all()

def create_song(db: Session, song: SongSchema):
    db_song = SongModel(id=song.id, name=song.name, artist=song.artist)
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return db_song

def update_song(db: Session, song_id: int, song: SongSchema):
    db_song = db.query(SongModel).filter(SongModel.id == song_id).first()
    if db_song:
        db_song.name = song.name
        db_song.artist = song.artist
        db.commit()
        db.refresh(db_song)
    return db_song

def delete_song(db: Session, song_id: int):
    db_song = db.query(SongModel).filter(SongModel.id == song_id).first()
    if db_song:
        db.delete(db_song)
        db.commit()
    return db_song
