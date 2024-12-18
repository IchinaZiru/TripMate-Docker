import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS設定
origins = [
    "http://localhost",  # 例えば、localhostのフロントエンド
    "http://localhost:3100",  # Reactの場合の一般的なポート
    "https:/tripmate/.com",  # 必要に応じて本番環境のドメインも追加
]

# CORSミドルウェアを追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 全てのドメインを許可
    allow_credentials=True,
    allow_methods=["*"],  # 全てのHTTPメソッドを許可
    allow_headers=["*"],  # 全てのHTTPヘッダーを許可
)

# Rakuten APIの認証情報（APIキー）
RAKUTEN_API_KEY = '1073050120694718257'  # ここに楽天APIキーを入力してください

# 検索クエリのためのモデル
class SearchCriteria(BaseModel):
    prefecture: List[str]   # 都道府県リスト
    checkIn: str            # チェックイン日
    checkOut: str           # チェックアウト日
    guests: int             # ゲスト数
    rooms: int              # 部屋数
    budget: int             # 予算
    purpose: str            # 宿泊目的
    transportation: List[str]  # 交通手段

# 楽天APIの宿泊施設検索
def fetch_hotels_from_rakuten(criteria: SearchCriteria):
    # 楽天APIのURL（宿泊施設検索）
    url = "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426"

    # 検索条件を楽天APIのパラメータに変換
    params = {
        "format": "json",
        "applicationId": RAKUTEN_API_KEY,  # ここに楽天のAPIキーを指定
        "checkInDate": criteria.checkIn,   # チェックイン日
        "checkOutDate": criteria.checkOut, # チェックアウト日
        "adultNum": criteria.guests,       # ゲスト数
        "roomNum": criteria.rooms,         # 部屋数
        "keyword": criteria.purpose,       # 宿泊目的
        "area": ','.join(criteria.prefecture),  # 複数都道府県をカンマ区切りで指定
        "budgetMin": criteria.budget,      # 最低予算
        "transportation": ','.join(criteria.transportation)  # 交通手段（例: 'JR,Car'）
    }

    try:
        # APIにリクエストを送信
        response = requests.get(url, params=params)
        response.raise_for_status()  # エラーチェック

        # レスポンスをJSONとして返す
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error occurred while calling Rakuten API: {e}")
        raise HTTPException(status_code=500, detail=f"楽天APIへのリクエスト中にエラーが発生しました: {e}")

@app.post("/api/search")
async def search_criteria(criteria: SearchCriteria):
    # 楽天APIを呼び出し
    rakuten_response = fetch_hotels_from_rakuten(criteria)
    
    # 楽天APIから取得したデータをそのまま返す
    return {"message": "宿泊施設が検索されました", "hotels": rakuten_response}