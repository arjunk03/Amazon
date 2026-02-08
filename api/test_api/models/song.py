
from sqlalchemy import Column, Integer, String
from database import Base


class Song(Base):
    __tablename__ = "songs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    artist = Column(String)

    def __repr__(self):
        return f"Song(id={self.id}, name={self.name}, artist={self.artist})"

    def create(self):
        return Song(id=self.id, name=self.name, artist=self.artist)

    def update(self):
        return Song.filter_by(id=self.id).update({"name": self.name, 
                                                 "artist": self.artist})
    
    def delete(self):
        return Song.filter_by(id=self.id).delete()
