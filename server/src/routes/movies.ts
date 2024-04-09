import express from 'express';
const router = express.Router();

// GET /api/movies
router.get('/', (req, res) => {
    // データベースから映画情報を取得
    res.json({ message: '映画情報を取得しました' });
});

// POST /api/movies
router.post('/', (req, res) => {
    // 映画情報をデータベースに登録
    res.json({ message: '映画情報を登録しました' });
});

// PUT /api/movies/:id
router.put('/:id', (req, res) => {
    // 指定されたIDの映画情報を更新するなどの処理を行う
    const id = req.params.id;
    res.json({ message: `映画 ${id} を更新しました` });
});

// DELETE /api/movies/:id
router.delete('/:id', (req, res) => {
    // 指定されたIDの映画情報を削除するなどの処理を行う
    const id = req.params.id;
    res.json({ message: `映画 ${id} を削除しました` });
});


export default router;