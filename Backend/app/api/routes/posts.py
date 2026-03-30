from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def list_posts():
    return []


@router.get("/{post_id}")
def get_post(post_id: int):
    return {"id": post_id}
