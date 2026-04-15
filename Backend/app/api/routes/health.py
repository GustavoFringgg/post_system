from fastapi import APIRouter

router = APIRouter()


@router.head("")
def health_check():
    return {"status": "ok"}
