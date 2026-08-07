---

## ⚙️ Getting Started

### Option A: Docker (recommended)
```bash
docker build -t mediinsight-backend .
docker run -p 8000:8000 --env-file backend/.env mediinsight-backend
```

### Option B: Manual

**Prerequisites**: Python 3.10+, Node.js 18+, Tesseract OCR + Poppler on your PATH

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
# Add your API keys + SECRET_KEY to backend/.env (see backend/.env.example)
uvicorn backend.app.main:app --reload
```
Backend: `http://127.0.0.1:8000` · Swagger docs: `http://127.0.0.1:8000/docs`

```bash
cd frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`

---

## 🗺 Roadmap

**Now**
- [ ] Cloud object storage for uploads (persist across redeploys)
- [ ] Password reset flow

**Later (v2.0)**
- [ ] Doctor / patient dashboards
- [ ] Multi-language OCR
- [ ] Medical image analysis (DICOM support)
- [ ] Voice assistant
- [ ] Hospital integration APIs

---

## 🤝 Contributing

```bash
git checkout -b feature-name
git commit -m "Add feature"
git push origin feature-name
```
Then open a Pull Request.

---

## 👨‍💻 Author

**Lingam Roopesh**
[GitHub](https://github.com/roopesh431) · [LinkedIn](https://linkedin.com/in/lingam-roopesh)

---

## 📄 License

MIT License.

---

<div align="center">

If this project is useful to you, consider giving it a ⭐ on GitHub.

</div>