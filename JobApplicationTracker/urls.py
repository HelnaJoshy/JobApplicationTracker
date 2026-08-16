from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.http import HttpResponse


def home(request):
    return HttpResponse("""
        <html>
            <head>
                <title>Job Application Tracker</title>
                <style>
                    body {
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background: #f5f7fb;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }

                    .card {
                        background: white;
                        padding: 45px;
                        border-radius: 18px;
                        text-align: center;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                        max-width: 500px;
                    }

                    .icon {
                        font-size: 55px;
                        margin-bottom: 10px;
                    }

                    h1 {
                        color: #172033;
                        margin-bottom: 15px;
                    }

                    .success {
                        color: #16a34a;
                        font-weight: bold;
                        margin-bottom: 25px;
                    }

                    .links {
                        text-align: left;
                        background: #f8fafc;
                        padding: 20px;
                        border-radius: 10px;
                        line-height: 2;
                    }

                    a {
                        color: #2563eb;
                        text-decoration: none;
                        font-weight: 600;
                    }

                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>

            <body>

                <div class="card">

                    <div class="icon">💼</div>

                    <h1>Job Application Tracker</h1>

                    <p class="success">
                        ✓ Backend API is running successfully!
                    </p>

                    <div class="links">

                        <div>
                            🔗 API:
                            <a href="/api/">/api/</a>
                        </div>

                        <div>
                            🔐 Admin:
                            <a href="/admin/">/admin/</a>
                        </div>

                        <div>
                            🎫 Login:
                            <a href="/api/token/">/api/token/</a>
                        </div>

                    </div>

                </div>

            </body>
        </html>
    """)


urlpatterns = [

    # Home page
    path("", home, name="home"),

    # Django Admin
    path("admin/", admin.site.urls),

    # Application API
    path("api/", include("Applications.urls")),

    # JWT Authentication
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]