from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from schemas.song import Song as SongSchema
from crud import song as crud_song
from dependencies import get_db

song_router = APIRouter()

@song_router.get("/songs", response_model=List[SongSchema])
def read_songs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    songs = crud_song.get_songs(db, skip=skip, limit=limit)
    return songs

@song_router.get("/songs/{song_id}", response_model=SongSchema)
def read_song(song_id: int, db: Session = Depends(get_db)):
    db_song = crud_song.get_song(db, song_id=song_id)
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    return db_song

@song_router.post("/songs", response_model=SongSchema)
def create_song(song: SongSchema, db: Session = Depends(get_db)):
    db_song = crud_song.get_song(db, song_id=song.id)
    if db_song:
        raise HTTPException(status_code=400, detail="Song with this ID already exists")
    return crud_song.create_song(db=db, song=song)

@song_router.put("/songs/{song_id}", response_model=SongSchema)
def update_song(song_id: int, song: SongSchema, db: Session = Depends(get_db)):
    db_song = crud_song.get_song(db, song_id=song_id)
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    return crud_song.update_song(db=db, song_id=song_id, song=song)

@song_router.delete("/songs/{song_id}")
def delete_song(song_id: int, db: Session = Depends(get_db)):
    db_song = crud_song.get_song(db, song_id=song_id)
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    crud_song.delete_song(db=db, song_id=song_id)
    return {"message": "Song deleted successfully"}