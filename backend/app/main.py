from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import health

# Create FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for ConvertHub file conversion tools",
    version=settings.VERSION
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)

# Phase 2 routers will be added here
# app.include_router(pdf.router, prefix="/api/pdf", tags=["PDF"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ConvertHub API",
        "version": settings.VERSION,
        "status": "active",
        "environment": settings.ENVIRONMENT
    }
