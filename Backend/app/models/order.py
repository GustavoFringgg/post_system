from sqlmodel import SQLModel, Field                                                                        
from typing import Optional         
from datetime import datetime
                            

class Order(SQLModel, table=True):                                                                          
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")                                     
    subtotal: int                                                      
    status: str = "completed"
    created_at: datetime = Field(default_factory=datetime.utcnow)