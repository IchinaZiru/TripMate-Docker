FROM python:3.12

# 作業ディレクトリを設定
WORKDIR /workspace

COPY ./source /workspace


RUN apt-get clean
RUN apt-get update
RUN apt install -y nodejs npm python3-pip

RUN npm install express
RUN npm install nodemon

# Pythonの依存関係をインストール
COPY ./source/requirements.txt .
RUN pip install --no-cache-dir -v -r requirements.txt
RUN pip install pandas
RUN pip install scikit-learn
RUN pip install python-dotenv
RUN pip install requests



# アプリケーションのソースコードをコピー
COPY . .

# FastAPIを実行（バックエンドサーバーの起動）
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
